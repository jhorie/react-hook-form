import { FieldValues } from './fields';
import { NestedValue } from './form';
export declare type Noop = () => void;
interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
}
interface FileList {
    readonly length: number;
    item(index: number): File | null;
    [index: number]: File;
}
export declare type Primitive = null | undefined | string | number | boolean | symbol | bigint;
export declare type EmptyObject = {
    [K in string | number]: never;
};
export declare type NonUndefined<T> = T extends undefined ? never : T;
export declare type LiteralUnion<T extends U, U extends Primitive> = T | (U & {
    _?: never;
});
export declare type DeepPartial<T> = T extends Date | FileList | File | NestedValue ? T : {
    [K in keyof T]?: DeepPartial<T[K]>;
};
export declare type DeepPartialSkipArrayKey<T> = T extends Date | FileList | File | NestedValue ? T : T extends ReadonlyArray<any> ? {
    [K in keyof T]: DeepPartialSkipArrayKey<T[K]>;
} : {
    [K in keyof T]?: DeepPartialSkipArrayKey<T[K]>;
};
export declare type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false;
export declare type DeepMap<T, TValue> = IsAny<T> extends true ? any : T extends Date | FileList | File | NestedValue ? TValue : T extends object ? {
    [K in keyof T]: DeepMap<NonUndefined<T[K]>, TValue>;
} : TValue;
export declare type IsFlatObject<T extends object> = Extract<Exclude<T[keyof T], NestedValue | Date | FileList>, any[] | object> extends never ? true : false;
declare type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;
declare type TupleKey<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
declare type ArrayKey = number;
declare type PathImpl<K extends string | number, V> = V extends Primitive ? `${K}` : `${K}` | `${K}.${Path<V>}`;
export declare type Path<T> = T extends ReadonlyArray<infer V> ? IsTuple<T> extends true ? {
    [K in TupleKey<T>]-?: PathImpl<K & string, T[K]>;
}[TupleKey<T>] : PathImpl<ArrayKey, V> : {
    [K in keyof T]-?: PathImpl<K & string, T[K]>;
}[keyof T];
export declare type FieldPath<TFieldValues extends FieldValues> = Path<TFieldValues>;
declare type ArrayPathImpl<K extends string | number, V> = V extends Primitive ? never : V extends ReadonlyArray<infer U> ? U extends Primitive ? never : `${K}` | `${K}.${ArrayPath<V>}` : `${K}.${ArrayPath<V>}`;
export declare type ArrayPath<T> = T extends ReadonlyArray<infer V> ? IsTuple<T> extends true ? {
    [K in TupleKey<T>]-?: ArrayPathImpl<K & string, T[K]>;
}[TupleKey<T>] : ArrayPathImpl<ArrayKey, V> : {
    [K in keyof T]-?: ArrayPathImpl<K & string, T[K]>;
}[keyof T];
export declare type FieldArrayPath<TFieldValues extends FieldValues> = ArrayPath<TFieldValues>;
export declare type PathValue<T, P extends Path<T> | ArrayPath<T>> = T extends any ? P extends `${infer K}.${infer R}` ? K extends keyof T ? R extends Path<T[K]> ? PathValue<T[K], R> : never : K extends `${ArrayKey}` ? T extends ReadonlyArray<infer V> ? PathValue<V, R & Path<V>> : never : never : P extends keyof T ? T[P] : P extends `${ArrayKey}` ? T extends ReadonlyArray<infer V> ? V : never : never : never;
export declare type FieldPathValue<TFieldValues extends FieldValues, TFieldPath extends FieldPath<TFieldValues>> = PathValue<TFieldValues, TFieldPath>;
export declare type FieldArrayPathValue<TFieldValues extends FieldValues, TFieldArrayPath extends FieldArrayPath<TFieldValues>> = PathValue<TFieldValues, TFieldArrayPath>;
export declare type FieldPathValues<TFieldValues extends FieldValues, TPath extends FieldPath<TFieldValues>[] | readonly FieldPath<TFieldValues>[]> = {} & {
    [K in keyof TPath]: FieldPathValue<TFieldValues, TPath[K] & FieldPath<TFieldValues>>;
};
declare type UnionKeys<T> = T extends any ? keyof T : never;
declare type UnionValues<T, K> = T extends any ? K extends keyof T ? T[K] : never : never;
declare type OptionalKeys<T> = T extends any ? {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T] : never;
declare type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare type UnionLike<T> = [T] extends [Date | FileList | File | NestedValue] ? T : [T] extends [ReadonlyArray<any>] ? {
    [K in keyof T]: UnionLike<T[K]>;
} : [T] extends [object] ? PartialBy<{
    [K in UnionKeys<T>]: UnionLike<UnionValues<T, K>>;
}, Exclude<UnionKeys<T>, keyof T> | OptionalKeys<T>> : T;
export {};
