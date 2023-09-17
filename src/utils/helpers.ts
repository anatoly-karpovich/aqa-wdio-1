export type FindAsyncCallback<T> = (value: T, index?: number, array?: T[]) => Promise<boolean>;

export async function find<T>(array: T[], callback: FindAsyncCallback<T>): Promise<T | undefined> {
    for (let i = 0; i < array?.length; i++) {
        const result = await callback(array[i], i, array);
        if (result) {
            return array[i];
        }
    }
    return undefined;
}