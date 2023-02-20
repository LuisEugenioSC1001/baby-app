import { useNavigationType } from "react-router-dom";
import useNav from "utils/useNav";

const useGoBack = () => {
  const type = useNavigationType();
  const navigate = useNav();
  return () => navigate((type == "POP" ? ".." : -1) as any);
};

export default useGoBack;
