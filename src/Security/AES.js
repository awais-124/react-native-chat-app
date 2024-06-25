import CryptoJS from 'react-native-crypto-js';

const KEY_SIZE = 128;

const generateKey = () => {
  try {
    return CryptoJS.lib.WordArray.random(KEY_SIZE / 8).toString(
      CryptoJS.enc.Hex,
    );
  } catch (error) {
    console.log('AES-Key-Generation Failed: ', error);
    return false;
  }
};

const encrypt = (data, aesKey) => {
  try {
    return CryptoJS.AES.encrypt(data, aesKey).toString();
  } catch (error) {
    console.log('AES-Encryption Failed: ', error);
    return false;
  }
};

const decrypt = (ciphertext, aesKey) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, aesKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.log('AES-Decryption Failed: ', error);
    return false;
  }
};

const AES = {generateKey, encrypt, decrypt};

export default AES;
