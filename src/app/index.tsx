import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { AppScreen, PageHeading } from '../components/AppScreen';
import { GiftEnvelope } from '../components/GiftEnvelope';
import { colors, type } from '../constants/theme';

export default function HomeScreen() {
  return (
    <AppScreen>
      <PageHeading
        eyebrow="A MONTHSARY, JUST FOR YOU"
        title={'Happy monthsary,\nmy love'}
        description=""
      />
      <View style={styles.illustration}>
        <View style={styles.sparkleTop}>
          <Text style={styles.sparkle}>✦</Text>
        </View>
        <GiftEnvelope onOpen={() => router.push('/letter')} />
        <Text style={styles.flower}>✿</Text>
        <Text style={styles.tinyHeart}>♡</Text>
      </View>
      <Text style={styles.caption}>a tiny world of us ♡</Text>
      <Text style={styles.intro}>
        A few words, a few little memories,{'\n'}and a whole lot of love. All
        for you.
      </Text>
      <Text style={styles.hint}>TAP THE ENVELOPE TO OPEN YOUR GIFT</Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  illustration: {
    height: 224,
    backgroundColor: '#E2EFF4',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 0,
  },
  sparkleTop: {
    position: 'absolute',
    top: 17,
    right: 31,
  },
  sparkle: {
    color: '#9AB9C6',
    fontSize: 18,
  },
  flower: {
    color: '#B95B70',
    fontSize: 27,
    position: 'absolute',
    bottom: 24,
    left: 27,
    transform: [{ rotate: '-20deg' }],
  },
  tinyHeart: {
    color: '#B95B70',
    fontSize: 19,
    position: 'absolute',
    bottom: 28,
    right: 35,
  },
  caption: {
    color: colors.blueDark,
    fontFamily: type.script,
    fontStyle: 'italic',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 8,
  },
  intro: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 18,
  },
  hint: {
    color: '#8BA4B3',
    fontSize: 8,
    letterSpacing: 0.85,
    textAlign: 'center',
    marginTop: 12,
  },
});
