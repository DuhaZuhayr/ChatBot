import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { signIn, signUp } from '../services/supabase';
import { supabase } from '../services/supabase';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
        Alert.alert('Success', 'Check your email for confirmation.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  // Fallback to anonymous
  const handleAnonymous = async () => {
    await supabase.auth.signInAnonymously();
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Chatbot App</Title>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        style={styles.input}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleAuth} style={styles.button}>
        {isLogin ? 'Login' : 'Sign Up'}
      </Button>
      <Button mode="text" onPress={() => setIsLogin(!isLogin)} style={styles.switchButton}>
        {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
      </Button>
      <Button mode="outlined" onPress={handleAnonymous} style={styles.button}>
        Continue Anonymously
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginBottom: 10,
  },
  switchButton: {
    marginBottom: 20,
  },
});