import { FieldArrayWithId, FieldValues } from '../types';
declare const _default: <TFieldArrayValues extends FieldValues = FieldValues, TFieldName extends import("../types").ArrayPath<TFieldArrayValues> = import("../types").ArrayPath<TFieldArrayValues>, TKeyName extends string = "id">(values: Partial<TFieldArrayValues>[] | undefined, keyName: TKeyName) => Partial<FieldArrayWithId<TFieldArrayValues, TFieldName, TKeyName>>[];
export default _default;
