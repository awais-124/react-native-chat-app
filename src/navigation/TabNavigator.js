import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet, View} from 'react-native';

import Users from '../screens/Users';
import Profile from '../screens/Profile';
import ICONS from '../constants/icons';
import {theme} from '../styles/theme';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.colors.surface,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarIcon: ({focused}) => {
          let iconSource;
          if (route.name === 'Users') {
            iconSource = ICONS.MESSAGE_TAB;
          } else if (route.name === 'Profile') {
            iconSource = ICONS.PROFILE_TAB;
          }

          return (
            <View style={[styles.iconContainer, focused && styles.iconFocused]}>
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  focused ? styles.iconActive : styles.iconInactive,
                ]}
                resizeMode="contain"
              />
            </View>
          );
        },
      })}>
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen
        name="Users"
        component={Users}
        options={{title: 'Messages'}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: theme.colors.primary,
    height: 70,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingBottom: 10,
    paddingTop: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 20,
  },
  iconFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  icon: {
    width: 26,
    height: 26,
  },
  iconActive: {
    tintColor: theme.colors.surface,
  },
  iconInactive: {
    tintColor: theme.colors.textMuted,
  },
});
