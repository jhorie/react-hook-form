import * as React from 'react';
import { Subject, Subscription } from '../utils/createSubject';
import { ErrorOption, FieldError, FieldErrors } from './errors';
import { EventType } from './events';
import { FieldArrayWithId } from './fieldArray';
import { FieldRefs, FieldValue, FieldValues, InternalFieldName } from './fields';
import { Resolver } from './resolvers';
import { DeepMap, DeepPartial, FieldArrayPath, FieldPath, FieldPathValue, FieldPathValues, Noop, UnionLike } from './utils';
import { RegisterOptions } from './validator';
declare const $NestedValue: unique symbol;
export declare type NestedValue<TValue extends object = object> = {
    [$NestedValue]: never;
} & TValue;
export declare type UnpackNestedValue<T> = T extends NestedValue<infer U> ? U : T extends Date | FileList | File ? T : T extends object ? {
    [K in keyof T]: UnpackNestedValue<T[K]>;
} : T;
export declare type DefaultValues<TFieldValues> = UnpackNestedValue<DeepPartial<TFieldValues>>;
export declare type InternalNameSet = Set<InternalFieldName>;
export declare type ValidationMode = {
    onBlur: 'onBlur';
    onChange: 'onChange';
    onSubmit: 'onSubmit';
    onTouched: 'onTouched';
    all: 'all';
};
export declare type Mode = keyof ValidationMode;
export declare type CriteriaMode = 'firstError' | 'all';
export declare type SubmitHandler<TFieldValues extends FieldValues> = (data: UnpackNestedValue<TFieldValues>, event?: React.BaseSyntheticEvent) => any | Promise<any>;
export declare type SubmitErrorHandler<TFieldValues extends FieldValues> = (errors: FieldErrors<TFieldValues>, event?: React.BaseSyntheticEvent) => any | Promise<any>;
export declare type SetValueConfig = Partial<{
    shouldValidate: boolean;
    shouldDirty: boolean;
    shouldTouch: boolean;
}>;
export declare type TriggerConfig = Partial<{
    shouldFocus: boolean;
}>;
export declare type ChangeHandler = (event: {
    target: any;
    type?: any;
}) => Promise<void | boolean>;
export declare type DelayCallback = (name: InternalFieldName, error: FieldError) => void;
export declare type UseFormProps<TFieldValues extends FieldValues = FieldValues, TContext extends object = object> = Partial<{
    mode: Mode;
    reValidateMode: Exclude<Mode, 'onTouched' | 'all'>;
    defaultValues: DefaultValues<TFieldValues>;
    resolver: Resolver<TFieldValues, TContext>;
    context: TContext;
    shouldFocusError: boolean;
    shouldUnregister: boolean;
    shouldUseNativeValidation: boolean;
    criteriaMode: CriteriaMode;
    delayError: number;
}>;
export declare type FieldNamesMarkedBoolean<TFieldValues extends FieldValues> = DeepMap<DeepPartial<UnionLike<TFieldValues>>, true>;
export declare type FormStateProxy<TFieldValues extends FieldValues = FieldValues> = {
    isDirty: boolean;
    isValidating: boolean;
    dirtyFields: FieldNamesMarkedBoolean<TFieldValues>;
    touchedFields: FieldNamesMarkedBoolean<TFieldValues>;
    errors: boolean;
    isValid: boolean;
};
export declare type ReadFormState = {
    [K in keyof FormStateProxy]: boolean | 'all';
};
export declare type FormState<TFieldValues> = {
    isDirty: boolean;
    dirtyFields: FieldNamesMarkedBoolean<TFieldValues>;
    isSubmitted: boolean;
    isSubmitSuccessful: boolean;
    submitCount: number;
    touchedFields: FieldNamesMarkedBoolean<TFieldValues>;
    isSubmitting: boolean;
    isValidating: boolean;
    isValid: boolean;
    errors: FieldErrors<TFieldValues>;
};
export declare type KeepStateOptions = Partial<{
    keepErrors: boolean;
    keepDirty: boolean;
    keepValues: boolean;
    keepDefaultValues: boolean;
    keepIsSubmitted: boolean;
    keepTouched: boolean;
    keepIsValid: boolean;
    keepSubmitCount: boolean;
}>;
export declare type SetFieldValue<TFieldValues> = FieldValue<TFieldValues>;
export declare type RefCallBack = (instance: any) => void;
export declare type UseFormRegisterReturn = {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    ref: RefCallBack;
    name: InternalFieldName;
};
export declare type UseFormRegister<TFieldValues extends FieldValues> = <TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(name: TFieldName, options?: RegisterOptions<TFieldValues, TFieldName>) => UseFormRegisterReturn;
export declare type UseFormSetFocus<TFieldValues extends FieldValues> = <TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(name: TFieldName) => void;
export declare type UseFormGetValues<TFieldValues extends FieldValues> = {
    (): UnpackNestedValue<TFieldValues>;
    <TFieldName extends FieldPath<TFieldValues>>(name: TFieldName): FieldPathValue<TFieldValues, TFieldName>;
    <TFieldNames extends FieldPath<TFieldValues>[]>(names: readonly [...TFieldNames]): [...FieldPathValues<TFieldValues, TFieldNames>];
};
export declare type UseFormWatch<TFieldValues extends FieldValues> = {
    (): UnpackNestedValue<TFieldValues>;
    <TFieldName extends FieldPath<TFieldValues>>(name: TFieldName, defaultValue?: FieldPathValue<TFieldValues, TFieldName>): FieldPathValue<TFieldValues, TFieldName>;
    <TFieldNames extends readonly FieldPath<TFieldValues>[]>(names: readonly [...TFieldNames], defaultValue?: UnpackNestedValue<DeepPartial<TFieldValues>>): FieldPathValues<TFieldValues, TFieldNames>;
    (callback: WatchObserver<TFieldValues>, defaultValues?: UnpackNestedValue<DeepPartial<TFieldValues>>): Subscription;
};
export declare type UseFormTrigger<TFieldValues extends FieldValues> = (name?: FieldPath<TFieldValues> | FieldPath<TFieldValues>[] | readonly FieldPath<TFieldValues>[], options?: TriggerConfig) => Promise<boolean>;
export declare type UseFormClearErrors<TFieldValues extends FieldValues> = (name?: FieldPath<TFieldValues> | FieldPath<TFieldValues>[] | readonly FieldPath<TFieldValues>[]) => void;
export declare type UseFormSetValue<TFieldValues extends FieldValues> = <TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(name: TFieldName, value: UnpackNestedValue<FieldPathValue<TFieldValues, TFieldName>>, options?: SetValueConfig) => void;
export declare type UseFormSetError<TFieldValues extends FieldValues> = (name: FieldPath<TFieldValues>, error: ErrorOption, options?: {
    shouldFocus: boolean;
}) => void;
export declare type UseFormUnregister<TFieldValues extends FieldValues> = (name?: FieldPath<TFieldValues> | FieldPath<TFieldValues>[] | readonly FieldPath<TFieldValues>[], options?: Omit<KeepStateOptions, 'keepIsSubmitted' | 'keepSubmitCount' | 'keepValues' | 'keepDefaultValues' | 'keepErrors'> & {
    keepValue?: boolean;
    keepDefaultValue?: boolean;
    keepError?: boolean;
}) => void;
export declare type UseFormHandleSubmit<TFieldValues extends FieldValues> = <TSubmitFieldValues extends FieldValues = TFieldValues>(onValid: SubmitHandler<TSubmitFieldValues>, onInvalid?: SubmitErrorHandler<TFieldValues>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
export declare type UseFormResetField<TFieldValues extends FieldValues> = <TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(name: TFieldName, options?: Partial<{
    keepDirty: boolean;
    keepTouched: boolean;
    keepError: boolean;
    defaultValue: any;
}>) => void;
export declare type UseFormReset<TFieldValues extends FieldValues> = (values?: DefaultValues<TFieldValues>, keepStateOptions?: KeepStateOptions) => void;
export declare type WatchInternal<TFieldValues> = (fieldNames?: InternalFieldName | InternalFieldName[], defaultValue?: UnpackNestedValue<DeepPartial<TFieldValues>>, isMounted?: boolean, isGlobal?: boolean) => FieldPathValue<FieldValues, InternalFieldName> | FieldPathValues<FieldValues, InternalFieldName[]>;
export declare type GetIsDirty = <TName extends InternalFieldName, TData>(name?: TName, data?: TData) => boolean;
export declare type FormStateSubjectRef<TFieldValues> = Subject<Partial<FormState<TFieldValues>> & {
    name?: InternalFieldName;
}>;
export declare type Subjects<TFieldValues extends FieldValues = FieldValues> = {
    watch: Subject<{
        name?: InternalFieldName;
        type?: EventType;
        values?: FieldValues;
    }>;
    array: Subject<{
        name?: InternalFieldName;
        values?: FieldValues;
    }>;
    state: FormStateSubjectRef<TFieldValues>;
};
export declare type Names = {
    mount: InternalNameSet;
    unMount: InternalNameSet;
    array: InternalNameSet;
    watch: InternalNameSet;
    focus: InternalFieldName;
    watchAll: boolean;
};
export declare type BatchFieldArrayUpdate = <T extends Function, TFieldValues, TFieldArrayName extends FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>, TKeyName extends string = 'id'>(name: InternalFieldName, method: T, args: {
    argA?: unknown;
    argB?: unknown;
}, updatedFieldArrayValues?: Partial<FieldArrayWithId<TFieldValues, TFieldArrayName, TKeyName>>[], shouldSetValue?: boolean, shouldSetFields?: boolean) => void;
export declare type Control<TFieldValues extends FieldValues = FieldValues, TContext extends object = object> = {
    _subjects: Subjects<TFieldValues>;
    _removeUnmounted: Noop;
    _names: Names;
    _stateFlags: {
        mount: boolean;
        action: boolean;
        watch: boolean;
    };
    _options: Pick<UseFormProps<TFieldValues, TContext>, 'shouldUnregister'>;
    _getDirty: GetIsDirty;
    _formState: FormState<TFieldValues>;
    _updateValid: Noop;
    _fields: FieldRefs;
    _formValues: FieldValues;
    _proxyFormState: ReadFormState;
    _defaultValues: Partial<DefaultValues<TFieldValues>>;
    _getWatch: WatchInternal<TFieldValues>;
    _updateFieldArray: BatchFieldArrayUpdate;
    _getFieldArray: <TFieldArrayValues>(name: InternalFieldName) => Partial<TFieldArrayValues>[];
    _executeSchema: (names: InternalFieldName[]) => Promise<{
        errors: FieldErrors;
    }>;
    register: UseFormRegister<TFieldValues>;
    unregister: UseFormUnregister<TFieldValues>;
};
export declare type WatchObserver<TFieldValues> = (value: UnpackNestedValue<DeepPartial<TFieldValues>>, info: {
    name?: FieldPath<TFieldValues>;
    type?: EventType;
    value?: unknown;
}) => void;
export declare type UseFormReturn<TFieldValues extends FieldValues = FieldValues, TContext extends object = object> = {
    watch: UseFormWatch<TFieldValues>;
    getValues: UseFormGetValues<TFieldValues>;
    setError: UseFormSetError<TFieldValues>;
    clearErrors: UseFormClearErrors<TFieldValues>;
    setValue: UseFormSetValue<TFieldValues>;
    trigger: UseFormTrigger<TFieldValues>;
    formState: FormState<TFieldValues>;
    resetField: UseFormResetField<TFieldValues>;
    reset: UseFormReset<TFieldValues>;
    handleSubmit: UseFormHandleSubmit<TFieldValues>;
    unregister: UseFormUnregister<TFieldValues>;
    control: Control<TFieldValues, TContext>;
    register: UseFormRegister<TFieldValues>;
    setFocus: UseFormSetFocus<TFieldValues>;
};
export declare type UseFormStateProps<TFieldValues> = Partial<{
    control?: Control<TFieldValues>;
    disabled?: boolean;
    name?: FieldPath<TFieldValues> | FieldPath<TFieldValues>[] | readonly FieldPath<TFieldValues>[];
    exact?: boolean;
}>;
export declare type UseFormStateReturn<TFieldValues> = FormState<TFieldValues>;
export declare type UseWatchProps<TFieldValues extends FieldValues = FieldValues> = {
    defaultValue?: unknown;
    disabled?: boolean;
    name?: FieldPath<TFieldValues> | FieldPath<TFieldValues>[] | readonly FieldPath<TFieldValues>[];
    control?: Control<TFieldValues>;
    exact?: boolean;
};
export declare type FormProviderProps<TFieldValues extends FieldValues = FieldValues, TContext extends object = object> = {
    children: React.ReactNode;
} & UseFormReturn<TFieldValues, TContext>;
export {};
