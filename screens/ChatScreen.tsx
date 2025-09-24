import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import { supabase } from '../services/supabase';
import { generateResponse } from '../services/gemini';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import { Message } from '../types';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load chat history from Supabase (optional)
    const loadHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch from 'messages' table if implemented
        // const { data } = await supabase.from('messages').select('*').eq('user_id', user.id).order('created_at');
        // setMessages(data || []);
      }
    };
    loadHistory();
  }, []);

  const handleSend = async (userMessage: Message) => {
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const responseText = await generateResponse(userMessage.text);
      const botMessage: Message = { text: responseText, isUser: false };
      setMessages(prev => [...prev, botMessage]);

      // Save to Supabase (optional)
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('messages').insert([
          { user_id: user.id, message: userMessage.text, response: responseText }
        ]);
      }
    } catch (error) {
      const errorMsg: Message = { text: 'Sorry, I encountered an error. Try again!', isUser: false };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => <ChatMessage message={item} />;

  return (
    <View style={styles.container}>
      {/* <Appbar.Header elevated>
        <Appbar.Content title="AgriBot" subtitle="Your smart farming assistant" />
        <IconButton icon="logout" onPress={() => supabase.auth.signOut()} />
      </Appbar.Header> */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messages}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
      <ChatInput onSend={handleSend} />
      {loading && (
        <View style={styles.loading}>
          <Text style={{ color: '#6b7280' }}>Thinking…</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f6f4' },
  messages: { flex: 1 },
  loading: {
    alignItems: 'center',
    padding: 10,
  },
});