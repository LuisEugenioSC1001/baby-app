import { FormControlLabel, Switch, SwitchProps } from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import { isBoolean } from "lodash";
import { FC } from "react";
import { BaseFieldType } from "./TextField";

export type SwitchFieldBaseProps = SwitchProps & { label?: string };

export const SwitchFieldBase = (props: BaseFieldType<SwitchFieldBaseProps>) => {
  const control = (
    <Switch
      {...props}
      checked={isBoolean(props.value) ? props.value : false}
      onChange={(e) => props.onChange(e.target.checked)}
    />
  );

  if (!props.label) return control;

  return <FormControlLabel control={control} label={props.label} />;
};

const SwitchField: FC<SwitchFieldBaseProps & FieldHookConfig<any>> = (
  props
) => {
  const [field, , helpers] = useField({ ...props, type: "checkbox" });

  return (
    <SwitchFieldBase
      {...field}
      onChange={helpers.setValue}
      value={field.checked}
      {...props}
    />
  );
};

export default SwitchField;
