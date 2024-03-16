"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { v4 as uuidv4 } from "uuid";

import { IoCloudUploadOutline } from "react-icons/io5";
import { FiAlertTriangle } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Modal from "@/components/Modal";
import { HiOutlineTrash } from "react-icons/hi2";

const LogoUpload = ({ setValue, errors, watch }) => {
  const [uploadUrl, setUploadUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localFilePath, setLocalFilePath] = useState("");

  const toggleModal = () => setShowModal(!showModal);

  const deleteLogo = async () => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    const filePath = localFilePath;

    const { error } = await supabase.storage
      .from("growth-tools-media")
      .remove([filePath]);

    if (error) {
      console.error("Error deleting logo:", error.message);
      setErrorMessage("Error deleting logo");
    } else {
      setUploadUrl("");
      setValue("logoUrl", "");
    }
    setSuccessMessage("Logo Deleted Success");
    setIsLoading(false);
  };

  const onFileChange = async (event) => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const file = event.target.files[0];
    if (!file) {
      setIsLoading(false);
      return;
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      setErrorMessage("Only JPG and PNG formats are allowed.");
      setIsLoading(false);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File size should not exceed 5MB");
      setIsLoading(false);
      return;
    }

    const filePath = `logos/${uuidv4()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from("growth-tools-media")
      .upload(filePath, file);

    if (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
      return;
    }

    console.log("data", data);

    const res = supabase.storage
      .from("growth-tools-media")
      .getPublicUrl(data.path);

    console.log("publicURL", res);

    if (res.data) {
      setLocalFilePath(data.path);
      setUploadUrl(res.data.publicUrl);
      setSuccessMessage("Logo uploaded successfully");
      setValue("logoUrl", res.data.publicUrl);
    }
    setIsLoading(false);
  };
  const watchedLogo = watch("logoUrl");

  useEffect(() => {
    // const subscription = watch((value, { name, type }) => {
    //   if (name === "logoUrl") {
    //     setUploadUrl(value.logoUrl);
    //   }

    if (watchedLogo) {
      setUploadUrl(watchedLogo);
    }
  }, [watchedLogo]);

  return (
    <div>
      <div>
        <label
          htmlFor="logo"
          className={cn(
            "block text-sm font-semibold mb-5 dark:text-white",
            errors.logoUrl && "text-red-500"
          )}
        >
          {errors.logoUrl
            ? errors.logoUrl.message == "Required"
              ? "Logo is required"
              : " "
            : "Logo"}
        </label>

        {!uploadUrl && (
          <>
            <input
              type="file"
              id="logo"
              hidden
              onChange={onFileChange}
              accept="image/png, image/jpeg"
              disabled={isLoading || uploadUrl}
            />
            <label
              htmlFor="logo"
              className={cn(
                "p-2 rounded-full border-2 border-black flex justify-center items-center w-36 gap-2 cursor-pointer font-normal dark:border-white dark:text-white",
                isLoading && "cursor-not-allowed w-36 opacity-50"
              )}
            >
              {isLoading ? (
                <>
                  Uploading
                  <ClipLoader size={15} />
                </>
              ) : (
                <>
                  Upload
                  <IoCloudUploadOutline />
                </>
              )}
            </label>
            <p className="text-xs text-gray-500 mt-3">
              PNG, JPG formats. 5MB max.
            </p>
          </>
        )}

        {uploadUrl && (
          <div className="relative group w-32 flex gap-2" onClick={toggleModal}>
            <Image
              src={uploadUrl}
              alt="Uploaded Logo"
              height={100}
              width={100}
              className="cursor-pointer object-contain"
              placeholder="blur"
              blurDataURL="/imagePlaceholder.gif"
            />
            {isLoading ? (
              <>
                <ClipLoader size={15} />
              </>
            ) : (
              <HiOutlineTrash
                className="text-red-500 dark:text-white cursor-pointer opacity-0 group-hover:opacity-100"
                onClick={(event) => {
                  event.stopPropagation(); // Prevent the modal from opening
                  deleteLogo();
                }}
              />
            )}
          </div>
        )}

        {/* Use the existing Modal component */}
        <Modal showModal={showModal} setShowModal={setShowModal}>
          {/* Modal Content */}
          <div className="p-10 h-full w-full flex items-center justify-center">
            <Image
              src={uploadUrl}
              alt="Logo Image"
              height={500}
              width={500}
              objectFit="contain"
              placeholder="blur"
              blurDataURL="/imagePlaceholder.gif"
            />
          </div>
        </Modal>
      </div>
      {errorMessage && (
        <div className="flex gap-2 items-center mt-4">
          <FiAlertTriangle className=" text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="flex gap-2 items-center mt-4">
          <FaRegCircleCheck className=" text-green-600" />
          <p className="text-sm text-green-600">{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default LogoUpload;
