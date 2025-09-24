import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { Provider as PaperProvider, MD3LightTheme as PaperDefaultTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { supabase } from './services/supabase';
import AuthScreen from './screens/AuthScreen';
import TabNavigator from './components/TabNavigator';
import { Session } from '@supabase/supabase-js';

const theme = {
  ...PaperDefaultTheme,
  roundness: 12,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#4CAF50',
    secondary: '#2E7D32',
    surface: '#ffffff',
    background: '#f3f6f4',
    elevation: {
      ...PaperDefaultTheme.colors.elevation,
    },
  },
};

const navTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    primary: '#4CAF50',
    background: '#f3f6f4',
    card: '#ffffff',
    text: '#1b1b1b',
    border: '#e6e6e6',
  },
};

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={navTheme}>
          {session ? <TabNavigator /> : <AuthScreen />}
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}