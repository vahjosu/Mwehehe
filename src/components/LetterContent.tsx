import { StyleSheet, Text, View } from 'react-native';
import { PageHeading } from './AppScreen';
import { PrimaryButton } from './PrimaryButton';
import { colors, type } from '../constants/theme';

export function LetterContent({ onExplore }: { onExplore: () => void }) {
  return (
    <>
      <PageHeading
        eyebrow="A MONTHSARY NOTE"
        title="A monthsary letter"
        description="A little something to celebrate us."
      />
      <View style={styles.letter}>
        <Text style={styles.salutation}>My love,</Text>
        <Text style={styles.paragraph}>
          If I could wrap up a feeling and give it to you, it would be this: how
          lucky I feel to love you.
        </Text>
        <Text style={styles.paragraph}>
          I love the way you make ordinary moments feel like somewhere I want to
          stay. The laughter, the quiet, the simple joy of being beside you.
        </Text>
        <Text style={styles.paragraph}>
          So here’s a little place to keep that feeling. A reminder that you are
          loved, in all the little ways, every day.
        </Text>
        <View style={styles.signatureRow}>
          <Text style={styles.signature}>Always, me</Text>
          <Text style={styles.signatureHeart}>♡</Text>
        </View>
      </View>
      <Text style={styles.note}>
        KEEP THIS CLOSE, ON THE BRIGHT DAYS AND THE QUIET ONES
      </Text>
      <PrimaryButton label="Explore our months together" onPress={onExplore} />
    </>
  );
}

const styles = StyleSheet.create({
  letter: {
    backgroundColor: colors.paper,
    borderRadius: 6,
    paddingHorizontal: 22,
    paddingTop: 23,
    paddingBottom: 19,
    borderWidth: 1,
    borderColor: '#E9E7DF',
    shadowColor: '#45647A',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  salutation: {
    color: colors.blue,
    fontFamily: type.script,
    fontSize: 19,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  paragraph: {
    color: '#526D7F',
    fontFamily: type.serif,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 14,
  },
  signatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  signature: {
    color: colors.blue,
    fontFamily: type.script,
    fontSize: 17,
    fontStyle: 'italic',
  },
  signatureHeart: {
    color: colors.blue,
    fontSize: 23,
  },
  note: {
    color: '#8BA4B3',
    fontSize: 8,
    letterSpacing: 0.7,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 17,
    marginBottom: 18,
  },
});
