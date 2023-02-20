import {
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
} from "react-router-dom";

const useNav = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  return (to: To, opts?: NavigateOptions) =>
    navigate(
      typeof to == "string"
        ? {
            pathname: to,
            search,
          }
        : typeof to == "number"
        ? to
        : { search, ...to },
      opts
    );
};

export default useNav;
