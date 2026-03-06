import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import * as Crypto from 'expo-crypto';

import SHA from '../utils/crypto/SHA';
import algoRSA from '../utils/crypto/RSA';

class AuthService {
  async signIn(email, password) {
    try {
      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();

      if (querySnapshot.docs.length !== 0) {
        const fetchedData = querySnapshot.docs[0].data();
        const hashMatches = await SHA.matchHash(
          password + fetchedData.userId,
          fetchedData.password,
        );

        if (hashMatches) {
          return {success: true, data: fetchedData};
        } else {
          return {
            success: false,
            message: 'The password you entered is incorrect!',
          };
        }
      } else {
        return {
          success: false,
          message: 'There is no account with the email you provided!',
        };
      }
    } catch (error) {
      console.error('AuthService Error:', error);
      return {
        success: false,
        message: 'Something went wrong while signing in.',
      };
    }
  }

  async signInWithGoogleCredential(idToken) {
    try {
      if (!idToken) {
        throw new Error('No id token provided');
      }

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const firebaseUser = userCredential.user;

      // Check if user exists in firestore
      const querySnapshot = await firestore()
        .collection('users')
        .where('email', '==', firebaseUser.email)
        .get();

      if (querySnapshot.empty) {
        return {success: true, isNewUser: true, firebaseUser};
      } else {
        const fetchedData = querySnapshot.docs[0].data();
        return {success: true, isNewUser: false, data: fetchedData};
      }
    } catch (error) {
      console.error('Google Sign-In Firebase Error:', error);
      return {
        success: false,
        message: error.message || 'Something went wrong with Google Sign-In.',
      };
    }
  }

  async signUp(userData) {
    try {
      const {email, phone, name, pass, date} = userData;

      const emailQuery = await firestore()
        .collection('users')
        .where('email', '==', email)
        .get();
      if (!emailQuery.empty)
        return {
          success: false,
          message: 'User already exists with provided email!',
        };

      const phoneQuery = await firestore()
        .collection('users')
        .where('phone', '==', phone)
        .get();
      if (!phoneQuery.empty)
        return {
          success: false,
          message: 'User already exists with provided phone number!',
        };

      const {publicKey, privateKey} = await algoRSA.generateKeyPair();
      const userId = Crypto.randomUUID();
      const passwordHash = await SHA.generateHash(pass + userId);

      const newUserData = {
        userId,
        name,
        email,
        phone,
        date,
        password: passwordHash,
        privateKey,
        publicKey,
        contacts: [],
      };

      await firestore().collection('users').doc(userId).set(newUserData);
      return {success: true, data: newUserData};
    } catch (error) {
      console.error('AuthService SignUp Error:', error);
      return {
        success: false,
        message: 'Something went wrong while signing up.',
      };
    }
  }

  async signOut() {
    try {
      if (auth().currentUser) {
        await auth().signOut();
      }
      return {success: true};
    } catch (error) {
      console.error('Sign out error:', error);
      return {success: false, message: 'Failed to sign out.'};
    }
  }
}

export default new AuthService();
