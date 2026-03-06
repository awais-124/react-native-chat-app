# **CipherChat - A Secure Messaging Mobile Application**

### Developed using React Native (Expo SDK 54) and Firebase

> ### Main Features

- End to End Encryption
- Implemented cryptographic algorithms (RSA, AES, SHA-256)
- Used Hashing for password saving
- Used [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat) for Implementing Chat UI
- Every user gets his/her own Public Keys
- Accounts Login/Registration
- Real-time chatting
- Confidentiality, Integrity and Availability of User's Data
- User-friendly Interface
- Dynamic and Optimized Code
- Configured using Expo Continuous Native Generation (CNG)
- EAS (Expo Application Services) support included

<hr/>

> # Get Code

- Clone the repo `git clone https://github.com/awais-124/react-native-chat-app.git`
- `cd react-native-chat-app`
- Install dependencies: `npm install`
- **Important**: Add your `google-services.json` file to the root of the project to enable Firebase!
- Run local development build for Android: `npm run build:android:dev`
- Start the development server: `npm start`
- Run natively: `npm run android`

<hr/>

> ### Core Sub-Libraries Used

```json
    "expo": "~54.0.0",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "@react-native-firebase/app": "^23.8.6",
    "@react-native-firebase/firestore": "^23.8.6",
    "expo-crypto": "~15.0.8",
    "@react-native-community/datetimepicker": "8.4.4",
    "react-native-gifted-chat": "^3.3.2",
    "react-native-crypto-js": "^1.0.0",
    "react-native-rsa-native": "^2.0.5",
    "@react-navigation/native": "^7.1.33"
```
