import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
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
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default Login;