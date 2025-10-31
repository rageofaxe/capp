import { createEffect, createStore, forward, sample, StoreWritable } from "effector";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LocalStore = <T>(key: string) => (value: T) => StoreWritable<T>;

const createLocalStore: LocalStore = <T>(key: string) => (value: T) => {
  const $store = createStore(value);
  const loadFx = createEffect<string, T>();
  const saveFx = createEffect<T, T>();

  $store.on(loadFx.done, (state, { result }) => result || state);

  loadFx.use(
    (key) =>
      new Promise(async (resolve) => {
        const value = await AsyncStorage.getItem(key);
        resolve(value ? JSON.parse(value) : null);
      }),
  );

  saveFx.use(
    (value) =>
      new Promise(async (resolve) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        resolve(value);
      }),
  );

  sample({
    clock: $store,
    target: saveFx,
  });

  loadFx(key);
  saveFx(value);

  return $store;
};

export default createLocalStore;
