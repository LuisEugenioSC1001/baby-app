import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { useFormikContext } from "formik";
import { FC } from "react";
import { MdSave } from "react-icons/md";

const SubmitButton: FC<LoadingButtonProps> = (props) => {
  const { isSubmitting, status } = useFormikContext();

  return (
    <LoadingButton
      variant="contained"
      type="submit"
      disabled={!!status?.error}
      loading={isSubmitting}
      endIcon={<MdSave />}
      {...props}
    >
      {props.children || "Guardar"}
    </LoadingButton>
  );
};

export default SubmitButton;
