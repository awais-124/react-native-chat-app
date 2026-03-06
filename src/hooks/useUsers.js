import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import StorageService from '../services/StorageService';

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    let unmounted = false;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const id = await StorageService.getItem('USERID');
        if (!unmounted) setCurrentId(id);

        const myEmail = await StorageService.getItem('EMAIL');

        const querySnapshot = await firestore()
          .collection('users')
          .where('email', '!=', myEmail)
          .get();

        if (!unmounted && !querySnapshot.empty) {
          const parsedResult = querySnapshot.docs.map(docSnapshot =>
            docSnapshot.data(),
          );
          setUsers(parsedResult);
        }
      } catch (error) {
        console.error('GET USERS: ', error);
        if (!unmounted) {
          Alert.alert('Error', 'Failed to fetch list of users!');
        }
      } finally {
        if (!unmounted) setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      unmounted = true;
    };
  }, []);

  return {users, loading, currentId};
};

export default useUsers;
