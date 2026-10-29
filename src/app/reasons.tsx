import { Image, StyleSheet, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { AppScreen, PageHeading } from '../components/AppScreen';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, type } from '../constants/theme';
import { useDatePlan } from '../context/DatePlanContext';

const reasons = [
  {
    title: 'Cute smile',
    detail: 'The one that makes my whole day better.',
    image: require('../img/cutesmile.jpg') as ImageSourcePropType,
  },
  {
    title: 'Kind heart',
    detail: 'The way you care, even in the smallest ways.',
    image: require('../img/kindheart.jpeg') as ImageSourcePropType,
  },
  {
    title: 'Simply being you',
    detail: 'You don’t have to do a thing to be my favorite.',
    image: require('../img/simple.jpg') as ImageSourcePropType,
  },
];

export default function ReasonsScreen() {
  const { plan, openPicker } = useDatePlan();

  return (
    <AppScreen accent="rose">
      <PageHeading
        eyebrow="A MONTHSARY LIST"
        title={'Little reasons\nI love you'}
        description=""
        accent="rose"
      />
      <View style={styles.list}>
        {reasons.map((reason) => (
          <View key={reason.title} style={styles.reason}>
            <Image source={reason.image} style={styles.photo} />
            <View style={styles.reasonCopy}>
              <Text style={styles.reasonTitle}>{reason.title}</Text>
              <Text style={styles.reasonDetail}>{reason.detail}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.celebration}>
        <Text style={styles.eyebrow}>✦ ONE MORE LITTLE CELEBRATION</Text>
        <Text style={styles.celebrationTitle}>
          {plan ? 'Here’s to us, always ♡' : 'Celebrate our monthsary?'}
        </Text>
        <Text style={styles.copy}>
          A quiet night just for us. Something delicious, no distractions, and
          my favorite person.
        </Text>
        <PrimaryButton
          label={plan ? 'Change our date plan' : 'Yes, let’s celebrate'}
          icon={plan ? '♥' : '♡'}
          accent="rose"
          onPress={openPicker}
        />
        <Text style={styles.link}>Let’s plan the night together</Text>
      </View>
      <Text style={styles.closing}>
        You’re my favorite. In every little way.
      </Text>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
    marginBottom: 17,
  },
  reason: {
    minHeight: 66,
    backgroundColor: '#FFFFFF',
    borderColor: '#E9DCE2',
    borderWidth: 1,
    borderRadius: 11,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 56,
    height: 56,
    borderRadius: 10,
    marginRight: 13,
  },
  reasonCopy: {
    flex: 1,
  },
  reasonTitle: {
    color: '#5E4852',
    fontFamily: type.serif,
    fontSize: 15,
    marginBottom: 4,
  },
  reasonDetail: {
    color: colors.muted,
    fontSize: 11,
  },
  celebration: {
    backgroundColor: colors.rose,
    borderRadius: 15,
    paddingHorizontal: 18,
    paddingTop: 19,
    paddingBottom: 15,
    alignItems: 'center',
  },
  eyebrow: {
    color: '#F3CAD8',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 9,
  },
  celebrationTitle: {
    color: '#FFF8F7',
    fontFamily: type.serif,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 7,
  },
  copy: {
    color: '#F3DFE6',
    fontSize: 11,
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: 14,
  },
  link: {
    color: '#F4D6E0',
    fontFamily: type.script,
    fontSize: 12,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    marginTop: 12,
  },
  closing: {
    color: colors.rose,
    fontFamily: type.script,
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 17,
  },
});
