import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

import axiosInstance from '../../helpers/AxiosInstance'

const initialState = {
    quizzes: []
}

export const getAnalytics =  createAsyncThunk("quiz/analytics", async () => {
    try {
        const res = axiosInstance.get("/quiz/analysis");
        toast.dismiss()
        toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => {
                return error?.response?.data?.message
            },
        });
        return (await res).data
    } catch (error) {
        console.error(error.message)
    }
})
export const deleteQuiz = createAsyncThunk("quiz/delete", async (quizId) => {
    try {
        const res = await axiosInstance.delete(`/quiz/${quizId}/delete`);
        toast.dismiss()
        toast.promise(res, {
            loading: "Wait! deleting quiz...",
            success: (data) => {
                return data?.data?.message;
            },
            error: (error) => {
                return error?.response?.data?.message
            },
        });
        return (await res).data
    } catch (error) {
        console.error(error.message)
    }
})


const analyticsSlice = createSlice({
    name: 'analyticsSlice',
    initialState,
    reducers: {
        resetAnalytics: () => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAnalytics.fulfilled, (state, action) => {
            const payloadData = action?.payload?.data;
            if (payloadData) {
                state.quizzes = [...payloadData]
            }
        })
    }
})

export const { resetAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer