import Router from "config/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
      <ToastContainer />
    </>
  );
}

export default App;
