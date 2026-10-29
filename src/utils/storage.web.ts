export const storage = {
  get: (key: string) => globalThis.localStorage?.getItem(key) ?? null,
  set: (key: string, value: string) => globalThis.localStorage?.setItem(key, value),
  remove: (key: string) => globalThis.localStorage?.removeItem(key),
};
