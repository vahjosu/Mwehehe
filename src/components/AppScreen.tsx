import type { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, type } from '../constants/theme';

type AppScreenProps = PropsWithChildren<{
  accent?: 'blue' | 'rose';
}>;

export function AppScreen({ children, accent = 'blue' }: AppScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.frame}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <Text style={styles.brand}>a little love</Text>
            <View
              style={[
                styles.heartBadge,
                accent === 'rose' && styles.heartBadgeRose,
              ]}
            >
              <Text
                style={[
                  styles.heart,
                  accent === 'rose' && styles.heartRose,
                ]}
              >
                ♡
              </Text>
            </View>
          </View>
          {children}
          <Text style={styles.footerNote}>MADE WITH LOVE, ONLY FOR YOU.</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
  accent = 'blue',
}: {
  eyebrow: string;
  title: string;
  description: string;
  accent?: 'blue' | 'rose';
}) {
  return (
    <View style={styles.heading}>
      <Text
        style={[
          styles.eyebrow,
          accent === 'rose' && styles.eyebrowRose,
        ]}
      >
        {eyebrow}
      </Text>
      <Text
        style={[
          styles.title,
          accent === 'rose' && styles.titleRose,
        ]}
      >
        {title}
      </Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 18,
  },
  topBar: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  brand: {
    color: colors.blue,
    fontFamily: type.script,
    fontSize: 16,
    fontStyle: 'italic',
  },
  heartBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.bluePale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartBadgeRose: {
    backgroundColor: colors.roseLight,
  },
  heart: {
    color: colors.blue,
    fontSize: 19,
  },
  heartRose: {
    color: colors.rose,
  },
  heading: {
    marginBottom: 20,
  },
  eyebrow: {
    color: colors.blueDark,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.15,
    marginBottom: 8,
  },
  eyebrowRose: {
    color: colors.rose,
  },
  title: {
    color: colors.ink,
    fontFamily: type.serif,
    fontSize: 34,
    lineHeight: 40,
    marginBottom: 7,
  },
  titleRose: {
    color: colors.rose,
  },
  description: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  footerNote: {
    color: '#91A8B6',
    fontSize: 8,
    letterSpacing: 1,
    textAlign: 'center',
    marginTop: 22,
  },
});
