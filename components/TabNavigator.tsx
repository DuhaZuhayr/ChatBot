import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import ChatScreen from '../screens/ChatScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: { paddingBottom: 6, height: 60, borderTopWidth: 0, elevation: 12 },
        headerShadowVisible: true,
      }}
    >
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color }) => <IconButton icon="chat-processing-outline" size={24} iconColor={color} />,
          headerTitle: 'Chatbot',
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: ({ color }) => <IconButton icon="sprout-outline" size={24} iconColor={color} />,
          headerTitle: 'Discover',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <IconButton icon="account-circle-outline" size={24} iconColor={color} />,
          headerTitle: 'Profile',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <IconButton icon="cog-outline" size={24} iconColor={color} />,
          headerTitle: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}