
export type FormItemState<T> = {
    title: string;
    value: T;
    options?: { value: T extends Array<infer U> ? U : T; label: string; }[];
};

export type FormState<TFormData extends Record<string, any>> = {
    [key in keyof TFormData]: FormItemState<TFormData[key]>;
};
