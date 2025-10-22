import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../assets/images/wordle-icon.svg';
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

      <View style={styles.header}>
        {win === 'true' ? <Image source={require('../../assets/images/win.png')} /> : <Icon width={100} height={70} />}

        <Text style={styles.title}>{win === 'true' ? 'Congratulations!' : 'Thanks for playing today!'}</Text>
        <SignedOut>
          <Text style={styles.text}>Want to see your stats and streaks?</Text>

          <Link href={'/login'} style={styles.btn} asChild>
            <TouchableOpacity>
              <Text style={styles.btnText}>Create a free account</Text>
            </TouchableOpacity>
          </Link>

          <Link href={'/login'} asChild>
            <TouchableOpacity>
              <Text style={styles.textLink}>Already Registered? Log In</Text>
            </TouchableOpacity>
          </Link>
        </SignedOut>
        <SignedIn>
          <Text style={styles.text}>Statistics</Text>
          <View style={styles.stats}>
            <View>
              <Text style={styles.score}>{userScore?.played}</Text>
              <Text>Played</Text>
            </View>
            <View>
              <Text style={styles.score}>{userScore?.wins}</Text>
              <Text>Wins</Text>
            </View>
            <View>
              <Text style={styles.score}>{userScore?.currentStreak}</Text>
              <Text>Current Streak</Text>
            </View>
          </View>
        </SignedIn>
        <View
          style={{
            height: StyleSheet.hairlineWidth,
            width: '100%',
            backgroundColor: '#4e4e4e',
          }}
        />

        <TouchableOpacity style={styles.iconBtn} onPress={shareGame}>
          <Text style={styles.btnText}>Share</Text>
          <Ionicons name="share-social" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
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
