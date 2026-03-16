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
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family:"Poppins",sans-serif;
        }

        .feed-page{
          min-height:100vh;
          background:linear-gradient(135deg,#667eea,#764ba2);
          padding:40px 20px;
          display:flex;
          justify-content:center;
        }

        .feed-container{
          width:100%;
          max-width:900px;
          background:rgba(255,255,255,0.1);
          backdrop-filter:blur(12px);
          border:1px solid rgba(255,255,255,0.2);
          border-radius:18px;
          padding:35px;
          box-shadow:0 20px 40px rgba(0,0,0,0.25);
          color:white;
        }

        .feed-title{
          text-align:center;
          font-size:32px;
          font-weight:700;
          margin-bottom:25px;
          letter-spacing:1px;
        }

        .upload-section{
          margin-bottom:30px;
          padding:20px;
          border-radius:14px;
          background:rgba(255,255,255,0.08);
          border:1px solid rgba(255,255,255,0.15);
        }

        .issues-list{
          display:flex;
          flex-direction:column;
          gap:20px;
        }

        .empty-state{
          text-align:center;
          opacity:0.8;
          font-size:15px;
          padding:20px;
        }

        @media(max-width:600px){
          .feed-container{
            padding:25px;
          }

          .feed-title{
            font-size:26px;
          }
        }
      `}</style>

      <div className="feed-page">
        <div className="feed-container">

          <h2 className="feed-title">Issues Feed</h2>

          <div className="upload-section">
            <UploadForm />
          </div>

          <div className="issues-list">
            {Array.isArray(issues) && issues.length > 0 ? (
              issues.map((issue) => (
                <IssueCard key={issue._id} issue={issue} />
              ))
            ) : (
              <div className="empty-state">
                No issues reported yet 🚧
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Feed;
