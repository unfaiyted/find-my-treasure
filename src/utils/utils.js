
export const tryFn = (fn, fallback) => {
    fallback = (fallback) ? fallback : null;
    try {
        return fn();
    }   catch (e) {
       return fallback;
    }
};
