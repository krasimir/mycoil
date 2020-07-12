# Mycoil

A 2Kb replica of the Facebook's [Recoil](https://recoiljs.org/) library

### Defining an atom

```js
atom({
  key: "counterState",
  default: 0,
});
```

To use it in `useMycoilState` pass the `key`, not the atom itself. Same for getting the value in a selector.

### Defining a selector

```js
selector({
  key: "formattedValue",
  get: ({ get }: { get: Function }) => {
    return `Counter: ${get("counterState")}`;
  },
});
```

To use it in `useMycoilValue` pass the `key`, not the selector itself.

### Complete example

```jsx
import React from "react";
import { atom, useMycoilState, selector, useMycoilValue } from "mycoil";

atom({
  key: "counterState",
  default: 0,
});

selector({
  key: "formattedValue",
  get: ({ get }: { get: Function }) => {
    return `Counter: ${get("counterState")}`;
  },
});

function Mycoil1() {
  const [counterValue, setCounter] = useMycoilState("counterState");
  const formattedValue = useMycoilValue("formattedValue");
  return (
    <>
      <p>{counterValue}</p>
      <p>{formattedValue}</p>
      <button onClick={() => setCounter(counterValue + 1)}>add</button>
    </>
  );
}

function Mycoil2() {
  const [counterValue] = useMycoilState("counterState");
  return (
    <>
      <h1>{counterValue}</h1>
    </>
  );
}

function App() {
  return (
    <>
      <Mycoil1 />
      <Mycoil2 />
    </>
  );
}
```
