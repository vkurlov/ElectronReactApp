/**
 * Возвращает true, если проект в окружении разаработки
 *     process.env.NODE_ENV === 'development', иначе false
 */
export function isDev(): boolean {
    return process && process.env && process.env.NODE_ENV === 'development';
}