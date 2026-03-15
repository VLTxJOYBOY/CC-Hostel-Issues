const IssueCard = ({ issue, onResolve }) => {
  return (
    <div className="issue-card">
      {issue.imageUrl && (
        <img src={issue.imageUrl} alt="issue" className="issue-card-image" />
      )}

      <div className="issue-card-content">
        <p className="issue-card-description">{issue.description}</p>
        <p className="issue-card-status">Status: {issue.status}</p>

        {issue.status === "open" && onResolve && (
          <button className="issue-card-button" onClick={() => onResolve(issue._id)}>
            Resolve
          </button>
        )}
      </div>
    </div>
  );
};

export default IssueCard;