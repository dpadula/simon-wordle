import { StyleSheet, Text, View } from 'react-native';
import Icon from '../../assets/images/wordle-icon.svg';

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon width={100} height={70}></Icon>
        <Text style={styles.title}>Wordle</Text>
        <Text style={styles.text}>Get 6 chances to guess a 5-letter word.</Text>
      </View>
      <View>
        <Text style={styles.text}>Start a new game</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text}>Created by</Text>
        <Text style={styles.text}>@simonwordle</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: 10,
  },
});
