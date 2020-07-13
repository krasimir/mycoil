import { useState, useEffect } from "react";

const State = {};
const Selectors = {};

export function atom(options) {
  State[options.key] = {
    key: options.key,
    value: options.default,
    subscribers: [],
    get() {
      return this.value;
    },
    set(newValue) {
      this.value = newValue;
      this.subscribers.forEach((s) => s(newValue));
    },
    subscribe(callback) {
      this.subscribers.push(callback);
    },
    unsubscribe(callback) {
      this.subscribers = this.subscribers.filter((s) => s !== callback);
    },
  };
}

export function useMycoilState(key) {
  if (!State[key]) throw new Error(`There is no state matching key ${key}`);

  const state = State[key];
  const [bridgeValue, setBridgeValue] = useState(state.get());

  useEffect(() => {
    const subscription = (updatedValue) => {
      setBridgeValue(updatedValue);
    };
    state.subscribe(subscription);
    return () => {
      state.unsubscribe(subscription);
    };
  }, []);

  return [
    state.get(),
    (newValue) => {
      state.set(newValue);
    },
  ];
}

export function selector(options) {
  Selectors[options.key] = options.get;
}

export function useMycoilValue(key) {
  if (!Selectors[key])
    throw new Error(`There is no selector matching key ${key}`);

  const selector = Selectors[key];
  return selector({
    get(stateKey) {
      if (!State[stateKey])
        throw new Error(`There is no state matching key ${stateKey}`);

      const state = State[stateKey];
      return state.get();
    },
  });
}
