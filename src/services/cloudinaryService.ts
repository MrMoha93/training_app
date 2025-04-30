import axios from "axios";

const cloudinaryURL = "https://api.cloudinary.com/v1_1/dawvv4e2m/image/upload";

async function saveImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "exercises");
  formData.append("upload_preset", "training_app");

  const response = await axios.post(cloudinaryURL, formData, {
    headers: { "x-auth-token": undefined },
  });
  console.log(response);
  return response.data.secure_url;
}

export default { saveImage };
