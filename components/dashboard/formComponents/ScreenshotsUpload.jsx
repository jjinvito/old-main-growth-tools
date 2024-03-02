import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { FiAlertTriangle } from "react-icons/fi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ClipLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Modal from "@/components/Modal";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const ScreenshotsUpload = ({ setValue, errors }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [screenshots, setScreenshots] = useState([]);
  const [selectedScreenshotIndex, setSelectedScreenshotIndex] = useState(null);
  const [primaryScreenshot, setPrimaryScreenshot] = useState("");

  const toggleModal = () => setShowModal(!showModal);

  let errorsMessage = "";
  if (errors.screenshots) {
    errorsMessage =
      errors.screenshots.message === "Required"
        ? "Screenshot is required"
        : errors.screenshots.message;
  } else if (errors.primaryScreenshot) {
    errorsMessage =
      errors.primaryScreenshot.message === "Required"
        ? "Primary Screenshot is not selected"
        : errors.primaryScreenshot.message;
  } else {
    errorsMessage = "Screenshots";
  }

  const deleteScreenshot = async (screenshotToDelete, index) => {
    // Set the loading state to true for the specific screenshot
    setScreenshots((screenshots) =>
      screenshots.map((screenshot, i) =>
        i === index ? { ...screenshot, isLoading: true } : screenshot
      )
    );

    const { error } = await supabase.storage
      .from("bucket-name")
      .remove([screenshotToDelete.filePath]);

    if (error) {
      console.error("Error deleting screenshot:", error.message);
      setScreenshots((screenshots) =>
        screenshots.map((screenshot, i) =>
          i === index ? { ...screenshot, isLoading: false } : screenshot
        )
      );
      setErrorMessage("Error deleting screenshot");
    } else {
      // Remove the screenshot from the state
      setScreenshots((screenshots) =>
        screenshots.filter((screenshot, i) => i !== index)
      );
      setValue(
        "screenshots",
        screenshots.filter((screenshot, i) => i !== index).map((s) => s.url)
      );
      setSuccessMessage("Screenshot deleted successfully");
    }
  };

  const onFileChange = async (event) => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const files = Array.from(event.target.files);

    // Use the screenshots state that holds objects with url and filePath
    if (screenshots.length + files.length > 10) {
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

    const newScreenshots = [];

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
        // Push object containing both URL and filePath
        newScreenshots.push({ url: res.data.publicUrl, filePath });
      }
    }

    if (newScreenshots.length > 0) {
      // Merge the new screenshots with the existing ones
      const updatedScreenshots = [...screenshots, ...newScreenshots];
      setScreenshots(updatedScreenshots); // Update the screenshots state
      setSuccessMessage("Screenshot(s) uploaded successfully");
      setValue(
        "screenshots",
        updatedScreenshots.map((s) => s.url)
      ); // Update the form with the URLs
    }
    setIsLoading(false);
  };

  const handleSetAsPrimary = (url) => {
    setValue("primaryScreenshot", url);
    setPrimaryScreenshot(url);
  };

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col gap-3 ">
        <div
          className={cn(
            "flex items-center space-x-2",
            errors.screenshots || (errors.primaryScreenshot && "text-red-500")
          )}
        >
          <label
            className={cn(
              "font-semibold dark:text-white",
              errors.screenshots || (errors.primaryScreenshot && "text-red-500")
            )}
          >
            {errorsMessage}
          </label>
        </div>

        <div
          className="flex gap-3 overflow-x-auto w-full"
          onClick={toggleModal}
        >
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="relative group flex min-w-fit hover:backdrop-brightness-50 p-5 rounded-2xl items-center justify-center dark:border-white dark:text-white"
            >
              <Image
                src={screenshot.url}
                alt="Uploaded Screenshot"
                height={100}
                width={100}
                className="cursor-pointer object-contain aspect-square"
                placeholder="blur"
                blurDataURL="/imagePlaceholder.gif"
                onClick={() => {
                  setSelectedScreenshotIndex(index);
                  toggleModal();
                }}
              />
              {screenshot.isLoading ? (
                <ClipLoader
                  size={15}
                  color="white"
                  className="absolute top-3 right-2 cursor-not-allowed "
                />
              ) : (
                <>
                  <HiOutlineTrash
                    className="absolute top-3 right-2 text-white cursor-pointer opacity-0 group-hover:opacity-100"
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteScreenshot(screenshot, index);
                    }}
                  />
                  <p
                    className=" absolute bottom-2 left-3 hover:backdrop-brightness-50 text-white text-xs cursor-pointer opacity-0 group-hover:opacity-100"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleSetAsPrimary(screenshot.url);
                    }}
                  >
                    Set as Cover
                  </p>
                  {primaryScreenshot === screenshot.url && (
                    <FaStar className="absolute top-2 left-2 text-specialOrange" />
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {screenshots.length !== 10 && (
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
                "p-2 rounded-full border-2 border-black flex justify-center items-center w-36 gap-2 cursor-pointer font-normal dark:border-white dark:text-white",
                isLoading && "cursor-not-allowed w-36 opacity-50 "
              )}
            >
              {isLoading ? (
                <>
                  Uploading
                  <ClipLoader size={15} color="white" />
                </>
              ) : (
                <>
                  Upload
                  <IoCloudUploadOutline />
                </>
              )}
            </label>
            <p className="text-xs text-gray-500 mt-3">
              PNG, JPG, JPEG formats. 10MB max per file.
            </p>
          </>
        )}

        {/* Use the existing Modal component */}
        <Modal
          showModal={showModal}
          setShowModal={(show) => {
            setShowModal(show);
            if (!show) setSelectedScreenshotIndex(null); // Reset selected index when modal is closed
          }}
        >
          {selectedScreenshotIndex !== null && (
            <div className="p-10 h-full w-full flex items-center justify-center">
              <Image
                src={screenshots[selectedScreenshotIndex].url}
                alt="Screenshot Image"
                height={500}
                width={500}
                objectFit="contain"
                placeholder="blur"
                blurDataURL="/imagePlaceholder.gif"
              />
            </div>
          )}
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
