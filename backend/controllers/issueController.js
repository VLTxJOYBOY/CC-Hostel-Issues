import Issue from "../models/Issue.js";

export const createIssue = async (req, res) => {
  const { description } = req.body;

  const issue = await Issue.create({
    description,
    imageUrl: "image-placeholder",
    postedBy: req.user._id,
  });

  res.json(issue);
};

export const getIssues = async (req, res) => {
  const issues = await Issue.find()
    .populate("postedBy", "name")
    .sort({ createdAt: -1 });

  res.json(issues);
};

export const resolveIssue = async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  issue.status = "resolved";
  issue.resolvedBy = req.user._id;

  await issue.save();

  res.json(issue);
};