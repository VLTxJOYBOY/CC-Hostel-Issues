const IssueCard = ({ issue, onResolve }) => {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      {issue.imageUrl && (
        <img
          src={issue.imageUrl}
          alt="issue"
          style={{ width: "300px" }}
        />
      )}

      <p>{issue.description}</p>

      <p>Status: {issue.status}</p>

      {issue.status === "open" && onResolve && (
        <button onClick={() => onResolve(issue._id)}>
          Resolve
        </button>
      )}
    </div>
  );
};

export default IssueCard;