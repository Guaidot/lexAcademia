declare module 'react' {
    export type FC<P = {}> = (props: P) => any;
    export function useState<T>(initialState: T | (() => T)): [T, (val: T) => void];
    export function useMemo<T>(factory: () => T, deps: any[] | undefined): T;

    function React(props: any): any;
    namespace React {
        export type FC<P = {}> = (props: P) => any;
        export function useState<T>(initialState: T | (() => T)): [T, (val: T) => void];
        export function useMemo<T>(factory: () => T, deps: any[] | undefined): T;
    }

    export default React;
}

declare namespace JSX {
    interface IntrinsicElements {
        [elemName: string]: any;
    }
}

declare module 'react/jsx-runtime';