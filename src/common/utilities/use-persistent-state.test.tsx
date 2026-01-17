import { renderHook, act } from '@testing-library/react';
import { usePersistentState } from './use-persistent-state';

describe('usePersistentState', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should set state with a default string value on first load', () => {
        const { result } = renderHook(() => usePersistentState('key', '100'));

        expect(result.current[0]).toEqual('100');
    });

    it('should set state with a default object value on first load', () => {
        const { result } = renderHook(() =>
            usePersistentState('key', { key2: 'value2' })
        );

        expect(result.current[0]).toEqual({ key2: 'value2' });
    });

    it('should set state to a string value in local storage when the key matches', () => {
        localStorage.setItem('key', JSON.stringify('200'));

        const { result } = renderHook(() => usePersistentState('key', '100'));

        expect(result.current[0]).toEqual('200');
    });

    it('should set state to an object value in local storage when the key matches', () => {
        localStorage.setItem('key', JSON.stringify({ key1: 'value1' }));

        const { result } = renderHook(() => usePersistentState('key', '100'));

        expect(result.current[0]).toEqual({ key1: 'value1' });
    });

    it('should return an array containing the value and a function to set the value', () => {
        const { result } = renderHook(() => usePersistentState('key', '100'));

        expect(result.current[0]).toEqual('100');
        expect(typeof result.current[1]).toBe('function');
    });

    it('should update the value in local storage when its value is set', () => {
        const { result } = renderHook(() => usePersistentState('key', '100'));

        act(() => {
            result.current[1]('200');
        });

        expect(result.current[0]).toEqual('200');
        expect(localStorage.getItem('key')).toEqual('"200"');
    });

    it('should throw error if no key is provided', () => {
        expect(() => {
            renderHook(() => usePersistentState(null as unknown as string));
        }).toThrowError();
    });
});
