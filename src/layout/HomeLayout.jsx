import "../styles/HomeLayout.css";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import ShareCard from "../components/ShareCard";
import Analytics from "../pages/dashboard/Analytics";
import CreateQuiz from "../pages/dashboard/CreateQuiz";
import QuestionAnalytics from "../pages/dashboard/QuestionAnalytics";
import Trending from "../pages/dashboard/Trending";
import UpdateQuiz from "../pages/quiz_interface/UpdateQuiz";
import { resetAnalytics } from "../redux/slices/AnalyticsSlice";
import { logout } from "../redux/slices/AuthSlice";
import { resetTrending } from "../redux/slices/TrendingSlice";

function HomeLayout() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [quizId, setQuizId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  async function onLogout() {
    await dispatch(logout());
    await dispatch(resetTrending());
    await dispatch(resetAnalytics());
    navigate("/");
  }
  return (
    <div className="homelayout">
      <div className="layout-container">
        <div className="sidebar">
          <Link to={"/dashboard"} className="title">
            QUIZZIE
          </Link>
          <div className="sidebar-menu">
            <span
              className={activeTab === "dashboard" ? "tabActive" : ""}
              onClick={() => handleTabClick("dashboard")}
            >
              Dashboard
            </span>
            <span
              className={activeTab === "analytics" ? "tabActive" : ""}
              onClick={() => handleTabClick("analytics")}
            >
              Analytics
            </span>
            <span
              className={activeTab === "createQuiz" ? "tabActive" : ""}
              onClick={() => handleTabClick("createQuiz")}
            >
              Create Quiz
            </span>
          </div>
          <div className="logout">
            <hr />
            <span onClick={onLogout}>Logout</span>
          </div>
        </div>
        <div className="right">
          {activeTab === "dashboard" ? (
            <Trending />
          ) : activeTab === "analytics" ? (
            <Analytics setActiveTab={setActiveTab} />
          ) : activeTab === "questionAnalytics" ? (
            <QuestionAnalytics />
          ) : activeTab === "updateQuiz" ? (
            <UpdateQuiz setActiveTab={setActiveTab} />
          ) : (
            <></>
          )}
        </div>
      </div>
      {activeTab === "createQuiz" ? (
        quizId ? (
          <ShareCard
            quizId={quizId}
            setActiveTab={setActiveTab}
            setQuizId={setQuizId}
          />
        ) : (
          <CreateQuiz setActiveTab={setActiveTab} setQuizId={setQuizId} />
        )
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomeLayout;
