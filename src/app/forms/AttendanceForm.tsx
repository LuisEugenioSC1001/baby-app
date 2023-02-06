import { MenuItem } from "@mui/material";
import Field, { FieldBase } from "components/Formik/fields/Field";
import { useFormikContext } from "formik";

const AttendanceForm = () => {
  const { values, setFieldValue } = useFormikContext<any>();
  return (
    <>
      <Field type="text" name="name" label="Nombres" required />
      <Field type="text" name="surname" label="Apellidos" required />
      <Field type="number" name="phone" label="Teléfono" required />
      <FieldBase
        type="string"
        value={`${values?.companion}`}
        onChange={(e) => setFieldValue("companion", e)}
        name="companion"
        label="Número de acompañantes"
        required
        select
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
      </FieldBase>
    </>
  );
};

export default AttendanceForm;
