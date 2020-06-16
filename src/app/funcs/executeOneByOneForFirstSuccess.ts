/**
 * Выполняет вызов функций без параметров одну за другой, до первой успешной, которая возвратит true
 * @param funcs массив функций для вызова
 */
export function executeOneByOneForFirstSuccess(...funcs: (() => boolean)[]): boolean {
    if (!funcs) {
        return false;
    }
    for (const func of funcs) {
        if (func && typeof func === 'function') {
            const isSuccess = func();
            if (isSuccess) {
                return true;
            }
        }
    }
    return false;
}