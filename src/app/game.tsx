/* eslint-disable react-hooks/rules-of-hooks */
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, ZoomIn } from 'react-native-reanimated';
import OnScreenKeyboard from '../components/OnScreenKeyboard';
import { Colors } from '../constants/Colors';

const ROWS = 6;

const Game = () => {
  // const [word, setWord] = useState(
  //   words[Math.floor(Math.random() * words.length)]
  // );
  const [word, setWord] = useState('diego');
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].gameBg;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const grayColor = Colors[colorScheme ?? 'light'].gray;

  //Cada filera tendra 5 letras
  const [rows, setRows] = useState<string[][]>(new Array(ROWS).fill(new Array(5).fill('')));
  const [curRow, setCurRow] = useState(0);
  const [curCol, _setCurCol] = useState(0);

  const [greenLetters, setGreenLetters] = useState<string[]>(['q', 'w', 'e', 'r', 't']);
  const [yellowLetters, setYellowLetters] = useState<string[]>(['y', 'u', 'i', 'o', 'p']);
  const [grayLetters, setGrayLetters] = useState<string[]>([]);

  const settingsModalRef = useRef<BottomSheetModal>(null);
  const handlePresentSubscribeModalPress = () => settingsModalRef.current?.present();

  const colStateRef = useRef(curCol);
  const setCurCol = (data: number) => {
    colStateRef.current = data;
    _setCurCol(data);
  };
  const addKey = (key: string) => {
    console.log('KEY: ', key);
  };

  const offsetShakes = Array.from({ length: ROWS }, () => useSharedValue(0));

  const rowStyles = Array.from({ length: ROWS }, (_, index) =>
    useAnimatedStyle(() => {
      return {
        transform: [{ translateX: offsetShakes[index].value }],
      };
    }),
  );

  const tileRotates = Array.from({ length: ROWS }, () => Array.from({ length: 5 }, () => useSharedValue(0)));

  const cellBackgrounds = Array.from({ length: ROWS }, () =>
    Array.from({ length: 5 }, () => useSharedValue('transparent')),
  );

  const cellBorders = Array.from({ length: ROWS }, () =>
    Array.from({ length: 5 }, () => useSharedValue(Colors.light.gray)),
  );

  const tileStyles = Array.from({ length: ROWS }, (_, index) => {
    return Array.from({ length: 5 }, (_, tileIndex) =>
      useAnimatedStyle(() => {
        return {
          transform: [{ rotateX: `${tileRotates[index][tileIndex].value}deg` }],
          borderColor: cellBorders[index][tileIndex].value,
          backgroundColor: cellBackgrounds[index][tileIndex].value,
        };
      }),
    );
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={styles.headerIcons}>
              <Ionicons name="help-circle-outline" size={28} color={textColor} />
              <Ionicons name="podium-outline" size={24} color={textColor} />
              <TouchableOpacity onPress={handlePresentSubscribeModalPress}>
                <Ionicons name="settings-sharp" size={24} color={textColor} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <View style={styles.gameField}>
        {rows.map((row, rowIndex) => (
          <Animated.View style={[styles.gameFieldRow, rowStyles[rowIndex]]} key={`row-${rowIndex}`}>
            {row.map((cell, cellIndex) => (
              <Animated.View entering={ZoomIn.delay(50 * cellIndex)} key={`cell-${rowIndex}-${cellIndex}`}>
                <Animated.View
                  style={[
                    styles.cell,
                    // {
                    //   borderColor: getBorderColor(cell, rowIndex, cellIndex),
                    //   backgroundColor: getCellColor(cell, rowIndex, cellIndex),
                    // },
                    tileStyles[rowIndex][cellIndex],
                  ]}
                >
                  <Animated.Text
                    style={[
                      styles.cellText,
                      {
                        color: curRow > rowIndex ? '#fff' : textColor,
                      },
                    ]}
                  >
                    {cell}
                  </Animated.Text>
                </Animated.View>
              </Animated.View>
            ))}
          </Animated.View>
        ))}
      </View>
      <OnScreenKeyboard
        onKeyPressed={addKey}
        greenLetters={greenLetters}
        yellowLetters={yellowLetters}
        grayLetters={grayLetters}
      ></OnScreenKeyboard>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  gameField: {
    alignItems: 'center',
    gap: 8,
  },
  gameFieldRow: {
    flexDirection: 'row',
    gap: 8,
  },
  cell: {
    backgroundColor: '#fff',
    width: 62,
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  cellText: {
    fontSize: 30,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
});
