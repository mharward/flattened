import { usePersistentState } from "./use-persistent-state";
import React from "react";

describe('usePersistentState', () => {
    const setValue: any = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation((init?: any) => {
        return [init(), setValue];
    });

    const useEffectSpy = jest.spyOn(React, 'useEffect');
    useEffectSpy.mockImplementation((useEffectFunc) => {});
  
    afterEach(() => {
      jest.clearAllMocks();
      localStorage.clear();
    });
    
    it('should set state with a function that resolves to a default string value on first load', () => {
        const [value] = usePersistentState('key', '100')

        expect(useStateSpy).toHaveBeenCalled();
        expect(value).toEqual('100');
        expect(localStorage.getItem('key')).toEqual(null);
    });

    it('should set state with a function that resolves to a default object value on first load', () => {
        const [value] = usePersistentState('key', { key2: "value2" })

        expect(useStateSpy).toHaveBeenCalled();
        expect(value).toEqual({ key2: "value2" });
        expect(localStorage.getItem('key')).toEqual(null);
    });

    it('should set state to a string value in local storage when the key matches', () => {
        localStorage.setItem('key', JSON.stringify('200'));

        const [value] = usePersistentState('key', '100')

        expect(useStateSpy).toHaveBeenCalled();
        expect(value).toEqual('200');
        expect(localStorage.getItem('key')).toEqual('\"200\"');
    });

    it('should set state to an object value in local storage when the key matches', () => {
        localStorage.setItem('key', JSON.stringify({ key1: "value1"}));

        const [value] = usePersistentState('key', '100')

        expect(useStateSpy).toHaveBeenCalled();
        expect(value).toEqual({ key1: "value1"});
        expect(localStorage.getItem('key')).toEqual('{\"key1\":\"value1\"}');
    });

    it('should return an array containing the value and a function to set the value', () => {
        const [value, setValue] = usePersistentState('key', '100');

        expect(value).toEqual('100');
        expect(setValue).toEqual(setValue);
    });

    it('should update the value in local storage when its value is set', () => {
        useEffectSpy.mockImplementation((useEffectFunc) => {
            useEffectFunc();
        });

        usePersistentState('key', '100');

        expect(useEffectSpy).toHaveBeenCalled();
        expect(localStorage.getItem('key')).toEqual('\"100\"');
    });

    it('should set value to undefined if no initial value provided', () => {
        const [value] = usePersistentState('key');

        expect(value).toBeUndefined();
    })

    it('should throw error if no key is provided', () => {
        expect(() =>  usePersistentState(null as any)).toThrowError();
    })
});