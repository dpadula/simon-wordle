import { SignedIn, SignedOut, useAuth } from '@clerk/clerk-expo';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Link } from 'expo-router';
import { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInLeft } from 'react-native-reanimated';
import Icon from '../../assets/images/wordle-icon.svg';
import SuscribeModal from '../components/SuscribeModal';
import ThemedText from '../components/ThemedText';
import { Colors } from '../constants/Colors';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Index() {
  const colorScheme = useColorScheme();
  const { signOut } = useAuth();
  const backgroundColor = Colors[colorScheme ?? 'light'].background;
  const textColor = Colors[colorScheme ?? 'light'].text;
  const subscribeModalRef = useRef<BottomSheetModal>(null);
  const handlePresentSuscribeModal = () => {
    subscribeModalRef.current?.present();
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <SuscribeModal ref={subscribeModalRef}></SuscribeModal>
      <Animated.View style={styles.header} entering={FadeInDown}>
        <Icon width={100} height={70}></Icon>
        <ThemedText style={styles.title}>Wordle</ThemedText>
        <ThemedText style={styles.text}>Get 6 chances to guess a 5-letter word.</ThemedText>
      </Animated.View>
      <View style={styles.menu}>
        <Link
          href={'/game'}
          style={[styles.btn, { backgroundColor: colorScheme === 'light' ? '#000' : '#4a4a4a' }]}
          asChild
        >
          <AnimatedTouchableOpacity entering={FadeInLeft}>
            <Text style={[styles.btnText, styles.primaryText]}>Play</Text>
          </AnimatedTouchableOpacity>
        </Link>

        <SignedOut>
          <Link href={'/login'} style={[styles.btn, { borderColor: textColor }]} asChild>
            <AnimatedTouchableOpacity entering={FadeInLeft.delay(100)}>
              <ThemedText style={styles.btnText}>Log in</ThemedText>
            </AnimatedTouchableOpacity>
          </Link>
        </SignedOut>

        <SignedIn>
          <AnimatedTouchableOpacity
            entering={FadeInLeft.delay(100)}
            onPress={() => signOut()}
            style={[styles.btn, { borderColor: textColor }]}
          >
            <ThemedText style={styles.btnText}>Sign Out</ThemedText>
          </AnimatedTouchableOpacity>
        </SignedIn>

        <AnimatedTouchableOpacity
          entering={FadeInLeft.delay(100)}
          onPress={() => handlePresentSuscribeModal()}
          style={[styles.btn, { borderColor: textColor }]}
        >
          <ThemedText style={styles.btnText}>Subscribe</ThemedText>
        </AnimatedTouchableOpacity>
      </View>
      <Animated.View style={styles.footer} entering={FadeIn.delay(300)}>
        <ThemedText style={styles.footerText}>
          {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: es })}
        </ThemedText>
        <ThemedText style={styles.footerText}>No. 1122</ThemedText>
        <ThemedText style={styles.footerText}>Edited by @Diego</ThemedText>
      </Animated.View>
    </Animated.View>
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
});
