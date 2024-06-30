import { StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function QuestionPage() {
  return (
    <View style={styles.container}>
      <EditScreenInfo path="(tabs)" />
    </View>
  );
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
    color: '#fff',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});