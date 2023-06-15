import { configureStore } from '@reduxjs/toolkit'
import TodoSlice from './slices/TodoSlice'

export default configureStore({
    reducer: {
        TodoSlice,
    },
  })