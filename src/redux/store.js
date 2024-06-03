import { configureStore } from '@reduxjs/toolkit'

import AnalyticsSlice from './slices/AnalyticsSlice'
import AuthSlice from './slices/AuthSlice'
import QuizSlice from './slices/QuizSlice'
import TrendingSlice from './slices/TrendingSlice'

const store = configureStore({
    reducer: {
        auth: AuthSlice,
        trendingQuiz: TrendingSlice,
        analyticsSlice: AnalyticsSlice,
        quizSlice: QuizSlice
    },
    devTools: true
})

export default store