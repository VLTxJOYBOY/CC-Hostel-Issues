const IssueCard = ({ issue, onResolve }) => {
  const isPlaceholderImage =
    !issue?.imageUrl || issue.imageUrl === "image-placeholder";

  return (
    <div className="issue-card">
      {!isPlaceholderImage ? (
        <img
          src={issue.imageUrl}
          alt="issue"
          className="issue-card-image"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : null}

      <div className="issue-card-content">
        <p className="issue-card-description">{issue.description}</p>
        <p className="issue-card-status">Status: {issue.status}</p>

        {issue.status === "open" && onResolve && (
          <button
            className="issue-card-button"
            onClick={() => onResolve(issue._id)}
          >
            Resolve
          </button>
        )}
      </div>
    </div>
  );
};

export default IssueCard;