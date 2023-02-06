import { Button } from "@mui/material";
import useGoBack from "utils/useGoBack";
import useNav from "utils/useNav";
import "./page404.css";
const Page404 = () => {
  const navigate = useNav();
  const back = useGoBack();
  return (
    <div className="grid grid-flow-row md:grid-flow-col gap-2 my-5 justify-center items-center  ">
      <svg
        viewBox="0 0 837 1045"
        version="1.1"
        className="w-full h-full "
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <path
            d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
            id="Polygon-1"
            stroke="#007FB2"
            strokeWidth="6"
          />
          <path
            d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
            id="Polygon-2"
            stroke="#EF4A5B"
            strokeWidth="6"
          />
          <path
            d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
            id="Polygon-3"
            stroke="#795D9C"
            strokeWidth="6"
          />
          <path
            d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
            id="Polygon-4"
            stroke="#F2773F"
            strokeWidth="6"
          />
          <path
            d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
            id="Polygon-5"
            stroke="#36B455"
            strokeWidth="6"
          />
        </g>
      </svg>
      <div className="flex flex-col items-center ">
        <p className="font-bold font-title text-4xl">404</p>
        <p className="font-bold font-title text-2xl">Page not found</p>
        <div className="grid grid-cols-2 gap-2 py-2">
          <div>
            <Button onClick={() => back()} variant="contained" color="primary">
              Go Back
            </Button>
          </div>
          <div>
            <Button
              onClick={() => navigate("/home")}
              variant="contained"
              color="primary"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
