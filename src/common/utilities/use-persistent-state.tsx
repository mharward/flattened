import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function usePersistentState<S>(
    key: string,
    defaultValue: S
): [S, Dispatch<SetStateAction<S>>] {
    const initialState = () =>
        JSON.parse(window.localStorage.getItem(key) || '') || defaultValue;

    const [value, setValue] = useState(initialState);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}