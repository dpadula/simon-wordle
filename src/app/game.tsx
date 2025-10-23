/* eslint-disable react-hooks/rules-of-hooks */
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Stack, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming, ZoomIn } from 'react-native-reanimated';
import OnScreenKeyboard from '../components/OnScreenKeyboard';
import SettingsModal from '../components/SettingsModal';
import { Colors } from '../constants/Colors';
import { allWords } from '../utils/allWords';

const ROWS = 6;

const Game = () => {
  // const [word, setWord] = useState(
  //   words[Math.floor(Math.random() * words.length)]
  // );
  const [word, setWord] = useState('diego');
  const router = useRouter();
  const wordLetters = word.split('');
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].gameBg;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const grayColor = Colors[colorScheme ?? 'light'].gray;

  //Cada filera tendra 5 letras
  const [rows, setRows] = useState<string[][]>(new Array(ROWS).fill(new Array(5).fill('')));
  const [curRow, setCurRow] = useState(0);
  const [curCol, _setCurCol] = useState(0);

  const [greenLetters, setGreenLetters] = useState<string[]>([]);
  const [yellowLetters, setYellowLetters] = useState<string[]>([]);
  const [grayLetters, setGrayLetters] = useState<string[]>([]);

  const settingsModalRef = useRef<BottomSheetModal>(null);
  const handlePresentSubscribeModalPress = () => {
    console.log('handlePresentSubscribeModalPress');
    settingsModalRef.current?.present();
  };

  const colStateRef = useRef(curCol);
  const setCurCol = (data: number) => {
    colStateRef.current = data;
    _setCurCol(data);
  };
  const addKey = (key: string) => {
    console.log('KEY: ', key);
    console.log('CURRENT: ', colStateRef.current);

    const newRows = [...rows.map((row) => [...row])];
    // console.log('🚀 ~ addKey ~ newRows:', newRows);

    if (key === 'ENTER') {
      checkWord();
    } else if (key === 'BACKSPACE') {
      if (colStateRef.current === 0) {
        newRows[curRow][0] = '';
        setRows(newRows);
        return;
      }
      newRows[curRow][colStateRef.current - 1] = '';

      setCurCol(colStateRef.current - 1);
      setRows(newRows);
      return;
    } else if (colStateRef.current >= newRows[curRow].length) {
      // EoL don't add keys
    } else {
      console.log('🚀 ~ addKey ~ curCol', colStateRef.current);

      newRows[curRow][colStateRef.current] = key;
      setRows(newRows);
      setCurCol(colStateRef.current + 1);
    }
  };

  const checkWord = () => {
    const currentWord = rows[curRow].join('');

    if (currentWord.length < word.length) {
      // shakeRow();
      console.log('NOT ENOUGH LETTERS');
      return;
    }

    if (!allWords.includes(currentWord)) {
      console.log('NOT A WORD');
      // shakeRow();
      // return;
    }
    // flipRow();

    const newGreen: string[] = [];
    const newYellow: string[] = [];
    const newGray: string[] = [];

    currentWord.split('').forEach((letter, index) => {
      if (letter === wordLetters[index]) {
        newGreen.push(letter);
      } else if (wordLetters.includes(letter)) {
        newYellow.push(letter);
      } else {
        newGray.push(letter);
      }
    });

    setGreenLetters([...greenLetters, ...newGreen]);
    setYellowLetters([...yellowLetters, ...newYellow]);
    setGrayLetters([...grayLetters, ...newGray]);

    setTimeout(() => {
      if (currentWord === word) {
        console.log('🚀 ~ checkWord ~ WIN');
        router.push(`/end?win=true&word=${word}&gameField=${JSON.stringify(rows)}`);
      } else if (curRow + 1 >= rows.length) {
        console.log('GAME OVER');
        router.push(`/end?win=false&word=${word}&gameField=${JSON.stringify(rows)}`);
      }
    }, 1500);
    setCurRow(curRow + 1);
    setCurCol(0);
  };

  //Intento de coloreo
  const getCellColor = (cell: string, rowIndex: number, cellIndex: number) => {
    // 'worklet';
    if (curRow > rowIndex) {
      if (wordLetters[cellIndex] === cell) {
        return Colors.light.green;
      } else if (wordLetters.includes(cell)) {
        return Colors.light.yellow;
      } else {
        return grayColor;
      }
    }
    return 'transparent';
  };

  const getBorderColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (curRow > rowIndex && cell !== '') {
      return getCellColor(cell, rowIndex, cellIndex);
    }
    return Colors.light.gray;
  };

  // Animations
  const setCellColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (curRow >= rowIndex) {
      if (wordLetters[cellIndex] === cell) {
        cellBackgrounds[rowIndex][cellIndex].value = withDelay(cellIndex * 200, withTiming(Colors.light.green));
      } else if (wordLetters.includes(cell)) {
        cellBackgrounds[rowIndex][cellIndex].value = withDelay(cellIndex * 200, withTiming(Colors.light.yellow));
      } else {
        cellBackgrounds[rowIndex][cellIndex].value = withDelay(cellIndex * 200, withTiming(grayColor));
      }
    } else {
      cellBackgrounds[rowIndex][cellIndex].value = withTiming('transparent', { duration: 100 });
    }
  };

  const setBorderColor = (cell: string, rowIndex: number, cellIndex: number) => {
    if (curRow > rowIndex && cell !== '') {
      if (wordLetters[cellIndex] === cell) {
        cellBorders[rowIndex][cellIndex].value = withDelay(cellIndex * 200, withTiming(Colors.light.green));
      } else if (wordLetters.includes(cell)) {
        cellBorders[rowIndex][cellIndex].value = withDelay(cellIndex * 200, withTiming(Colors.light.yellow));
      } else {
        cellBorders[rowIndex][cellIndex].value = withDelay(cellIndex * 200, withTiming(grayColor));
      }
    }
    return Colors.light.gray;
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
      <SettingsModal ref={settingsModalRef} />
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
                    {
                      borderColor: getBorderColor(cell, rowIndex, cellIndex),
                      backgroundColor: getCellColor(cell, rowIndex, cellIndex),
                    },
                    // tileStyles[rowIndex][cellIndex],
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
