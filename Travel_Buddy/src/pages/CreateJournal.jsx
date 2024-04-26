import {
  TextInput,
  Select,
  FileInput,
  Button,
  Alert,
} from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CreateJournal() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const filesName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, filesName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl font-semibold my-7">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="Adventure">Adventure</option>
            <option value="Cruises">Cruises</option>
            <option value="Leisure">Leisure</option>
            <option value="Family">Family</option>
            <option value="Solo">Solo</option>
            <option value="Backpackers">Backpackers</option>
            <option value="Business">Business</option>
            <option value="Cultural">Cultural</option>
            <option value="Budget">Budget</option>
            <option value="Camping">Camping</option>
            <option value="Heritage">Heritage</option>
            <option value="Religious">Religious</option>
            <option value="Beach">Beaches</option>
            <option value="Wildlife">Wildlife</option>
          </Select>
        </div>
        <div className="gap-4 flex items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {
          imageUploadError && (
            <Alert color='failure'>{imageUploadError}</Alert>
          )
        }
        {
          formData.image && (
            <img src={formData.image} alt='upload' className="w-full h-72 object-cover"/>
          )
        }
        <ReactQuill
          theme="snow"
          placeholder="Write something here.."
          className="h-72 mb-12"
          required
        />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          Publish
        </Button>
      </form>
    </div>
  );
}
