import { useRef, useState, type ComponentRef } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LetterContent } from './LetterContent';
import { colors, type } from '../constants/theme';

type GiftEnvelopeProps = {
  onOpen: () => void;
};

export function GiftEnvelope({ onOpen }: GiftEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [letterProgress] = useState(() => new Animated.Value(0));
  const [flapProgress] = useState(() => new Animated.Value(0));
  const [flyProgress] = useState(() => new Animated.Value(0));
  const [overlayOpacity] = useState(() => new Animated.Value(1));
  const [flyFrom, setFlyFrom] = useState<{ x: number; y: number } | null>(null);
  const envelopeRef = useRef<ComponentRef<typeof View>>(null);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const sealOpacity = flapProgress.interpolate({
    inputRange: [0, 0.2, 1],
    outputRange: [1, 0, 0],
  });

  function reset() {
    setFlyFrom(null);
    setIsOpening(false);
    flapProgress.setValue(0);
    letterProgress.setValue(0);
    flyProgress.setValue(0);
    overlayOpacity.setValue(1);
  }

  function openEnvelope() {
    if (isOpening) {
      return;
    }

    setIsOpening(true);
    Animated.sequence([
      Animated.timing(flapProgress, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.timing(letterProgress, {
        toValue: 1,
        duration: 520,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (!finished) {
        return;
      }
      envelopeRef.current?.measureInWindow((x, y) => {
        // Where the risen letter sits, so the flight starts from the same spot.
        setFlyFrom({
          x: x + (ENVELOPE_WIDTH - LETTER_WIDTH) / 2,
          y: y + ENVELOPE_HEIGHT - 8 - LETTER_HEIGHT - LETTER_RISE,
        });
        Animated.timing(flyProgress, {
          toValue: 1,
          duration: 850,
          easing: Easing.inOut(Easing.cubic),
          useNativeDriver: false,
        }).start(({ finished: flown }) => {
          if (!flown) {
            return;
          }
          onOpen();
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 350,
            useNativeDriver: false,
          }).start(reset);
        });
      });
    });
  }

  return (
    <>
    <Pressable
      ref={envelopeRef}
      accessibilityRole="button"
      accessibilityLabel="Open your gift"
      accessibilityHint="Opens the envelope and reveals your letter"
      disabled={isOpening}
      onPress={openEnvelope}
      style={({ pressed }) => [
        styles.envelope,
        pressed && !isOpening && styles.pressed,
      ]}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.letter,
          {
            opacity: flyFrom
              ? 0
              : letterProgress.interpolate({
                  inputRange: [0, 0.16, 1],
                  outputRange: [0.86, 1, 1],
                }),
            transform: [
              {
                translateY: letterProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -LETTER_RISE],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.letterTitle}>a little note</Text>
        <Text style={styles.letterText}>just for you ♡</Text>
      </Animated.View>

      <View pointerEvents="none" style={styles.envelopeBody}>
        <View style={styles.frontFold} />
      </View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.flap,
          {
            transform: [
              { perspective: 700 },
              { translateY: 28 },
              {
                rotateX: flapProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                }),
              },
              { translateY: -28 },
            ],
          },
        ]}
      />
      <Animated.Text
        pointerEvents="none"
        style={[styles.seal, { opacity: sealOpacity }]}
      >
        ♥
      </Animated.Text>
    </Pressable>
    <Modal
      visible={flyFrom !== null}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      {flyFrom && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.flyingLetter,
            {
              opacity: overlayOpacity,
              left: flyProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [flyFrom.x, 0],
              }),
              top: flyProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [flyFrom.y, 0],
              }),
              width: flyProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [LETTER_WIDTH, width],
              }),
              height: flyProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [LETTER_HEIGHT, height],
              }),
              borderRadius: flyProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [4, 0],
              }),
              backgroundColor: flyProgress.interpolate({
                inputRange: [0, 0.7, 1],
                outputRange: [colors.paper, colors.paper, colors.background],
              }),
              transform: [
                {
                  rotate: flyProgress.interpolate({
                    inputRange: [0, 0.4, 1],
                    outputRange: ['0deg', '-7deg', '0deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.miniNote,
              {
                opacity: flyProgress.interpolate({
                  inputRange: [0, 0.35],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            <Text style={styles.letterTitle}>a little note</Text>
            <Text style={styles.letterText}>just for you ♡</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.fullLetter,
              {
                width,
                paddingTop: insets.top + 78,
                opacity: flyProgress.interpolate({
                  inputRange: [0.45, 0.85],
                  outputRange: [0, 1],
                  extrapolate: 'clamp',
                }),
              },
            ]}
          >
            <View style={styles.fullLetterFrame}>
              <LetterContent onExplore={() => {}} />
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </Modal>
    </>
  );
}

const ENVELOPE_WIDTH = 207;
const ENVELOPE_HEIGHT = 97;
const LETTER_WIDTH = 148;
const LETTER_HEIGHT = 86;
const LETTER_RISE = 70;

const styles = StyleSheet.create({
  flyingLetter: {
    position: 'absolute',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniNote: {
    alignItems: 'center',
  },
  fullLetter: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
  },
  fullLetterFrame: {
    width: '100%',
    maxWidth: 560,
    paddingHorizontal: 24,
  },
  envelope: {
    position: 'absolute',
    width: 207,
    height: 97,
    bottom: 43,
    alignSelf: 'center',
    overflow: 'visible',
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  letter: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    bottom: 8,
    width: 148,
    height: 86,
    borderRadius: 4,
    backgroundColor: '#FFFCF5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#314A58',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  letterTitle: {
    color: colors.blue,
    fontFamily: type.script,
    fontSize: 15,
    fontStyle: 'italic',
  },
  letterText: {
    color: colors.rose,
    fontFamily: type.script,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
  },
  envelopeBody: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
    backgroundColor: '#E4D7C8',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D0BBA5',
  },
  frontFold: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 0,
    alignSelf: 'center',
    borderLeftWidth: 103,
    borderRightWidth: 103,
    borderBottomWidth: 56,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F0E5D9',
  },
  flap: {
    position: 'absolute',
    zIndex: 4,
    top: 0,
    width: 0,
    height: 0,
    alignSelf: 'center',
    borderLeftWidth: 103,
    borderRightWidth: 103,
    borderTopWidth: 61,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#F2E8DB',
    backfaceVisibility: 'hidden',
  },
  seal: {
    position: 'absolute',
    zIndex: 5,
    top: 33,
    alignSelf: 'center',
    color: colors.rose,
    fontSize: 26,
    textShadowColor: '#FFFFFF',
    textShadowRadius: 5,
  },
});
