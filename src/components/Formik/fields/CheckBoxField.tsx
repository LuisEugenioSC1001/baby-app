import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import { isBoolean } from "lodash";
import { FC } from "react";
import { BaseFieldType } from "./TextField";

export type CheckboxFieldBaseProps = CheckboxProps & {
  label?: any;
};

export const CheckboxFieldBase = (
  props: BaseFieldType<CheckboxFieldBaseProps>
) => {
  const control = (
    <Checkbox
      {...props}
      checked={isBoolean(props.value) ? props.value : false}
      onChange={(e) => props.onChange(e.target.checked)}
    />
  );

  if (!props.label) return control;

  return <FormControlLabel control={control} label={props.label} />;
};

const CheckboxField: FC<CheckboxFieldBaseProps & FieldHookConfig<any>> = (
  props
) => {
  const [field, , helpers] = useField({ ...props, type: "checkbox" });

  return (
    <CheckboxFieldBase
      {...field}
      onChange={helpers.setValue}
      value={field.checked}
      {...props}
    />
  );
};

export default CheckboxField;
