import { MenuItem } from "@mui/material";
import Field from "components/Formik/fields/Field";

const GiftForm = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-2 ">
      <Field name="name" type="string" label="Nombre del regalo" required />
      <Field name="quantity" type="number" label="Cantidad" required />
      <Field
        name="unit"
        type="string"
        label="Tipo de unidad"
        className="md:col-span-2"
        select
      >
        <MenuItem value={"Paquetes"}>Paquete</MenuItem>
        <MenuItem value={"Tarros"}>Tarro</MenuItem>
        <MenuItem value={"Cajas"}>Caja</MenuItem>
        <MenuItem value={"Otro"}>Otro</MenuItem>
      </Field>
    </div>
  );
};

export default GiftForm;
