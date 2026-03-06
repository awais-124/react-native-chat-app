import {useState, useEffect} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {useDispatch} from 'react-redux';
import {login, logout} from '../store/slices/authSlice';
import AuthService from '../services/AuthService';
import StorageService from '../services/StorageService';
import algoRSA from '../utils/crypto/RSA';

WebBrowser.maybeCompleteAuthSession();

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();

  const handleAuthSuccess = async userData => {
    await StorageService.saveItem('NAME', userData.name);
    await StorageService.saveItem('EMAIL', userData.email);
    await StorageService.saveItem('USERID', userData.userId);
    await StorageService.saveItem('PHONE', userData.phone);
    await StorageService.saveItem('DOB', JSON.stringify(userData.date));
    await StorageService.saveObject('CONTACTS_LIST', userData.contacts || []);

    const Keys = {
      private: userData.privateKey,
      public: userData.publicKey,
    };
    await StorageService.saveItem('KEYS', JSON.stringify(Keys));

    dispatch(
      login({
        user: {
          name: userData.name,
          email: userData.email,
          userId: userData.userId,
          phone: userData.phone,
          date: JSON.stringify(userData.date),
          contacts: userData.contacts || [],
        },
        keys: Keys,
      }),
    );
  };

  const signIn = async (email, password, onSuccess) => {
    setLoading(true);
    setErrorMsg('');
    const response = await AuthService.signIn(email, password);
    setLoading(false);

    if (response.success) {
      await handleAuthSuccess(response.data);
      if (onSuccess) onSuccess();
    } else {
      setErrorMsg(response.message);
    }
  };

  const signUp = async (userData, onSuccess) => {
    setLoading(true);
    setErrorMsg('');
    const response = await AuthService.signUp(userData);
    setLoading(false);

    if (response.success) {
      await handleAuthSuccess(response.data);
      if (onSuccess) onSuccess();
    } else {
      setErrorMsg(response.message);
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'YOUR_ANDROID_CLIENT_ID', // User should provide
    iosClientId: 'YOUR_IOS_CLIENT_ID', // User should provide
    webClientId: 'YOUR_WEB_CLIENT_ID', // User should provide
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const {id_token} = response.params;
      handleGoogleSignInSuccess(id_token);
    }
  }, [response]);

  const handleGoogleSignInSuccess = async idToken => {
    setLoading(true);
    setErrorMsg('');
    const authResponse = await AuthService.signInWithGoogleCredential(idToken);

    if (authResponse.success) {
      if (authResponse.isNewUser) {
        const {publicKey, privateKey} = await algoRSA.generateKeyPair();
        const userId = authResponse.firebaseUser.uid;

        const newUserData = {
          userId,
          name: authResponse.firebaseUser.displayName || 'Google User',
          email: authResponse.firebaseUser.email,
          phone: authResponse.firebaseUser.phoneNumber || '',
          date: new Date(),
          password: 'google_oauth_no_password',
          privateKey,
          publicKey,
          contacts: [],
        };

        await StorageService.saveItem(
          'KEYS',
          JSON.stringify({private: privateKey, public: publicKey}),
        );
        await handleAuthSuccess(newUserData);
      } else {
        await handleAuthSuccess(authResponse.data);
      }
    } else {
      setErrorMsg(authResponse.message);
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    promptAsync();
  };

  const logOut = async () => {
    setLoading(true);
    await AuthService.signOut();
    await StorageService.clearAll();
    dispatch(logout());
    setLoading(false);
  };

  return {
    signIn,
    signUp,
    signInWithGoogle,
    logOut,
    loading,
    errorMsg,
    setErrorMsg,
  };
};

export default useAuth;
