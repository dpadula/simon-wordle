import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const End = () => {
  const { win, word, gameField } = useLocalSearchParams<{
    win: string;
    word: string;
    gameField?: string;
  }>();
  return (
    <View>
      <Text>{win}</Text>
      <Text>{word}</Text>
      <Text>{gameField}</Text>
    </View>
  );
};

export default End;

const styles = StyleSheet.create({});
