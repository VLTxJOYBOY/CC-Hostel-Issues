import { useEffect, useState } from "react";
import API from "../services/api";
import IssueCard from "../components/IssueCard";

const AdminDashboard = () => {
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    const res = await API.get("/issues");
    setIssues(res.data);
  };

  const resolveIssue = async (id) => {
    await API.patch(`/issues/${id}/resolve`);
    fetchIssues();
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {issues.map((issue) => (
        <IssueCard
          key={issue._id}
          issue={issue}
          onResolve={resolveIssue}
        />
      ))}
    </div>
  );
};

export default AdminDashboard;