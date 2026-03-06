import RSA from 'react-native-rsa-native';

const KEY_SIZE = 1024;

async function generateKeyPair() {
  try {
    const keys = await RSA.generateKeys(KEY_SIZE);
    return {
      publicKey: keys.public,
      privateKey: keys.private,
    };
  } catch (error) {
    console.log('RSA KEYS GENERATION FALIED: ', error);
    return false;
  }
}

async function encryptMessage(publicKeys, message) {
  try {
    const encryptedMessage = await Promise.all(
      publicKeys.map(publicKey => {
        return RSA.encrypt(message, publicKey);
      }),
    );
    return encryptedMessage;
  } catch (error) {
    console.log('RSA ENCRYPTION FALIED: ', error);
    return false;
  }
}

async function decryptMessage(privateKey, messages) {
  for (const msg of messages) {
    try {
      const decryptedMessage = await RSA.decrypt(msg, privateKey);
      if (decryptedMessage !== '') {
        return decryptedMessage;
      }
    } catch (error) {
      console.log('RSA DECRYPTION ERROR : ', {error});
    }
  }
  return false;
}

async function encryptSingle(pbl, msg) {
  try {
    const cipher = RSA.encrypt(msg, pbl);
    return cipher;
  } catch (error) {
    console.log('RSA ENCRYPTION ERROR : ', {error});
    return false;
  }
}

async function decryptSingle(prv, msg) {
  try {
    const plain = RSA.decrypt(msg, prv);
    return plain;
  } catch (error) {
    console.log('RSA DECRYPTION ERROR : ', {error});
    return false;
  }
}

const algoRSA = {
  generateKeyPair,
  encryptMessage,
  decryptMessage,
  encryptSingle,
  decryptSingle,
};

export default algoRSA;
