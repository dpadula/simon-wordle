import { Text, View } from 'react-native';
import Icon from '../../assets/images/wordle-icon.svg';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Home</Text>
      <Icon width={100} height={100}></Icon>
    </View>
  );
}
