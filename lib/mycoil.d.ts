export {};

interface AtomOptions {
  key: string;
  default: any;
}

interface SelectorOptions {
  key: string;
  get: Function;
}

export function atom(options: AtomOptions);
export function selector(options: SelectorOptions): any;
export function useMycoilState(key: string): [any, Function];
export function useMycoilValue(key: string): any;
