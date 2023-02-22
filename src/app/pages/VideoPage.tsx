import { Button } from "@mui/material";
import { useState } from "react";
import useIsMobile from "utils/isMobile";
import useNav from "utils/useNav";

const VideoPage = () => {
  const mobile = useIsMobile();
  const navigate = useNav();
  const [show, setShow] = useState(false);

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
          onEnded={() => setShow(true)}
          onPlay={() => setShow(false)}
          controls
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
      <div className="h-[2vh]">
        <div
          className={
            show
              ? "transition-opacity duration-[2s] opacity-1"
              : " transition duration-[1s] opacity-0 "
          }
        >
          <Button
            variant="contained"
            disabled={!show}
            onClick={() => navigate("/attendance")}
          >
            Confirmar asistencia
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
