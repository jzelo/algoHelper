import { StyleSheet, FlatList, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function TabTwoScreen() {
  const [queries, setQueries] = useState<{ question: string; answer: string }[]>([]);

  useEffect(() => {
    const loadQueries = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');
        const response = await axios.get('http://your-backend-url/questions', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.status === 200) {
          setQueries(response.data);
        } else {
          // Handle error response
        }
      } catch (error) {
        // Handle error
      }
    };

    loadQueries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Old Input</Text>
      <View style={styles.separator} lightColor="#0de82f" darkColor="rgba(255,255,255,0.1)" />
      {queries.length === 0 ? (
        <Text>No past queries found.</Text>
      ) : (
        <FlatList
          data={queries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.queryContainer}>
              <Text style={styles.queryText}>Q: {item.question}</Text>
              <Text style={styles.resultText}>A: {item.answer}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center',
    backgroundColor: '#161616',
    paddingTop: 80,
    paddingHorizontal: 20, // Add horizontal padding for better layout on wide screens
  },
  title: {
    paddingTop: 20,
    fontSize: 30,
    fontFamily: 'InterLight',
    alignSelf: 'flex-start', // Align title to the start of the container
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%', // Use the full width of the container
    backgroundColor: '#0de82f',
  },
  queryContainer: {
    padding: 10,
    marginVertical: 10,
    width: '100%', // Ensure the container takes the full width available
    backgroundColor: '#333',
    borderRadius: 10,
  },
  queryText: {
    fontSize: 20,
    color: '#fff',
  },
  resultText: {
    paddingTop: 20,
    fontSize: 16,
    color: '#fff',
  },
});