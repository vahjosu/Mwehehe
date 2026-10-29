import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { dateOptions, type DateOptionId } from '../constants/dates';
import { colors, type } from '../constants/theme';
import { useDatePlan } from '../context/DatePlanContext';

function findOption(id: DateOptionId) {
  return dateOptions.find((option) => option.id === id)!;
}

function PickerModal() {
  const { pickerOpen, closePicker } = useDatePlan();

  return (
    <Modal
      visible={pickerOpen}
      transparent
      animationType="fade"
      onRequestClose={closePicker}
    >
      {pickerOpen && <PickerForm />}
    </Modal>
  );
}

// Mounted only while open, so it starts fresh from the saved plan each time.
function PickerForm() {
  const { plan, closePicker, savePlan } = useDatePlan();
  const [selected, setSelected] = useState<DateOptionId | null>(
    plan?.dateId ?? null,
  );
  const [dress, setDress] = useState(plan?.dress ?? '');
  const option = selected ? findOption(selected) : null;

  function save() {
    if (!selected) return;
    savePlan({ dateId: selected, dress: dress.trim() });
    closePicker();
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <View style={styles.sheet}>
          {option ? (
            <>
              <Text style={styles.sheetEyebrow}>
                {option.icon} {option.title.toUpperCase()}
              </Text>
              <Text style={styles.sheetTitle}>What will you wear?</Text>
              <TextInput
                value={dress}
                onChangeText={setDress}
                placeholder="e.g. a flowy yellow dress"
                placeholderTextColor="#B79AA8"
                multiline
                style={styles.input}
                autoFocus
              />
              <Pressable style={styles.primary} onPress={save}>
                <Text style={styles.primaryLabel}>Save our date ♡</Text>
              </Pressable>
              <Pressable onPress={() => setSelected(null)}>
                <Text style={styles.secondary}>← Choose another date</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.sheetEyebrow}>✦ OUR NEXT DATE</Text>
              <Text style={styles.sheetTitle}>What kind of date?</Text>
              <View style={styles.options}>
                {dateOptions.map((item) => (
                  <Pressable
                    key={item.id}
                    onPress={() => setSelected(item.id)}
                    style={({ pressed }) => [
                      styles.option,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.optionIcon}>{item.icon}</Text>
                    <Text style={styles.optionLabel}>{item.title}</Text>
                  </Pressable>
                ))}
              </View>
              <Pressable onPress={closePicker}>
                <Text style={styles.secondary}>Maybe later</Text>
              </Pressable>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

function ReviewModal() {
  const { plan, reviewOpen, closeReview, openPicker, clearPlan } =
    useDatePlan();
  const option = plan ? findOption(plan.dateId) : null;

  return (
    <Modal
      visible={reviewOpen && !!plan}
      transparent
      animationType="fade"
      onRequestClose={closeReview}
    >
      <Pressable style={styles.backdrop} onPress={closeReview}>
        <Pressable style={styles.sheet}>
          <Text style={styles.sheetEyebrow}>♥ OUR PLAN</Text>
          <Text style={styles.sheetTitle}>
            {option?.icon} {option?.title}
          </Text>
          <Text style={styles.label}>What you’ll wear</Text>
          <Text style={styles.value}>{plan?.dress || 'Surprise me ♡'}</Text>
          <Pressable
            style={styles.primary}
            onPress={() => {
              closeReview();
              openPicker();
            }}
          >
            <Text style={styles.primaryLabel}>Change our plan</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              clearPlan();
              closeReview();
            }}
          >
            <Text style={styles.secondary}>Clear plan</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DatePlanOverlay() {
  const { plan, openReview } = useDatePlan();
  const insets = useSafeAreaInsets();

  return (
    <>
      {plan && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Review our date plan"
          onPress={openReview}
          style={[styles.fab, { bottom: insets.bottom + 88 }]}
        >
          <Text style={styles.fabHeart}>♥</Text>
          <View style={styles.badge} />
        </Pressable>
      )}
      <PickerModal />
      <ReviewModal />
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 18,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.rose,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.rose,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabHeart: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFD36B',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(36, 40, 60, 0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  sheet: {
    width: '100%',
    maxWidth: 460,
    alignSelf: 'center',
    backgroundColor: '#FFF8F7',
    borderRadius: 20,
    padding: 22,
  },
  sheetEyebrow: {
    color: colors.rose,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sheetTitle: {
    color: colors.rose,
    fontFamily: type.serif,
    fontSize: 24,
    marginBottom: 16,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    marginBottom: 14,
  },
  option: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderColor: '#E9DCE2',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 26,
    marginBottom: 6,
  },
  optionLabel: {
    color: '#5E4852',
    fontFamily: type.serif,
    fontSize: 14,
  },
  pressed: {
    opacity: 0.7,
  },
  input: {
    minHeight: 84,
    backgroundColor: '#FFFFFF',
    borderColor: '#E9DCE2',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    color: '#5E4852',
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  primary: {
    backgroundColor: colors.rose,
    borderRadius: 26,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  primaryLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  secondary: {
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 4,
  },
  label: {
    color: colors.muted,
    fontSize: 11,
    marginBottom: 4,
  },
  value: {
    color: '#5E4852',
    fontFamily: type.serif,
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 20,
  },
});
