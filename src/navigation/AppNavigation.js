import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator';
import Message from '../screens/Message';
import Contact from '../screens/Contact';
import SecurityKeys from '../screens/SecurityKeys';
import Update from '../screens/Update';
import Encryption from '../screens/Encryption';
import SendMessage from '../screens/SendMessage';
import DecryptMessage from '../screens/DecryptMessage';
import ContactUs from '../screens/ContactUs';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Message" component={Message} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen
              name="SecurityKeys"
              component={SecurityKeys}
              options={{
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen name="Update" component={Update} />
            <Stack.Screen name="Encryption" component={Encryption} />
            <Stack.Screen name="SendMessage" component={SendMessage} />
            <Stack.Screen name="DecryptMessage" component={DecryptMessage} />
            <Stack.Screen name="ContactUs" component={ContactUs} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
