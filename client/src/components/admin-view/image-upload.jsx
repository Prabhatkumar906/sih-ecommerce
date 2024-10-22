import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import Input from "../ui/input";
import Label from "../ui/label";
import { useEffect, useRef } from "react";
import Button from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import PropTypes from "prop-types";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  setUploadedImageUrl,
  setImageLoadingState, // Make sure this prop is passed as a function
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
    console.log("Uploading file:", selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  // useEffect(() => {
  //   async function uploadImageToCloudinary() {
  //     // if (setImageLoadingState) {
  //     //   setImageLoadingState(true); // Ensure loading state is set to true when uploading starts
  //     // }
  //     setImageLoadingState(true);

  //     const data = new FormData();
  //     data.append("my_file", imageFile);

  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/api/admin/products/upload-image",
  //         data
  //       );
  //       if (response && setUploadedImageUrl) {
  //         setUploadedImageUrl(response.data.url); // Set the uploaded image URL
  //       }
  //       if (setImageLoadingState) {
  //         setImageLoadingState(false); // Set loading state to false when done
  //       }
  //     } catch (error) {
  //       console.error("Image upload failed", error);
  //       if (setImageLoadingState) {
  //         setImageLoadingState(false); // Reset loading state on failure
  //       }
  //     }
  //   }

  //   if (imageFile !== null) uploadImageToCloudinary();
  // }, [imageFile, setUploadedImageUrl, setImageLoadingState]); // Ensure all functions are included in dependencies


  useEffect(() => {
    async function uploadImageToCloudinary() {
      if (!imageFile) return; // No file selected
      // Call setImageLoadingState to indicate loading has started
      setImageLoadingState(true);

      const data = new FormData();
      data.append("my_file", imageFile);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/admin/products/upload-image",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Ensure multipart/form-data is set
            },
          }
        );
        if (response.data.success) {
          // Handle success response (e.g., store the uploaded image URL)
          setUploadedImageUrl(response.data.url);
        }
      } catch (error) {
        console.error("Image upload failed", error);
      } finally {
        // Call setImageLoadingState to indicate loading has finished
        setImageLoadingState(false);
      }
    }

    if (imageFile) {
      uploadImageToCloudinary();
    }
  }, [imageFile, setImageLoadingState, setUploadedImageUrl]); // Dependencies

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

ProductImageUpload.propTypes = {
  imageFile: PropTypes.object,
  setImageFile: PropTypes.func.isRequired,
  imageLoadingState: PropTypes.bool.isRequired,
  setUploadedImageUrl: PropTypes.func.isRequired,
  setImageLoadingState: PropTypes.func.isRequired, // Make sure this is expected as a function
  isEditMode: PropTypes.bool.isRequired,
  isCustomStyling: PropTypes.bool,
};
// ProductImageUpload.defaultProps = {
//   isCustomStyling: false, // Set default value if not provided
// };

export default ProductImageUpload;
