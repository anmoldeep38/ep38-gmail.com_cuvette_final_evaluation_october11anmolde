import '../../styles/Trending.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import QuizCard from '../../components/QuizCard'
import TotalCard from '../../components/TotalCard'
import { getTrending } from '../../redux/slices/TrendingSlice'

function Trending() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const trendingData = useSelector((state) => state.trendingQuiz);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true)
            await dispatch(getTrending());
            setIsLoading(false)
        }
        fetchData()
    }, [])

    const formatCreatedAt = (createdAt) => {
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(createdAt).toLocaleString('en-IN', options);
    }

    if (isLoading) {
        return <div className="loader"></div>;
    }

    return (
        <div className="trending-container">
            {/* <div className="total-quiz">
                <TotalCard number={trendingData?.totalQuizzes} name={'Quiz'} subName={'Created'} color={'#ff5d01'} />
                <TotalCard number={trendingData?.totalQuestions} name={'Question'} subName={'Created'} color={'#60b84b'} />
                <TotalCard number={trendingData?.totalViews} name={'Total'} subName={'Impressions'} color={'#5076ff'} />
            </div> */}
        <div className="total-quiz">
    <div className="quiz-box">
      <TotalCard number={trendingData?.totalQuizzes} name={'Quiz'} subName={'Created'} color={'#ff5d01'} />
    </div>
    <div className="quiz-box">
      <TotalCard number={trendingData?.totalQuestions} name={'Question'} subName={'Created'} color={'#60b84b'} />
    </div>
    <div className="quiz-box">
      <TotalCard number={trendingData?.totalViews} name={'Total'} subName={'Impressions'} color={'#5076ff'} />
    </div>
  </div>


            
            <div className="all-quiz">
                <h1>Trending Quizs</h1>
                {trendingData?.trendingQuizzes?.length > 0 ? (
                    <div className='card-container'>
                        {trendingData.trendingQuizzes.map((quiz) => (
                            <QuizCard
                                key={quiz?._id}
                                quizName={quiz?.quizName}
                                views={quiz?.views}
                                createdAt={formatCreatedAt(quiz?.createdAt)}
                            />
                        ))}
                    </div>
                ) : (
                    <p style={{ color: 'red', fontSize: '2rem', fontFamily: 'sans-serif' }}>You haven't created any Quiz, Click on Create Quiz to create your first Quiz.</p>
                )}
            </div>
        </div>
    )
}

export default Trending
