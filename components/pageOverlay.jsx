export const PageOverlay = ({ visibility, setToggleNav }) => {
  const handleClose = () => {
    setToggleNav(false);
  };
  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-10 ${visibility ? "block" : "hidden"}`}
    >
      <div className="fixed inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0 backdrop-blur-sm"></div>
    </div>
  );
};
