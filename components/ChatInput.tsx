import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { Message } from '../types';

interface Props {
  onSend: (message: Message) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend({ text, isUser: true });
      setText('');
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextInput
          mode="flat"
          placeholder="Type your message…"
          value={text}
          onChangeText={setText}
          style={styles.input}
          underlineColor="transparent"
          activeUnderlineColor="transparent"
          multiline
          left={<TextInput.Icon icon="message-text-outline" />}
        />
        <IconButton icon="send" onPress={handleSend} style={styles.sendButton} disabled={!text.trim()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 12,
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 28,
    paddingLeft: 6,
    paddingRight: 4,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginRight: 4,
    backgroundColor: 'transparent',
  },
  sendButton: {
    margin: 2,
  },
});