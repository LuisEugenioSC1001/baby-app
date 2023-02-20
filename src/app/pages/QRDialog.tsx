import { DialogContent, DialogContentText, Link, Tooltip } from "@mui/material";
import DialogPage from "components/DialogPage";
import useIsMobile from "utils/isMobile";

const QRDialog = () => {
  const isMobile = useIsMobile();
  return (
    <DialogPage title="Códigos QR" maxWidth="lg" fullScreen={isMobile}>
      <DialogContent>
        <DialogContentText className="mr-10 text-center">
          Si deseas descargar un QR puedes darle click a la imagen
        </DialogContentText>
        <div className="flex md:flex-row flex-col md:gap-48 gap-5 md:p-16 justify-center items-center pt-2">
          <Tooltip title="Descargar">
            <Link download={true} href="/assets/QR Jessica.jpeg">
              <img
                src="/assets/QR Jessica.jpeg"
                alt="QR code 1"
                className="w-[60vw] md:w-[15vw] rounded-xl"
              />
            </Link>
          </Tooltip>

          <Tooltip title="Descargar">
            <Link download={true} href="/assets/QR Luis.jpeg">
              <img
                src="/assets/QR Luis.jpeg"
                alt="QR code 2"
                className="w-[60vw] md:w-[15vw]  rounded-xl"
              />
            </Link>
          </Tooltip>
        </div>
      </DialogContent>
    </DialogPage>
  );
};

export default QRDialog;
