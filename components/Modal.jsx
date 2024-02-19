import { useState, useEffect } from "react";

export default function Modal(props) {
  const [animate, setAnimate] = useState(false);
  const [shouldRender, setShouldRender] = useState(props.showModal);


  // Improved animation handling for smoother transitions
  const handleClose = () => {
    props.setShowModal(false);
  };

  useEffect(() => {
    if (props.showModal) {
      setShouldRender(true);
    } else {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
        setShouldRender(false);
      }, 200); // Ensure this matches the animation duration
    }
  }, [props.showModal]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      role="modal"
      className={`fixed inset-0 z-20 ${
        animate ? "animate-fadeOut" : "animate-fadeIn"
      }`}
      style={{ display: props.showModal ? "block" : "none" }}
    >
      {/* <!-- Modal background --> */}
      <div
        className="modal-bg absolute w-full h-full bg-black opacity-60"
        onClick={handleClose}
      ></div>

      {/* <!-- Modal body --> */}
      <div
        className={`bg-white w-[90%] sm:w-[90%] md:w-[90%] lg:w-[50%] xl:w-[40%] 2xl:w-[40%] h-fit max-h-[90%] sm:h-fit md:h-fit rounded-xl shadow-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${props.className}`}
      >
        {props.children}
      </div>
    </div>
  );
}
