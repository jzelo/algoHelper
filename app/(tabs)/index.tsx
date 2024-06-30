import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="(tabs)/landing" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161616',
  },
  title: {
    fontSize: 20,
    marginTop: 30,
    letterSpacing: -0.8,
    fontFamily: 'InterExtraBold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
