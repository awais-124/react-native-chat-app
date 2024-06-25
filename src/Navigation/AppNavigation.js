import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../AUTH/screens/Splash';
import SignIn from '../AUTH/screens/SignIn';
import SignUp from '../AUTH/screens/SignUp';
import ForgotPass from '../AUTH/screens/ForgotPass';
import ResetPass from '../AUTH/screens/ResetPass';

import Message from '../CHAT/screens/Message';
import Chat from '../CHAT/screens/Chat';
import Contact from '../CHAT/screens/Contact';
import SecurityKeys from '../CHAT/screens/SecurityKeys';
import Update from '../CHAT/screens/Update';
import Users from '../CHAT/screens/Users';
import Encryption from '../CHAT/screens/Encryption';
import SendMessage from '../CHAT/screens/SendMessage';
import DecryptMessage from '../CHAT/screens/DecryptMessage';
import ContactUs from '../CHAT/screens/ContactUs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="ResetPass" component={ResetPass} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Message" component={Message} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="SecurityKeys" component={SecurityKeys} />
        <Stack.Screen name="Update" component={Update} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Encryption" component={Encryption} />
        <Stack.Screen name="SendMessage" component={SendMessage} />
        <Stack.Screen name="DecryptMessage" component={DecryptMessage} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
