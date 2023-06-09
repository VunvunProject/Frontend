import Location from "../../assets/Navbar/location.svg";
import phone from "../../assets/Navbar/phone.svg";
import person from "../../assets/Navbar/person.svg";
import Logo from "../../assets/Navbar/Logo.png";
import { Link, useLocation } from "react-router-dom";
import Hamburger from "../other/Hamburger";
import { useState, useEffect, useRef } from "react";
import HamMenu from "../other/HamMenu";
// modal
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function Navbar() {
  const [url, setUrl] = useState("");
  const [ham, setHam] = useState(false);
  const location = useLocation();
  const nav_routes_array = [
    ["Ana səhifə", "/"],
    ["Avtomobillər", "avtomobiller"],
    ["Lorem1", "lorem1"],
    ["Lorem2", "lorem2"],
    ["Lorem3", "lorem3"],
    ["Lorem4", "lorem4"],
  ];
  useEffect(() => {
    setUrl(location.pathname);
  });

 // modal

 const [isOpen, setIsOpen] = useState(false);
 const modalRef = useRef();
 const [logMode, setLogMode] = useState("login");

 const openModal = () => {
   setIsOpen(true);
 };

 const closeModal = () => {
   setIsOpen(false);
 };

  const nav_routes_ui = nav_routes_array.map((ui, id) => {
    let path;
  
    if (ui[1] !== "/") {
      path = "/" + ui[1];
    }     
    else {
      path = "/";
    }

    return (
      <Link
        style={
          url === path 
            ? { fontWeight: "700", borderBottom: "2px solid white" }
            : {}
        }
        className="text-[14px] py-[20px] text-white hover:border-b-2 hover:border-b-white "
        key={id}
        to={ui[1]}
      >
        {ui[0]}
      </Link>
    );
  });

  return (
    <>
      {/* modal */}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ref={modalRef}
        style={{
          content: {
            // Custom styles for modal content
            padding: "0px",
            backgroundColor: "#fff",
            inset: "0",
          },
          overlay: {
            // Custom styles for modal overlay
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(4px)",
          },
        }}
        className="w-[600px] h-auto max-w-[90%] mx-auto mt-[12%] sm:mt-[20%] md:mt-14 rounded-md"
      >
        {logMode === "login" ? (
          <LogIn closeModal={closeModal} setLogMode={setLogMode} />
        ) : (
          <SignUp closeModal={closeModal} setLogMode={setLogMode} />
        )}
      </ReactModal>

      <header className="flex flex-col z-50">
        <div className="flex justify-between items-center py-2 px-24 768:px-4 450:!px-2">
          <div className="flex gap-x-10 450:gap-x-2">
            <div className="flex gap-x-4 items-center">
              <div>
                <img src={Location} />
              </div>
              <h5 className="text-[14px]">Bakı, Azərbaycan</h5>
            </div>

            <div className="flex gap-x-4 items-center">
              <div>
                <img src={phone} />
              </div>
              <h5 className="text-[14px]">*6666</h5>
            </div>
          </div>

          <Link className="flex items-center gap-x-4" onClick={openModal}>
            <div>
              <img src={person} />
            </div>
            <h5 className="text-[14px]">Giriş</h5>
          </Link>
        </div>

        <div className="flex bg-dark-blue justify-between items-center px-24 py-2 1024:px-4 450:!px-2">
          <Link to="/">
            <div>
              <img src={Logo} />
            </div>
          </Link>

          <div className="flex gap-x-10 768:hidden">{nav_routes_ui}</div>
          <div>
            <Link
              to={"/elanver"}
              className="text-[14px] bg-btn-orange text-white rounded-[4px] py-3 px-5 768:hidden"
            >
              Sahibkar ol
            </Link>
            <Hamburger ham={ham} setHam={setHam} />
          </div>
        </div>
        <HamMenu ham={ham} />
      </header>
    </>
  );
}

export default Navbar;
