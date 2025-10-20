import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
export type Ref = BottomSheetModal;

// eslint-disable-next-line react/display-name
const SuscribeModal = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ['85%'], []);

  const { dismiss } = useBottomSheetModal();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.6}
        appearsOnIndex={1}
        disappearsOnIndex={-1}
        {...props}
        onPress={dismiss}
      />
    ),
    [dismiss]
  );

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={1}
      backdropComponent={renderBackdrop}
      handleComponent={null}
    >
      <BottomSheetView style={styles.sheetContainer}>
        <Text>Awesome 🎉</Text>
        <Text>Awesome 🎉</Text>
        <Text>Awesome 🎉</Text>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default SuscribeModal;

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
