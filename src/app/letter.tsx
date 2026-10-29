import { router } from 'expo-router';
import { AppScreen } from '../components/AppScreen';
import { LetterContent } from '../components/LetterContent';

export default function LetterScreen() {
  return (
    <AppScreen>
      <LetterContent onExplore={() => router.push('/memories')} />
    </AppScreen>
  );
}
