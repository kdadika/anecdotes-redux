import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import anecdoteReducer from "../reducers/anecdoteReducer";
import filterReducer from "../reducers/filterReducer";

const reducer = {
  anecdotes: anecdoteReducer,
  filter: filterReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
