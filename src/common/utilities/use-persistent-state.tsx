import { useState, useEffect, Dispatch, SetStateAction } from "react";

export function usePersistentState<S>(
    key: string,
    initialValue?: S
): [S, Dispatch<SetStateAction<S>>] {

    if (!key) {
        throw new Error("Key must be provided to persist to localStorage");
    }

    const initialState = () =>
        (JSON.parse(window.localStorage.getItem(key) as string)) || initialValue;

    const [value, setValue] = useState(initialState);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}