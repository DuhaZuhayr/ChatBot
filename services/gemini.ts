import { GoogleGenerativeAI } from '@google/generative-ai';
import Constants from 'expo-constants';

const apiKey = Constants.expoConfig?.extra?.geminiApiKey;
const modelName = Constants.expoConfig?.extra?.geminiModel;

if (!apiKey) {
  throw new Error('Missing geminiApiKey in expo.extra');
}
if (!modelName) {
  throw new Error('Missing geminiModel in expo.extra');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: modelName });

export async function generateResponse(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate response');
  }
}