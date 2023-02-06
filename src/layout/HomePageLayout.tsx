import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const HomePageLayout = () => {
  const { pathname } = useLocation();
  return (
    <div className="w-screen h-screen bg-watercolor object-fill">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white md:w-[70%] md:h-[70%] w-[90%] h-[70%]  rounded-xl flex flex-col justify-center px-4">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePageLayout;
