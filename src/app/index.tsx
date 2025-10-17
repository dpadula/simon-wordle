import { StyleSheet, Text, View } from 'react-native';
import Icon from '../../assets/images/wordle-icon.svg';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Icon width={100} height={100}></Icon>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
