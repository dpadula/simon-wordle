import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'expo-router';
import { useCallback, useMemo, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Icon from '../../assets/images/wordle-icon.svg';
import ThemedText from '../components/ThemedText';
import { Colors } from '../constants/Colors';

export default function Index() {
  const colorScheme = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const subscribeModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['85%'], []);

  const { dismiss } = useBottomSheetModal();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.6}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
        onPress={dismiss}
      />
    ),
    []
  );
  const handlePresentSuscribeModal = (index: number) => {
    console.log('🚀 ~ handlePresentSuscribeModal ~ index:', index);

    subscribeModalRef.current?.present();

    // subscribeModalRef.current?.snapToPosition(index);
    // subscribeModalRef.current?.snapToIndex(index);
  };

  // const handleSheetChange = useCallback((index: number) => {
  //   console.log('handleSheetChange', index);
  // }, []);
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* <BottomSheetModal snapPoints={['75%', '10%']} ref={subscribeModalRef}>
        <BottomSheetView style={styles.containerSheet}>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal> */}

      <BottomSheetModal
        ref={subscribeModalRef}
        snapPoints={snapPoints}
        index={1}
        backdropComponent={renderBackdrop}
        handleComponent={null}
      >
        <BottomSheetView style={styles.containerSheet}>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>
      <View style={styles.header}>
        <Icon width={100} height={70}></Icon>
        <ThemedText style={styles.title}>Wordle</ThemedText>
        <ThemedText style={styles.text}>
          Get 6 chances to guess a 5-letter word.
        </ThemedText>
      </View>
      <View style={styles.menu}>
        <Link
          href={'/game'}
          style={[
            styles.btn,
            { backgroundColor: colorScheme === 'light' ? '#000' : '#4a4a4a' },
          ]}
          asChild
        >
          <TouchableOpacity>
            <Text style={[styles.btnText, styles.primaryText]}>Play</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity style={[styles.btn, { borderColor: textColor }]}>
          <ThemedText style={styles.btnText}>Log in</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handlePresentSuscribeModal(3)}
          style={[styles.btn, { borderColor: textColor }]}
        >
          <ThemedText style={styles.btnText}>Subscribe</ThemedText>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <ThemedText style={styles.footerText}>
          {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es })}
        </ThemedText>
        <ThemedText style={styles.footerText}>No. 1122</ThemedText>
        <ThemedText style={styles.footerText}>Edited by @Diego</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    gap: 40,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 40,
    fontFamily: 'FrankRuhlLibre_800ExtraBold',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'FrankRuhlLibre_500Medium',
  },
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  btn: {
    justifyContent: 'center',
    borderRadius: 30,
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    width: '60%',
    maxWidth: 200,
  },
  btnText: {
    padding: 14,
    fontSize: 16,
    fontWeight: 'semibold',
    // color: '#444',
  },
  primaryText: {
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  footerDate: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 20,
    fontFamily: 'FrankRuhlLibre_500Medium',
  },
  containerSheet: {
    flex: 1,
    alignItems: 'center',
  },
});
