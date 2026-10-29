import { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, type } from '../constants/theme';
import type { ImageSourcePropType } from 'react-native';

type MemoryCardProps = {
  title: string;
  detail: string;
  images: ImageSourcePropType[];
  accent: string;
  saved: boolean;
  delay?: number;
  onPress: () => void;
};

const SLIDE_MS = 3200;
const FADE_MS = 700;

export function MemoryCard({
  title,
  detail,
  images,
  accent,
  saved,
  delay = 0,
  onPress,
}: MemoryCardProps) {
  const [current, setCurrent] = useState(0);
  const [fade] = useState(() => new Animated.Value(1));
  const count = images.length;
  const previous = (current - 1 + count) % count;

  useEffect(() => {
    if (count < 2) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const advance = () => {
      fade.setValue(0);
      setCurrent((value) => (value + 1) % count);
      Animated.timing(fade, {
        toValue: 1,
        duration: FADE_MS,
        useNativeDriver: true,
      }).start();
    };
    const start = setTimeout(() => {
      advance();
      interval = setInterval(advance, SLIDE_MS);
    }, delay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [count, delay, fade]);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}: ${detail}${saved ? ', saved' : ''}`}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.artwork}>
        {count > 1 && (
          <Image
            source={images[previous]}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Animated.Image
          source={images[current]}
          style={[styles.image, count > 1 && { opacity: fade }]}
          resizeMode="cover"
        />
        {count > 1 && (
          <View style={styles.dots}>
            {images.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === current && styles.dotActive]}
              />
            ))}
          </View>
        )}
        <Text style={styles.decoration}>{accent}</Text>
        <Text style={styles.saveMark}>{saved ? '♥' : '♡'}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.detail}>{detail}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47.5%',
    backgroundColor: '#FFFFFF',
    padding: 8,
    paddingBottom: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#2F5570',
    shadowOpacity: 0.14,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  pressed: {
    opacity: 0.82,
  },
  artwork: {
    width: '100%',
    aspectRatio: 0.85,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  dots: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 30,
    flexDirection: 'row',
    gap: 3,
  },
  dot: {
    flex: 1,
    maxWidth: 14,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
  },
  decoration: {
    color: '#FFFFFF',
    fontSize: 13,
    position: 'absolute',
    top: 8,
    left: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowRadius: 4,
  },
  saveMark: {
    color: '#FFFFFF',
    fontSize: 16,
    position: 'absolute',
    right: 8,
    bottom: 6,
    textShadowColor: colors.rose,
    textShadowRadius: 5,
  },
  title: {
    color: colors.ink,
    fontFamily: type.script,
    fontStyle: 'italic',
    fontSize: 17,
    textAlign: 'center',
    marginBottom: 3,
  },
  detail: {
    color: colors.muted,
    fontSize: 11,
    textAlign: 'center',
  },
});
