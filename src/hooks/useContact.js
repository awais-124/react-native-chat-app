import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const useContact = contactId => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    publicKey: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;

    const fetchContactDetails = async () => {
      if (!contactId) return;

      setLoading(true);
      try {
        const contactDocument = await firestore()
          .collection('users')
          .doc(contactId)
          .get();

        if (contactDocument.exists && !unmounted) {
          const data = contactDocument.data();
          setContactData({
            name: data.name,
            email: data.email,
            phone: data.phone,
            dob: data.date
              ? new Date(data.date.seconds * 1000).toDateString()
              : 'Unknown',
            publicKey: data.publicKey,
          });
        }
      } catch (error) {
        console.error('Error fetching contact details: ', error);
      } finally {
        if (!unmounted) setLoading(false);
      }
    };

    fetchContactDetails();

    return () => {
      unmounted = true;
    };
  }, [contactId]);

  return {contactData, loading};
};

export default useContact;
