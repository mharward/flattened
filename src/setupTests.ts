
export const localStorageMock = (function() {
    let store: any = {};

    return {
        getItem: (key: string) => {
            return store[key] || null;
        },
        setItem: (key: string, value: any) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        }
    };

})();

(global as any).localStorage = localStorageMock;
