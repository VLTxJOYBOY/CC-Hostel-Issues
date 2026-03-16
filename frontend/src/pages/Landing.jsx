import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <style>{`
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
          font-family: "Poppins", sans-serif;
        }

        .landing{
          height:100vh;
          width:100%;
          display:flex;
          justify-content:center;
          align-items:center;
          background: linear-gradient(135deg,#4f5bd5,#6a3fb5);
        }

        .landing-card{
          backdrop-filter: blur(16px);
          background: rgba(0,0,0,0.35);
          border:1px solid rgba(255,255,255,0.25);
          border-radius:20px;
          padding:50px 40px;
          width:380px;
          text-align:center;
          box-shadow:0 20px 50px rgba(0,0,0,0.4);
          color:white;
          transition:0.3s;
        }

        .landing-card:hover{
          transform:translateY(-6px);
          box-shadow:0 30px 60px rgba(0,0,0,0.5);
        }

        .landing-title{
          font-size:38px;
          font-weight:700;
          margin-bottom:12px;
          letter-spacing:1px;
          text-shadow:0 2px 8px rgba(0,0,0,0.6);
        }

        .landing-subtitle{
          font-size:15px;
          opacity:0.95;
          line-height:1.6;
          margin-bottom:30px;
          color:#f1f1f1;
        }

        .landing-actions{
          display:flex;
          justify-content:center;
          gap:15px;
          margin-bottom:25px;
        }

        .landing-button{
          padding:12px 26px;
          border-radius:30px;
          text-decoration:none;
          font-size:15px;
          font-weight:600;
          transition:all 0.3s ease;
          display:inline-block;
        }

        .landing-button-primary{
          background:white;
          color:#6a3fb5;
        }

        .landing-button-primary:hover{
          transform:scale(1.05);
          background:#f2f2f2;
        }

        .landing-button-secondary{
          border:2px solid white;
          color:white;
          background:rgba(255,255,255,0.15);
        }

        .landing-button-secondary:hover{
          background:white;
          color:#6a3fb5;
          transform:scale(1.05);
        }

        .landing-footer{
          font-size:13px;
          opacity:0.9;
          color:#e6e6e6;
        }

        @media(max-width:500px){
          .landing-card{
            width:90%;
            padding:40px 25px;
          }

          .landing-actions{
            flex-direction:column;
          }
        }
      `}</style>

      <div className="landing">
        <div className="landing-card">
          <h1 className="landing-title">Hostel Issues</h1>

          <p className="landing-subtitle">
            Report hostel problems with a description and photo. Track updates
            as they get resolved.
          </p>

          <div className="landing-actions">
            <Link className="landing-button landing-button-primary" to="/login">
              Login
            </Link>

            <Link
              className="landing-button landing-button-secondary"
              to="/register"
            >
              Register
            </Link>
          </div>

          <p className="landing-footer">
            After login you will be redirected to the feed.
          </p>
        </div>
      </div>
    </>
  );
};

export default Landing;
