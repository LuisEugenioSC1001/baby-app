import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import { FC } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { BaseFieldType } from "./TextField";

export type NumberFieldProps = NumericFormatProps<MUITextFieldProps>;

export const NumberFieldBase = ({
  onChange,
  ...props
}: BaseFieldType<NumberFieldProps>) => (
  <NumericFormat
    {...props}
    value={!isNaN(Number(props.value)) ? props.value : ""}
    isAllowed={(values: any) => {
      const { floatValue, formattedValue } = values;
      if (!!props?.min && !!props?.max) {
        return (
          formattedValue === "" ||
          (floatValue <= props?.max && floatValue >= props?.min)
        );
      } else return true;
    }}
    onValueChange={(value: any) => onChange(value.floatValue)}
    customInput={MUITextField}
  />
);

const NumberField: FC<NumberFieldProps & FieldHookConfig<any>> = (props) => {
  const [field, meta, helpers] = useField(props);
  return (
    <NumberFieldBase
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      {...field}
      {...props}
      value={field.value}
      onChange={helpers.setValue}
    />
  );
};

export default NumberField;
