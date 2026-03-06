import {useState, useCallback} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import CONSTANTS from '../constants/CONSTANTS';
import HANDLERS from '../utils/helpers';
import StorageService from '../services/StorageService';

const useUpdate = (initialData, onSuccess) => {
  const [loading, setLoading] = useState(false);

  const updateProfile = useCallback(
    async (name, email, phone, date) => {
      if (name === '' || phone === '' || email === '') {
        Alert.alert('Empty Fields', 'Input fields cannot be empty!');
        return;
      }

      let message = !CONSTANTS.emailRegex.test(email)
        ? 'Email not valid'
        : 'Invalid Phone Number. Must be longer than 9 characters';

      if (!(CONSTANTS.emailRegex.test(email) && phone.length > 9)) {
        Alert.alert('Error', message);
        return;
      }

      try {
        setLoading(true);
        const querySnapshot = await firestore()
          .collection('users')
          .where('email', '==', initialData.email)
          .get();

        if (querySnapshot.empty) {
          Alert.alert('Error', 'User record not found.');
          setLoading(false);
          return;
        }

        const fetchedData = querySnapshot.docs[0].data();

        // Check if data actually changed
        if (
          fetchedData.name === name &&
          fetchedData.phone === phone &&
          fetchedData.email === email &&
          HANDLERS.formatTimestamp(fetchedData.date) === date.toISOString()
        ) {
          setLoading(false);
          Alert.alert(
            'No Changes Detected',
            'The data has not been modified. No update is necessary.',
          );
          return;
        }

        await firestore().collection('users').doc(fetchedData.userId).update({
          name,
          email,
          phone,
          date,
        });

        // Update local storage
        await StorageService.removeItem('NAME');
        await StorageService.removeItem('EMAIL');
        await StorageService.removeItem('PHONE');
        await StorageService.removeItem('DOB');

        await StorageService.saveItem('NAME', name);
        await StorageService.saveItem('PHONE', phone);
        await StorageService.saveItem('EMAIL', email);
        await StorageService.saveItem('DOB', JSON.stringify(date));

        setLoading(false);
        Alert.alert('Success', 'Data updated successfully');

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error('Error updating user:', error);
        setLoading(false);
        Alert.alert('Error', 'An error occurred during update.');
      }
    },
    [initialData],
  );

  return {updateProfile, loading};
};

export default useUpdate;
