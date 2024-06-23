import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import { Text, View } from './Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';

export default function EditScreenInfo({ path }: { path: string }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleQuerySubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    console.log("Submitting query:", query);

    try {
      const response = await axios.post('http://192.168.1.4:5001/ask', {
        question: query,
      });

      console.log("Response received:", response.data);

      const queryResult = response.data.answer;
      setResult(queryResult);

      // Save query to local storage
      const oldQueries = JSON.parse(await AsyncStorage.getItem('queries') || '[]');
      oldQueries.push({ query, result: queryResult });
      await AsyncStorage.setItem('queries', JSON.stringify(oldQueries));
    } catch (err) {
      console.error("Error during query submission:", err);
      setError('Failed to get results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>AlgoHelper</Text>
      </View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>
          Welcome to algoHelper! I'm your AI friend here to help you get better at solving algorithms.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Ask about an algorithm"
          placeholder="What is the time complexity of quicksort?"
          value={query}
          onChangeText={setQuery}
          style={styles.textInput}
          theme={{ colors: { primary: '#4CAF50' } }}
        />
        <Button
          mode="contained"
          onPress={handleQuerySubmit}
          style={styles.submitButton}
          theme={{ colors: { primary: '#4CAF50' } }}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#ffffff" /> : 'Submit'}
        </Button>
      </View>
      <View style={styles.resultContainer}>
        {loading && <ActivityIndicator size="large" color="#4CAF50" />}
        {result && <Text style={styles.resultText}>{result}</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  headerContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  textInput: {
    marginBottom: 20,
  },
  submitButton: {
    alignSelf: 'center',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#4CAF50',
    marginVertical: 10,
    textAlign: 'left', // Ensure text alignment for better readability
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginVertical: 10,
  },
});