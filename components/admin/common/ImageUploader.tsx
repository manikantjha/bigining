import { storage } from "@/services/firebaseServices";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { ToastOptions, toast } from "react-toastify";
import ProgressBar from "./ProgressBar";
import Toast from "./Toast";

interface IImageUploader {
  id: string;
  label: string;
  imageURL?: string;
  onChange: any;
  index?: number;
  isVideo?: boolean;
}

export default function ImageUploader(props: IImageUploader) {
  const [image, setImage] = useState<File>();
  const [downloadURL, setDownloadURL] = useState(props.imageURL || "");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const notify = (text: string, options: ToastOptions) => toast(text, options);

  function handleFileSelection(files: FileList | null) {
    if (!files || (files && !files.length)) return;
    if (files[0].size < 10000000) {
      setImage(files[0]);
      handleFileUpload(files[0]);
    } else {
      console.log("File size too large!");
    }
  }

  function handleFileUpload(image: File) {
    if (image) {
      const name = image.name + Date.now();
      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      setIsUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log("Error: ", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            notify("Image uploaded", {
              type: "success",
            });
            setDownloadURL(url);
            props.onChange(url);
          });
        }
      );
      setIsUploading(false);
    } else {
      console.log("File not found!");
    }
  }

  function deleteFile() {
    const imageRef = ref(storage, downloadURL);

    deleteObject(imageRef)
      .then(() => {
        console.log("Deleted successfuly!");
        notify("Image removed", { type: "success" });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  function handleFileRemove() {
    deleteFile();
    setImage(undefined);
    setDownloadURL("");
    props.onChange("");
  }

  return (
    <div>
      <>
        <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {props.label}
        </p>
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden">
            {downloadURL ? (
              <div className="h-full w-full relative">
                <div className="absolute right-2 top-2">
                  <button
                    type="button"
                    className="bg-white border-accentDark text-accentDark hover:text-accentDark border hover:bg-gray-100 active:bg-orange-800 p-1 font-semibold rounded-full flex"
                    onClick={handleFileRemove}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {props.isVideo ? (
                  <video
                    src={downloadURL}
                    className="object-cover h-full w-auto mx-auto"
                  />
                ) : (
                  <img
                    src={downloadURL}
                    alt={downloadURL}
                    className="object-cover h-full w-auto mx-auto"
                  />
                )}
              </div>
            ) : (
              <>
                <label
                  htmlFor={props.id}
                  className="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to Upload</span> or
                    Drag and Drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </label>
              </>
            )}
            <input
              id={props.id}
              type="file"
              className="hidden"
              onChange={(files) => {
                handleFileSelection(files.target.files);
              }}
            />
          </div>
        </div>
        {progress > 0 && progress < 100 ? (
          <div className="mt-2">
            <ProgressBar percentage={Math.floor(progress)} />
          </div>
        ) : null}
      </>
      <Toast />
    </div>
  );
}
