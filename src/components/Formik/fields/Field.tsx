import { TextFieldProps } from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import { CheckboxFieldBase, CheckboxFieldBaseProps } from "./CheckBoxField";

import { NumberFieldBase } from "./NumberField";
import {
  RadioGroupFieldBase,
  RadioGroupFieldBaseProps,
} from "./RadioGroupField";

import { SwitchFieldBase, SwitchFieldBaseProps } from "./SwitchField";
import { BaseFieldType, TextFieldBase } from "./TextField";

interface Types {
  integer: TextFieldProps;
  number: TextFieldProps;
  string: TextFieldProps;
  text: TextFieldProps;
  checkbox: CheckboxFieldBaseProps;
  switch: SwitchFieldBaseProps;
  "radio-group": RadioGroupFieldBaseProps;
}

type FieldBaseProps<T extends keyof Types> = { type: T } & Types[T];

export const FieldBase = function <T extends keyof Types>({
  type,
  ...props
}: BaseFieldType<FieldBaseProps<T>>) {
  switch (type) {
    case "integer":
    case "number":
      return <NumberFieldBase {...(props as any)} />;
    case "string":
    case "text":
      return <TextFieldBase {...(props as any)} />;
    case "checkbox":
      return <CheckboxFieldBase {...(props as any)} />;
    case "switch":
    case "boolean":
      return <SwitchFieldBase {...(props as any)} />;
    case "radio-group":
      return <RadioGroupFieldBase {...(props as any)} />;
    default:
      return null;
  }
};

function Field<T extends keyof Types>(
  props: FieldHookConfig<any> & FieldBaseProps<T>
) {
  const [field, , helpers] = useField(props);

  return (
    <FieldBase
      {...(props as any)}
      {...field}
      value={field.value}
      onChange={helpers.setValue}
      type={(props as any)?.type as any}
    />
  );
}

<Field type="number" name="" />;

export default Field;
