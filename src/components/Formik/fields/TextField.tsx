import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import { toNumber } from "lodash";
import { FC } from "react";

export type BaseFieldType<T> = T & {
  onChange: (value: any) => void;
  value: any;
};

export const TextFieldBase = (props: BaseFieldType<MUITextFieldProps>) => (
  <MUITextField
    {...props}
    value={props.value || ""}
    onChange={(e: any) =>
      props.onChange(
        e.target.type == "number"
          ? toNumber(e.target.value)
          : e.target.type == "file"
          ? e.target.files
          : e.target.value
      )
    }
  />
);

const TextField: FC<MUITextFieldProps & FieldHookConfig<any>> = (props) => {
  const [field, meta, helpers] = useField(props);
  return (
    <TextFieldBase
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      {...field}
      {...props}
      value={field.value}
      onChange={helpers.setValue}
    />
  );
};

export default TextField;
