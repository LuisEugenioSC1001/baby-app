import { Button } from "@mui/material";
import useIsMobile from "utils/isMobile";
import useNav from "utils/useNav";

const VideoPage = () => {
  const mobile = useIsMobile();
  const navigate = useNav();
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="md:grid md:grid-cols-3 flex justify-center">
        {!mobile && (
          <img
            src="/assets/Flowers2.png"
            alt="flower"
            className="md:w-[25vw] self-end"
          />
        )}
        <video
          className="h-[60vh] rounded-xl overflow-hidden md:place-self-center"
          src="/assets/Video.mp4"
          autoPlay={true}
          style={{ WebkitTransform: "translateZ(0)" }}
        />
        {!mobile && (
          <img
            src="/assets/Flowers2.png"
            alt="flower"
            className="md:w-[25vw] mirror self-end"
          />
        )}
      </div>

      <Button variant="contained" onClick={() => navigate("/attendance")}>
        Confirmar asistencia
      </Button>
    </div>
  );
};

export default VideoPage;
