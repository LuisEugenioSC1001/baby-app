import { Button } from "@mui/material";
import useNav from "utils/useNav";

const MessagePage = () => {
  const navigate = useNav();
  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex md:flex-row  flex-col justify-center gap-2">
        <div className="md:text-xl flex flex-col justify-center  gap-2">
          <div className="flex flex-row gap-[1ch] ">
            <p>Hola amigos, soy</p>
            <p className="font-title text-3xl font-bold">Luciana</p>
          </div>
          <p className="text-justify">
            Mi papito y mi mamita han querido invitarte a un pequeño picnic en
            homenaje a que pronto llegaré a alegrar más sus días.
          </p>
          <p className="paragraph2 text-justify">
            A mis papitos y a mi nos gustaría que nos acompañáras en este bello
            momento.
          </p>
        </div>
        <img src="/assets/Flowers1.png" alt="flower" className="md:w-[25vw] " />
      </div>
      <div className=" flex justify-center">
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("/video")}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
export default MessagePage;
