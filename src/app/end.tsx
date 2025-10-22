import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../constants/Colors';

const End = () => {
  const { win, word, gameField } = useLocalSearchParams<{
    win: string;
    word: string;
    gameField?: string;
  }>();

  const router = useRouter();
  const { user } = useUser();
  const [userScore, setUserScore] = useState<any>({
    played: 42,
    wins: 2,
    currentStreak: 1,
  });

  const shareGame = () => {};

  const navigateRoot = () => {
    router.dismissAll();
    router.replace('/');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigateRoot}
        style={{
          alignSelf: 'flex-end',
        }}
      >
        <Ionicons name="close" size={30} color={Colors.light.gray} />
      </TouchableOpacity>
    </View>
  );
};

export default End;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 38,
    fontFamily: 'FrankRuhlLibre_800ExtraBold',
    textAlign: 'center',
  },
  text: {
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'FrankRuhlLibre_500Medium',
  },
  btn: {
    justifyContent: 'center',
    borderRadius: 30,
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    width: '100%',
    backgroundColor: '#000',
  },
  btnText: {
    padding: 14,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  textLink: {
    textDecorationLine: 'underline',
    fontSize: 16,
    paddingVertical: 15,
  },
  iconBtn: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.green,
    borderRadius: 30,
    width: '70%',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    gap: 10,
  },
  score: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
