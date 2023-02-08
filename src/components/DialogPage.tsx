import { Dialog, DialogProps, DialogTitle, IconButton } from "@mui/material";
import { FC } from "react";
import { IoMdClose } from "react-icons/io";
import useGoBack from "utils/useGoBack";

type DialogPageProps = FC<
  { title: string; onClose?: () => void } & Omit<DialogProps, "open">
>;

const DialogPage: DialogPageProps = ({
  title,
  children,
  onClose: close,
  ...props
}) => {
  const onClose = useGoBack();

  return (
    <Dialog {...props} open={true} fullWidth onClose={close || onClose}>
      <DialogTitle className="w-full flex items-center justify-between">
        {title}
        <IconButton onClick={close || onClose}>
          <IoMdClose />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  );
};

export default DialogPage;
