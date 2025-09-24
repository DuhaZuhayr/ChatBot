import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Message } from '../types';

interface Props {
  message: Message;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.isUser;
  return (
    <View style={[styles.row, isUser ? styles.rowEnd : styles.rowStart]}>
      {!isUser && (
        <Image source={require('../assets/icon.png')} style={styles.avatar} />
      )}
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
        <Text style={[styles.text, isUser ? styles.userText : styles.botText]}>
          {message.text}
        </Text>
      </View>
      {isUser && (
        <Image source={require('../assets/icon.png')} style={[styles.avatar, { opacity: 0 }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 6,
    paddingHorizontal: 4,
  },
  rowStart: {
    alignSelf: 'flex-start',
  },
  rowEnd: {
    alignSelf: 'flex-end',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  bubble: {
    maxWidth: '78%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#4CAF50',
    borderTopRightRadius: 4,
  },
  botBubble: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 4,
  },
  userText: {
    color: '#ffffff',
  },
  botText: {
    color: '#111827',
  },
});