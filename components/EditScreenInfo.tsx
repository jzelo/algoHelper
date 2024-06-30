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
      <Text style={styles.headerText}>AlgoAid</Text>
      <View style={styles.separator} lightColor="#0de82f" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>
          Harness the power of AI to get answers to your algorithm questions.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          mode="outlined"
          label="Ask about an algorithm"
          placeholder="What is the time complexity of quicksort?"
          value={query}
          onChangeText={setQuery}
          textColor='#ffffff'
          style={styles.textInput}
          theme={{ colors: { primary: '#0de82f', text: '#ffffff' },
                  roundness: 30}}
          multiline
          numberOfLines={4} // Adjust as needed
        />
        <Button
          mode="contained"
          onPress={handleQuerySubmit}
          style={styles.submitButton}
          theme={{ colors: { primary: '#0de82f' } }}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#ffffff" /> : 'Submit'}
        </Button>
      </View>
      <View style={styles.resultContainer}>
        {loading && <ActivityIndicator size="large" color="#0de82f" />}
        {result && <Text style={styles.resultText}>{result}</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 100,
  },
  headerContainer: {
    alignItems: 'flex-start',
  },
  separator: {
    marginBottom: 20,
    height: 1,
    width: '90%',
    backgroundColor: '#0de82f',
    marginLeft: 17,
  },
  headerText: {
    marginBottom: 50,
    fontSize: 30,
    lineHeight: 40,
    letterSpacing: 0.15,
    color: '#f6f6f6',
    fontWeight: 'bold',
    fontFamily: 'InterLight',
    paddingLeft: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginLeft: 0,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 22,
    paddingLeft: 20,
    textAlign: 'left',
    marginBottom: 20,
    color: '#f6f6f6',
    fontFamily: 'InterLight',
  },
  inputContainer: {
    marginTop: 20,
    backgroundColor: 'transparent',
    padding: 5,
    borderRadius: (50),
  },
  textInput: {
    marginBottom: 20,
    fontFamily: 'InterRegular',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#2b2b2b',
    padding: 10, // Add padding inside the text input
  },
  submitButton: {
    marginTop: 10,
    alignSelf: 'center',
    fontFamily: 'InterRegular',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 16,
    color: '#84878c',
    marginVertical: 10,
    textAlign: 'left', // Ensure text alignment for better readability
    fontFamily: 'InterLight',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginVertical: 10,
    fontFamily: 'InterRegular',
  },
});