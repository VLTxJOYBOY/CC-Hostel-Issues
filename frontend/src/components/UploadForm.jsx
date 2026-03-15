import { useState } from "react";
import API from "../services/api";

const UploadForm = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const submitIssue = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    formData.append("image", image);

    await API.post("/issues", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Issue submitted");
  };

  return (
    <form className="upload-form" onSubmit={submitIssue}>
      <h3 className="upload-form-title">Report an Issue</h3>

      <textarea
        className="upload-form-textarea"
        placeholder="Describe the issue..."
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="upload-form-file-input"
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button className="upload-form-button" type="submit">
        Submit Issue
      </button>
    </form>
  );
};

export default UploadForm;