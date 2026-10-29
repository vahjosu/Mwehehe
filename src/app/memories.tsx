import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppScreen, PageHeading } from '../components/AppScreen';
import { MemoryCard } from '../components/MemoryCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { memories } from '../constants/memories';
import { colors } from '../constants/theme';

export default function MemoriesScreen() {
  const [savedMemories, setSavedMemories] = useState<number[]>([]);

  function toggleSaved(index: number) {
    setSavedMemories((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  return (
    <AppScreen>
      <PageHeading
        eyebrow="THE LITTLE THINGS, KEPT CLOSE"
        title="Our little world"
        description="A few favorite moments. Room for so many more."
      />
      <View style={styles.grid}>
        {memories.map((memory, index) => (
          <MemoryCard
            key={memory.title}
            {...memory}
            delay={index * 450}
            saved={savedMemories.includes(index)}
            onPress={() => toggleSaved(index)}
          />
        ))}
      </View>
      <Text style={styles.tip}>Tap a caption to keep it close ♡</Text>
      <PrimaryButton
        label="A few more reasons"
        onPress={() => router.push('/reasons')}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },
  tip: {
    color: colors.muted,
    fontFamily: 'Georgia',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
});
