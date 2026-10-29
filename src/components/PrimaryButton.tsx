import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  icon?: string;
  accent?: 'blue' | 'rose';
};

export function PrimaryButton({
  label,
  onPress,
  icon = '→',
  accent = 'blue',
}: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        accent === 'rose' && styles.buttonRose,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.label,
          accent === 'rose' && styles.labelRose,
        ]}
      >
        {label}
      </Text>
      <View style={styles.iconWrap}>
        <Text
          style={[
            styles.icon,
            accent === 'rose' && styles.iconRose,
          ]}
        >
          {icon}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    paddingHorizontal: 20,
    borderRadius: 28,
    backgroundColor: colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRose: {
    backgroundColor: '#F8E8EF',
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  label: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '600',
  },
  labelRose: {
    color: colors.rose,
  },
  iconWrap: {
    marginLeft: 9,
  },
  icon: {
    color: colors.surface,
    fontSize: 17,
  },
  iconRose: {
    color: colors.rose,
  },
});
