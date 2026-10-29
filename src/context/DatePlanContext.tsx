import Storage from 'expo-sqlite/kv-store';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import { dateOptions, type DatePlan } from '../constants/dates';

const STORAGE_KEY = 'little-love:date-plan';

type DatePlanContextValue = {
  plan: DatePlan | null;
  pickerOpen: boolean;
  reviewOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
  openReview: () => void;
  closeReview: () => void;
  savePlan: (plan: DatePlan) => void;
  clearPlan: () => void;
};

const DatePlanContext = createContext<DatePlanContextValue | null>(null);

function isValidPlan(value: unknown): value is DatePlan {
  if (!value || typeof value !== 'object') return false;
  const { dateId, dress } = value as Partial<DatePlan>;
  return (
    typeof dress === 'string' && dateOptions.some((option) => option.id === dateId)
  );
}

function loadPlan(): DatePlan | null {
  try {
    const raw = Storage.getItemSync(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return isValidPlan(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function DatePlanProvider({ children }: PropsWithChildren) {
  const [plan, setPlan] = useState<DatePlan | null>(loadPlan);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  const savePlan = useCallback((next: DatePlan) => {
    setPlan(next);
    try {
      Storage.setItemSync(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const clearPlan = useCallback(() => {
    setPlan(null);
    try {
      Storage.removeItemSync(STORAGE_KEY);
    } catch {}
  }, []);

  const value = useMemo(
    () => ({
      plan,
      pickerOpen,
      reviewOpen,
      openPicker: () => setPickerOpen(true),
      closePicker: () => setPickerOpen(false),
      openReview: () => setReviewOpen(true),
      closeReview: () => setReviewOpen(false),
      savePlan,
      clearPlan,
    }),
    [plan, pickerOpen, reviewOpen, savePlan, clearPlan],
  );

  return (
    <DatePlanContext.Provider value={value}>
      {children}
    </DatePlanContext.Provider>
  );
}

export function useDatePlan() {
  const value = useContext(DatePlanContext);
  if (!value) throw new Error('useDatePlan must be used inside DatePlanProvider');
  return value;
}
