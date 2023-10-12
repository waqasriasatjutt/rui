import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Sidebar2 from "../../organisms/Sidebar";
const Layout = ({ children }) => {
  const [show_navlabel, setShowNavbar] = useState(true);
  const toggleNavbar = () => {
    setShowNavbar(!show_navlabel);
  };
  const { user } = useSelector((state) => state.auth);
  return (
    <>
    <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
      <style jsx>{`
        @media (min-width: 768px) {
          .middle-cont {
            margin-left: 220px;
            width: calc(100% - 220px);
            height: calc(100vh - 28px);
          }
        }
        @media (max-width: 768px) {
          .middle-cont {
            width: 100%;
          }
        }
      `}</style>
      {user ? (
        <>
          
          <div className="flex flex-nowrap relative overflow-y-hidden overflow-hidden max-w-[100vw] h-[100vh]">
            <div className="px-0 hidden md:block">
              <Sidebar2
                toggleNavbar={toggleNavbar}
                show_navlabel={show_navlabel}
              />
            </div>
            <div className="mx-2 ml-[225px] w-[calc(100vw-220px)] mt-10">{children}</div>
          </div>
        </>
      ) : (
        children
      )}
    </>
  );
};

export default Layout;
