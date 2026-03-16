import { useEffect, useState } from "react";
import API from "../services/api";
import IssueCard from "../components/IssueCard";
import UploadForm from "../components/UploadForm";

const Feed = () => {
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    const res = await API.get("/api/issues");
    setIssues(res.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div>
      <UploadForm />

      <h2>Issues Feed</h2>

      {Array.isArray(issues) && issues.map((issue) => (
        <IssueCard key={issue._id} issue={issue} />
      ))}
    </div>
  );
};

export default Feed;