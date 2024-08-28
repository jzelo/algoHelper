import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors'; // Adjust the import based on your project structure

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://your-backend-url/users/sign_in', {
        user: {
          email: email,
          password: password,
        },
      });

      if (response.status === 200) {
        const token = response.headers['authorization'];
        await AsyncStorage.setItem('authToken', token);
        navigation.navigate('Main');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/algoHelper.png')} style={styles.logo} />
      <Text style={styles.headerText}>Login</Text>
      <Text style={styles.bodyText}>Welcome, join Algo Aid for algorithm solutions!</Text>
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        textColor='#ffffff'
        style={styles.textInput}
        theme={{ colors: { primary: '#0de82f', text: '#ffffff' }, roundness: 30 }}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textColor='#ffffff'
        style={styles.textInput}
        theme={{ colors: { primary: '#0de82f', text: '#ffffff' }, roundness: 30 }}
      />
      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.submitButton}
        theme={{ colors: { primary: '#0de82f' } }}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#ffffff" /> : 'Login'}
      </Button>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#161616',
    alignItems: 'center', // Center content horizontally
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
    marginTop: 50,
  },
  headerText: {
    fontSize: 30,
    color: '#f6f6f6',
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'InterLight',
  },
  bodyText: {
    fontSize: 16,
    color: '#f6f6f6',
    marginBottom: 30,
    fontFamily: 'InterLight',
  },
  textInput: {
    marginBottom: 20,
    backgroundColor: '#2b2b2b',
    width: '100%', // Ensure inputs take full width
  },
  submitButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
});

export default Login;