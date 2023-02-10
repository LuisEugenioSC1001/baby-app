import { MenuItem } from "@mui/material";
import Field from "components/Formik/fields/Field";

const GiftForm = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Field
        name="name"
        type="string"
        label="Nombre del regalo"
        required
        fullWidth
      />
      <Field
        name="quantity"
        type="number"
        label="Cantidad"
        required
        fullWidth
      />
      <Field
        name="unit"
        type="string"
        label="Tipo de unidad"
        fullWidth
        className="col-span-2"
        select
      >
        <MenuItem value={"Paquetes"}>Paquete</MenuItem>
        <MenuItem value={"Otro"}>Otro</MenuItem>
      </Field>
    </div>
  );
};

export default GiftForm;
