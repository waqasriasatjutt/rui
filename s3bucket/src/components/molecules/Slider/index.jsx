// src/components/ThumbnailSlider.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { get_comments } from "../../../redux/ordersSlice";
import api from "../../../services/api";
import DotsLoader from "../../atoms/DotsLoader";

const ThumbnailSlider = ({ images, activeImage, order_number, isCustomer }) => {
    const dispatch = useDispatch();
    const [isLoader, setIsLoader]=useState(false)
  const markAsActive = async (path) => {
    setIsLoader(true)
    try {
      await api.post("/api/active_image", { image_path: path, order_number:order_number });
      toast.success("Image set as active successfully");
      setIsLoader(false)
      dispatch(get_comments(order_number));
    } catch (error) {
      setIsLoader(false)
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="flex flex-row justify-center items-center w-full overflow-x-auto space-x-3">
      {isLoader&& <DotsLoader/>}
      {images&&images?.map((image, index) => (
        <div
          key={index}
          className="w-40 h-40 border rounded relative"
          onClick={() => markAsActive(image)}
        >
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            className="w-full h-full cursor-pointer "
          />
          {
            image===activeImage && !isCustomer?
            <div class="absolute bg-green-500 h-6 w-6 left-0 top-0 rounded flex justify-center items-center text-white">
            ✓
          </div>:null
          }
          
        </div>
      ))}
    </div>
  );
};

export default ThumbnailSlider;
