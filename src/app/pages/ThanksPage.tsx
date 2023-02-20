import { Button } from "@mui/material";
import useNav from "utils/useNav";

const ThanksPage = () => {
  const navigate = useNav();
  return (
    <div className="flex flex-col  md:h-[50vh] h-[90vh] justify-around items-center">
      <p className="md:px-72 text-center self-start">
        Sabemos que en nuestras vidas pocos son los momentos tan maravillosos
        como este, por este motivo significaría mucho para nosotros que nos
        acompañes en esta aventura que está pronta a comenzar.
      </p>
      <p className="font-title text-3xl font-bold">¡Bienvenida Luciana!</p>
      <div className="flex flex-col justify-center items-center">
        <img
          src="/assets/Flowers.png"
          alt="flower"
          className="md:w-[20vw] py-4"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/home")}
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default ThanksPage;
