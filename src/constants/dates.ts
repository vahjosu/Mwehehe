export const dateOptions = [
  { id: 'movie', title: 'Movie date', icon: '🎬' },
  { id: 'coffee', title: 'Coffee date', icon: '☕' },
  { id: 'ramen', title: 'Ramen date', icon: '🍜' },
  { id: 'streetfood', title: 'Streetfood date', icon: '🍢' },
  { id: 'nightout', title: 'Nightout date', icon: '🌙' },
  { id: 'mall', title: 'Mall date', icon: '🛍️' },
] as const;

export type DateOptionId = (typeof dateOptions)[number]['id'];

export type DatePlan = {
  dateId: DateOptionId;
  dress: string;
};
