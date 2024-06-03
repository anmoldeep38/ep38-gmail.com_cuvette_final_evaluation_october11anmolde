import "../../styles/Analytics.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import deleteImage from "../../assets/deleteImage.svg";
import shareImage from "../../assets/shareImage.svg";
import updateImage from "../../assets/updateImage.svg";
import { deleteQuiz, getAnalytics } from "../../redux/slices/AnalyticsSlice";
import DeletePopup from "./DeletePopup";

function Analytics({ setActiveTab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [quizIdToDelete, setQuizIdToDelete] = useState(null);
  const analytics = useSelector((state) => state.analyticsSlice);
  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      await dispatch(getAnalytics());
      setIsLoading(false);
    }
    fetchData();
  }, [dispatch]);

  const formatCreatedAt = (createdAt) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(createdAt).toLocaleString("en-IN", options);
  };

  const handleDeletePopupOpen = (quizId) => {
    setQuizIdToDelete(quizId);
    setIsDeletePopupOpen(true);
  };

  const handleDeletePopupClose = () => {
    setIsDeletePopupOpen(false);
    setQuizIdToDelete(null);
  };

  const handleDeleteConfirmation = async () => {
    if (quizIdToDelete) {
      await dispatch(deleteQuiz(quizIdToDelete));
      await dispatch(getAnalytics());
      setIsDeletePopupOpen(false);
      setQuizIdToDelete(null);
    }
  };

  const handleShare = (quizId) => {
    const quizUrl = `${FRONTEND_URL}/quiz/${quizId}`;
    navigator.clipboard.writeText(quizUrl);

    toast.success(
      ({ id }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>Link copied to clipboard</span>
          <button
            onClick={() => toast.dismiss(id)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontWeight: 'bold',
              marginLeft: '10px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>
      ),
      {
        position: "top-right",
      }
    );
  };

  const handleQuestionAnalysis = (quizId) => {
    const quizData = analytics.quizzes.find((quiz) => quiz?._id === quizId);

    if (quizData) {
      setActiveTab("questionAnalytics");
      navigate(`/dashboard`, { state: { quizData } });
    }
  };

  const handleQuizUpdate = (quizId) => {
    const quizData = analytics.quizzes.find((quiz) => quiz?._id === quizId);

    if (quizData) {
      setActiveTab("updateQuiz");
      navigate(`/dashboard`, { state: { quizData } });
    }
  };

  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div className="analytics-container">
      <h1>Quiz Analytics</h1>
      <div className="quiz-table">
        {analytics.quizzes.length === 0 ? (
          <p
            style={{ color: "red", fontSize: "2rem", fontFamily: "sans-serif" }}
          >
            You haven't created any Quiz.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Quiz Name</th>
                <th>Created On</th>
                <th>Impression</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {analytics.quizzes.map((quiz, index) => (
                <tr key={quiz?._id}>
                  <td>{index + 1}</td>
                  <td>{quiz?.quizName}</td>
                  <td>{formatCreatedAt(quiz?.createdAt)}</td>
                  <td>{quiz?.views}</td>
                  <td>
                    <img
                      src={updateImage}
                      alt="icon"
                      onClick={() => handleQuizUpdate(quiz?._id)}
                    />
                    <img
                      src={deleteImage}
                      alt="icon"
                      onClick={() => handleDeletePopupOpen(quiz?._id)}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={shareImage}
                      onClick={() => handleShare(quiz?._id)}
                      alt="icon"
                    />
                  </td>
                  <td
                    className="question"
                    onClick={() => handleQuestionAnalysis(quiz?._id)}
                  >
                    Question Wise Analysis
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={handleDeletePopupClose}
        onDelete={handleDeleteConfirmation}
      />
    </div>
  );
}

export default Analytics;

// import "../../styles/Analytics.css";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import deleteImage from "../../assets/deleteImage.svg";
// import shareImage from "../../assets/shareImage.svg";
// import updateImage from "../../assets/updateImage.svg";
// import { deleteQuiz, getAnalytics } from "../../redux/slices/AnalyticsSlice";
// import DeletePopup from "./DeletePopup";


// function Analytics({ setActiveTab }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
//   const [quizIdToDelete, setQuizIdToDelete] = useState(null);
//   const analytics = useSelector((state) => state.analyticsSlice);
//   const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

//   useEffect(() => {
//     async function fetchData() {
//       setIsLoading(true);
//       await dispatch(getAnalytics());
//       setIsLoading(false);
//     }
//     fetchData();
//   }, []);

//   const formatCreatedAt = (createdAt) => {
//     const options = { day: "2-digit", month: "short", year: "numeric" };
//     return new Date(createdAt).toLocaleString("en-IN", options);
//   };

//   const handleDeletePopupOpen = (quizId) => {
//     setQuizIdToDelete(quizId);
//     setIsDeletePopupOpen(true);
//   };

//   const handleDeletePopupClose = () => {
//     setIsDeletePopupOpen(false);
//     setQuizIdToDelete(null);
//   };

//   const handleDeleteConfirmation = async () => {
//     if (quizIdToDelete) {
//       await dispatch(deleteQuiz(quizIdToDelete));
//       await dispatch(getAnalytics());
//       setIsDeletePopupOpen(false);
//       setQuizIdToDelete(null);
//     }
//   };

//   // const handleShare = (quizId) => {
//   //   const quizUrl = `${FRONTEND_URL}/quiz/${quizId}`;
//   //   navigator.clipboard.writeText(quizUrl);

//   //   toast.success("Link copied to clipboard", {
//   //     position: "top-right",
//   //   });
    
//   // };
//   const handleShare = (quizId) => {
//     const quizUrl = `${FRONTEND_URL}/quiz/${quizId}`;
//     navigator.clipboard.writeText(quizUrl);
  
//     toast.success(
//       <div>
//         Link copied to clipboard
//         <button
//           onClick={() => toast.dismiss()}
//           style={{
//             background: 'none',
//             border: 'none',
//             color: '#fff',
//             fontWeight: 'bold',
//             marginLeft: '10px',
//             cursor: 'pointer'
//           }}
//         >
//           ✕
//         </button>
//       </div>,
//       {
//         position: "top-right",
//       }
//     );
//   };
  

//   const handleQuestionAnalysis = (quizId) => {
//     const quizData = analytics.quizzes.find((quiz) => quiz?._id === quizId);

//     if (quizData) {
//       setActiveTab("questionAnalytics");
//       navigate(`/dashboard`, { state: { quizData } });
//     }
//   };

//   const handleQuizUpdate = (quizId) => {
//     const quizData = analytics.quizzes.find((quiz) => quiz?._id === quizId);

//     if (quizData) {
//       setActiveTab("updateQuiz");
//       navigate(`/dashboard`, { state: { quizData } });
//     }
//   };

//   if (isLoading) {
//     return <div className="loader"></div>;
//   }

//   return (
//     <div className="analytics-container">
//       <h1>Quiz Analytics</h1>
//       <div className="quiz-table">
//         {analytics.quizzes.length === 0 ? (
//           <p
//             style={{ color: "red", fontSize: "2rem", fontFamily: "sans-serif" }}
//           >
//             You haven't created any Quiz.
//           </p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Quiz Name</th>
//                 <th>Created On</th>
//                 <th>Impression</th>
//                 <th></th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {analytics.quizzes.map((quiz, index) => (
//                 <tr key={quiz?._id}>
//                   <td>{index + 1}</td>
//                   <td>{quiz?.quizName}</td>
//                   <td>{formatCreatedAt(quiz?.createdAt)}</td>
//                   <td>{quiz?.views}</td>
//                   <td>
//                     <img
//                       src={updateImage}
//                       alt="icon"
//                       onClick={() => handleQuizUpdate(quiz?._id)}
//                     />
//                     <img
//                       src={deleteImage}
//                       alt="icon"
//                       onClick={() => handleDeletePopupOpen(quiz?._id)}
//                       style={{ cursor: "pointer" }}
//                     />
//                     <img
//                       src={shareImage}
//                       onClick={() => handleShare(quiz?._id)}
//                       alt="icon"
//                     />
//                   </td>
//                   <td
//                     className="question"
//                     onClick={() => handleQuestionAnalysis(quiz?._id)}
//                   >
//                     Question Wise Analysis
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//       <DeletePopup
//         isOpen={isDeletePopupOpen}
//         onClose={handleDeletePopupClose}
//         onDelete={handleDeleteConfirmation}
//       />
//     </div>
//   );
// }

// export default Analytics;




// // import "../../styles/Analytics.css";

// // import { useEffect, useState } from "react";
// // import toast from "react-hot-toast";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useNavigate } from "react-router-dom";

// // import deleteImage from "../../assets/deleteImage.svg";
// // import shareImage from "../../assets/shareImage.svg";
// // import updateImage from "../../assets/updateImage.svg";
// // import { deleteQuiz, getAnalytics } from "../../redux/slices/AnalyticsSlice";

// // function Analytics({ setActiveTab }) {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const [isLoading, setIsLoading] = useState(false);
// //   const analytics = useSelector((state) => state.analyticsSlice);
// //   const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

// //   useEffect(() => {
// //     async function fetchData() {
// //       setIsLoading(true);
// //       await dispatch(getAnalytics());
// //       setIsLoading(false);
// //     }
// //     fetchData();
// //   }, []);

// //   const formatCreatedAt = (createdAt) => {
// //     const options = { day: "2-digit", month: "short", year: "numeric" };
// //     return new Date(createdAt).toLocaleString("en-IN", options);
// //   };

// //   const handleDelete = async (quizId) => {
// //     await dispatch(deleteQuiz(quizId));
// //     await dispatch(getAnalytics());
// //   };

// //   const handleShare = (quizId) => {
// //     const quizUrl = `${FRONTEND_URL}/quiz/${quizId}`;
// //     navigator.clipboard.writeText(quizUrl);
// //     toast.success("Link copied to clipboard!");
// //   };

// //   const handleQuestionAnalysis = (quizId) => {
// //     const quizData = analytics.quizzes.find((quiz) => quiz?._id === quizId);

// //     if (quizData) {
// //       setActiveTab("questionAnalytics");
// //       navigate(`/dashboard`, { state: { quizData } });
// //     }
// //   };

// //   const handleQuizUpdate = (quizId) => {
// //     const quizData = analytics.quizzes.find((quiz) => quiz?._id === quizId);

// //     if (quizData) {
// //       setActiveTab("updateQuiz");
// //       navigate(`/dashboard`, { state: { quizData } });
// //     }
// //   };

// //   if (isLoading) {
// //     return <div className="loader"></div>;
// //   }

// //   return (
// //     <div className="analytics-container">
// //       <h1>Quiz Analytics</h1>
// //       <div className="quiz-table">
// //         {analytics.quizzes.length === 0 ? (
// //           <p
// //             style={{ color: "red", fontSize: "2rem", fontFamily: "sans-serif" }}
// //           >
// //             You haven't created any Quiz.
// //           </p>
// //         ) : (
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>S.No</th>
// //                 <th>Quiz Name</th>
// //                 <th>Created On</th>
// //                 <th>Impression</th>
// //                 <th></th>
// //                 <th></th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {analytics.quizzes.map((quiz, index) => (
// //                 <tr key={quiz?._id}>
// //                   <td>{index + 1}</td>
// //                   <td>{quiz?.quizName}</td>
// //                   <td>{formatCreatedAt(quiz?.createdAt)}</td>
// //                   <td>{quiz?.views}</td>
// //                   <td>
// //                     <img
// //                       src={updateImage}
// //                       alt="icon"
// //                       onClick={() => handleQuizUpdate(quiz?._id)}
// //                     />
// //                     <img
// //                       src={deleteImage}
// //                       alt="icon"
// //                     //   onClick={() => handleDelete(quiz?._id)}
// //                     onClick={() => handleDelete(quiz?._id)}
// //                       style={{ cursor: "pointer" }}
// //                     />
// //                     <img
// //                       src={shareImage}
// //                       onClick={() => handleShare(quiz?._id)}
// //                       alt="icon"
// //                     />
// //                   </td>
// //                   <td
// //                     className="question"
// //                     onClick={() => handleQuestionAnalysis(quiz?._id)}
// //                   >
// //                     Question Wise Analysis
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Analytics;
