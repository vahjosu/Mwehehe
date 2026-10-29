import Storage from 'expo-sqlite/kv-store';

export const storage = {
  get: (key: string) => Storage.getItemSync(key),
  set: (key: string, value: string) => Storage.setItemSync(key, value),
  remove: (key: string) => Storage.removeItemSync(key),
};
