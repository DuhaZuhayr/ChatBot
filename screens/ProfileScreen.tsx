import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* <Appbar.Header>
        <Appbar.Content title="Profile" />
      </Appbar.Header> */}
      <View style={styles.content}>
        <Text style={styles.text}>Profile tab - Add content here!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});