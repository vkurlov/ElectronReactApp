/**
 * Выполняет вызов функций без параметров одну за другой
 * @param funcs массив функций для вызова
 */
export function executeOneByOne(...funcs: (() => void)[]) {
    if (!funcs) {
        return;
    }
    for (const func of funcs) {
        if (func && typeof func === 'function') {
            func();
        }
    }
}