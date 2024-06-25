import {sha256} from 'react-native-sha256';

// Function to generate a hash from a given string
async function generateHash(inputString) {
  try {
    const hashedString = await sha256(inputString);
    return hashedString;
  } catch (error) {
    console.error('Error generating hash:', error);
    return null;
  }
}

// Function to match a hash with a given input string
async function matchHash(inputString, hashedString) {
  try {
    const generatedHash = await generateHash(inputString);
    return generatedHash === hashedString;
  } catch (error) {
    console.error('Error matching hash:', error);
    return false;
  }
}

const SHA = {generateHash, matchHash};

// Exporting the functions for external use
export default SHA;
