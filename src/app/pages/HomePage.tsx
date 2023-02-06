import { Button } from "@mui/material";
import Flower from "components/Flower";
import useNav from "utils/useNav";

const HomePage = () => {
  const navigate = useNav();
  return (
    <>
      <div className="flex flex-row justify-center">
        <p className="font-title text-5xl font-bold text-center">
          Baby shower de Luciana
        </p>
      </div>
      <div className="pt-8 flex-col justify-center flex">
        <Flower />
        <div className="flex flex-row justify-center p-10 ">
          <Button variant="contained" onClick={() => navigate("/message")}>
            Bienvenidos
          </Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
