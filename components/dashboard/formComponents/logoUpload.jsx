import React from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
const LogoUpload = () => {
  const onFileChange = (event) => {
    // Handle file change logic here
  };

  return (
    <div>
      <div>
        <label htmlFor="logo" className="block text-sm font-semibold mb-5">
          Logo
        </label>
        <input type="file" id="logo" hidden onChange={onFileChange} />
        <label
          htmlFor="logo"
          className="p-2 rounded-full border-2 border-black flex justify-center items-center w-24 gap-2 cursor-pointer"
        >
          Logo <IoCloudUploadOutline />
        </label>
      </div>
      <p className="text-xs text-gray-500 mt-1">png, jpg formats. 5mb max</p>
    </div>
  );
};

export default LogoUpload;
