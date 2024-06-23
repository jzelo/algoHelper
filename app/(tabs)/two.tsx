import { StyleSheet, FlatList } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function TabTwoScreen() {
  const [queries, setQueries] = useState<{ query: string; result: string }[]>([]);

  useEffect(() => {
    const loadQueries = async () => {
      const storedQueries = JSON.parse(await AsyncStorage.getItem('queries') || '[]');
      setQueries(storedQueries);
    };

    loadQueries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Old Input</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {queries.length === 0 ? (
        <Text>No past queries found.</Text>
      ) : (
        <FlatList
          data={queries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.queryContainer}>
              <Text style={styles.queryText}>Q: {item.query}</Text>
              <Text style={styles.resultText}>A: {item.result}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
