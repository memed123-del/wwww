declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export type ReactNode = any;
  export type FC<P = {}> = (props: P & { children?: ReactNode }) => any;
  export type FormEvent = any;
  export type ChangeEvent<T = any> = any;
  export type RefObject<T> = { current: T | null };
  export function useState<T = any>(initial?: T): [T, (v: T) => void];
  export function useRef<T = any>(initial?: T | null): { current: T | null };
  export function useEffect(...args: any[]): any;
  export function useContext(...args: any[]): any;
  export function createContext(defaultValue?: any): any;
  const React: any;
  export default React;
  export const createElement: any;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const jsxDEV: any;
}

declare namespace React {
  type ReactNode = any;
  type FC<P = {}> = (props: P & { children?: ReactNode }) => any;
  type FormEvent = any;
  type ChangeEvent<T = any> = any;
  interface RefObject<T> { current: T | null }
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.avif';
declare module '*.svg';
declare module '*.webp';

interface ImportMeta {
  glob<T = string>(pattern: string, options?: { eager?: boolean; as?: 'url' | 'raw' | 'raw' }): Record<string, T>;
}
