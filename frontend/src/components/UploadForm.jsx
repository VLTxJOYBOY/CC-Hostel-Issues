import { useState } from "react";
import API from "../services/api";

const UploadForm = () => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const submitIssue = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("description", description);
      if (image) {
        formData.append("image", image);
      }

      await API.post("/api/issues", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Issue submitted");
      setDescription("");
      setImage(null);
    } catch (err) {
      const message =
        err?.response?.data?.message || err?.message || "Failed to submit issue";
      console.error("Create issue failed:", err?.response?.data || err);
      alert(message);
    }
  };

  return (
    <form className="upload-form" onSubmit={submitIssue}>
      <h3 className="upload-form-title">Report an Issue</h3>

      <textarea
        className="upload-form-textarea"
        placeholder="Describe the issue..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="upload-form-file-input"
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <button className="upload-form-button" type="submit">
        Submit Issue
      </button>
    </form>
  );
};

export default UploadForm;