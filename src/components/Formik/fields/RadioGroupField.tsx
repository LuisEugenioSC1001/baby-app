import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Typography,
} from "@mui/material";
import { FieldHookConfig, useField } from "formik";
import { FC } from "react";
import { BaseFieldType } from "./TextField";

type RadioProps = { value: string | boolean | number; label: string };
export type RadioGroupFieldBaseProps = RadioGroupProps & {
  title: string;
  items: RadioProps[];
  vertical?: boolean;
};

export const RadioGroupFieldBase = (
  props: BaseFieldType<RadioGroupFieldBaseProps>
) => {
  const control = (
    <FormControl>
      <Typography>{props.title}</Typography>
      <RadioGroup
        {...props}
        value={props.value || ""}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <div className={`flex ${props.vertical ? "flex-col" : ""}`}>
          {props?.items?.map((radio, index) => (
            <FormControlLabel
              key={index}
              value={radio.value}
              control={<Radio />}
              label={radio.label}
            />
          ))}
        </div>
      </RadioGroup>
    </FormControl>
  );
  return control;
};

const RadioGroupField: FC<RadioGroupFieldBaseProps & FieldHookConfig<any>> = (
  props
) => {
  const [field, , helper] = useField(props);
  return (
    <RadioGroupFieldBase
      {...field}
      {...props}
      value={field.value}
      onChange={helper.setValue as any}
    />
  );
};

export default RadioGroupField;
