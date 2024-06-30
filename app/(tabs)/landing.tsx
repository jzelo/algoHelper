import React from 'react';
import { StyleSheet, ImageBackground, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { View } from '@/components/Themed';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function LandingPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={{ uri: 'your-image-url' }} style={styles.background}>
        <LinearGradient
          colors={['transparent', 'transparent', '#0de82f']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.container}>
          <Image style={styles.image} source={require('../../assets/images/algoMan.png')} />
          <Text style={styles.title}>Algo Aid</Text>
          <Text style={styles.subtitle}>Simplify algorithm problem solving</Text>
          <Button mode="contained" onPress={() => navigation.navigate('question')} style={styles.button}>
            Get Started
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(22, 22, 22, 0.9)', // Adjust for a darker overlay if needed
    zIndex: 2,
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'InterExtraBold',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'InterMedium',
  },
  button: {
    backgroundColor: '#0de82f',
    marginTop: 40,
    fontFamily: 'InterMedium',
  },
});