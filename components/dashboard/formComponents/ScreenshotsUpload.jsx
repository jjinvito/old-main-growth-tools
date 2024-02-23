import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { FiAlertTriangle } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Modal from "@/components/Modal";

const ScreenshotsUpload = () => {
  const [uploadUrls, setUploadUrls] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const onFileChange = async (event) => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const files = Array.from(event.target.files);

    if (uploadUrls.length + files.length > 10) {
      setErrorMessage("Cannot upload more than 10 screenshots in total.");
      setIsLoading(false);
      return;
    }

    if (files.length === 0) {
      setIsLoading(false);
      return;
    }

    if (
      files.some(
        (file) =>
          file.type !== "image/jpeg" &&
          file.type !== "image/png" &&
          file.type !== "image/jpg"
      )
    ) {
      setErrorMessage("Only JPG, JPEG, and PNG formats are allowed.");
      setIsLoading(false);
      return;
    }

    if (files.some((file) => file.size > 10 * 1024 * 1024)) {
      setErrorMessage("File size for each file should not exceed 10MB");
      setIsLoading(false);
      return;
    }

    // Initialize an array to hold the new URLs
    const newUrls = [];

    for (const file of files) {
      const filePath = `screenshots/${uuidv4()}-${file.name}`;

      const { data, error } = await supabase.storage
        .from("growth-tools-media")
        .upload(filePath, file);

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      const res = supabase.storage
        .from("growth-tools-media")
        .getPublicUrl(data.path);

      if (res.data) {
        // Push new URL to the temporary array
        newUrls.push(res.data.publicUrl);
      }
    }

    if (newUrls.length > 0) {
      // Concatenate the new URLs with the existing ones and update the state
      setUploadUrls([...uploadUrls, ...newUrls]);
      setSuccessMessage("Screenshot(s) uploaded successfully");
    }
    setIsLoading(false);
  };

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col gap-3 ">
        <div className="flex items-center space-x-2">
          <label className="font-semibold">Screenshot</label>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            PNG or JPEG up to 10MB
          </span>
        </div>

        {uploadUrls.length !== 10 && (
          <>
            <input
              type="file"
              id="screenshot"
              hidden
              onChange={onFileChange}
              accept="image/png, image/jpeg, image/jpg"
              disabled={isLoading}
              multiple
            />

            <label
              htmlFor="screenshot"
              className={cn(
                "p-2 rounded-full bg-black text-white flex justify-center items-center w-52 gap-2 cursor-pointer",
                isLoading && "cursor-not-allowed w-36 opacity-50"
              )}
            >
              {isLoading ? (
                <>
                  Uploading
                  <ClipLoader size={15} color="white" />
                </>
              ) : (
                <>Choose File</>
              )}
            </label>
            <p className="text-xs text-gray-500 mt-3">
              PNG, JPG, JPEG formats. 10MB max per file.
            </p>
          </>
        )}

        <div
          className="flex gap-3 overflow-x-auto w-full"
          onClick={toggleModal}
        >
          {uploadUrls.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt="Uploaded Screenshot"
              height={100}
              width={100}
              className="cursor-pointer object-contain"
              placeholder="blur"
              blurDataURL="/imagePlaceholder.gif"
            />
          ))}
        </div>

        {/* Use the existing Modal component */}
        <Modal showModal={showModal} setShowModal={setShowModal}>
          {/* Modal Content */}
          {uploadUrls.map((url, index) => (
            <div
              key={index}
              className="p-10 h-full w-full flex items-center justify-center"
            >
              <Image
                src={url}
                alt="Screenshot Image"
                height={500}
                width={500}
                objectFit="contain"
                placeholder="blur"
                blurDataURL="/imagePlaceholder.gif"
              />
            </div>
          ))}
        </Modal>
      </div>
      {errorMessage && (
        <div className="flex gap-2 items-center mt-4">
          <FiAlertTriangle className="text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
      )}

      {successMessage && (
        <div className="flex gap-2 items-center mt-4">
          <FaRegCircleCheck className="text-green-600" />
          <p className="text-sm text-green-600">{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default ScreenshotsUpload;
