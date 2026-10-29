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
        <Text style={styles.salutation}>Hi love,</Text>
        <Text style={styles.paragraph}>
          Happy third monthsary, my love. ❤️
        </Text>
        <Text style={styles.paragraph}>
          Thank you for everything—for being there through the highs and lows,
          for taking care of me when I was sick, and for staying by my side even
          during times when we didn’t have much to eat. Those moments mean more
          to me than you know.
        </Text>
        <Text style={styles.paragraph}>
          You deserve someone who will treat you like a queen, yet you chose me.
          I’m so grateful to have you in my life, and I promise to keep loving
          you, appreciating you, and doing my best for you.
        </Text>
        <Text style={styles.paragraph}>
          I may not have written this letter myself, but I hope my love reaches
          you in a way that makes you feel special. I hope you love your gift and
          enjoy exploring our memories together.
        </Text>
        <Text style={styles.paragraph}>
          Again, happy monthsary, baby. I love you so, so much. Mmmwaaaah! 💋
        </Text>
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
