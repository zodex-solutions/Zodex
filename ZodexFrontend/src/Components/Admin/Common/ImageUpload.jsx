import { useState } from "react";
import axiosInstance from "../../../API/instance";
import config from "../../../API/config";
import Title from "../../Web/Text/title";

const ImageUpload = ({ imageUrl, setImageUrl }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axiosInstance.post("/upload", formData);
      console.log(res);
      setImageUrl(res.data.filePath);
    } catch (err) {
      console.log(err);
      alert("Image upload failed. Check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Title css="mt-2" text="Image" />
      <input
        type="file"
        className="w-full bg-[#1a1d24] px-4 py-2 rounded outline-none"
        accept="image/*"
        onChange={handleUpload}
      />
      {uploading && <p className="text-sm text-yellow-400">Uploading...</p>}
      {imageUrl && (
        // console.log(
        //   config.API_URL + imageUrl
        // )
        <img
          src={imageUrl}
          alt="preview"
          className="w-32 h-32 object-cover rounded mt-2"
        />
      )}
    </div>
  );
};

export default ImageUpload;
