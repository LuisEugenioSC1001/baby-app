import { IconButton } from "@mui/material";
import DialogPage from "components/DialogPage";
import { BsCloudDownloadFill } from "react-icons/bs";

const QRDialog = () => {
  return (
    <DialogPage title="Código QR">
      <div className="flex flex-col gap-2 p-2 items-center ">
        <div className="flex flex-col w-full items-center gap-4">
          <img
            src="/assets/QR1.jpeg"
            alt="QR code 1"
            className="w-[50vw] md:w-[15vw] rounded-xl"
          />
          <div className="flex flex-col justify-center">
            <IconButton download href="/assets/QR1.jpeg" color="primary">
              <BsCloudDownloadFill />
            </IconButton>
          </div>
        </div>
        {/* <div className="flex flex-row justify-around  w-full">
          <div className="flex flex-col justify-center">
            <IconButton download href="/assets/QR2.jpeg">
              <BsCloudDownloadFill />
            </IconButton>
          </div>
          <img
            src="/assets/QR2.jpeg"
            alt="QR code 2"
            className="w-[50vw] md:w-[15vw]  rounded-xl"
          />
        </div> */}
      </div>
    </DialogPage>
  );
};

export default QRDialog;
