import { createSlice } from "@reduxjs/toolkit";
import service from "../services/anecdotes";

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteFor(state, action) {
      const id = action.payload;
      const updatedAnecdote = state.find((anecdote) => anecdote.id === id);
      const changedAnecdote = {
        ...updatedAnecdote,
        votes: updatedAnecdote.votes + 1,
      };
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdotes(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initialize = () => {
  return async (dispatch) => {
    const data = await service.getAll();
    dispatch(setAnecdotes(data));
  };
};

export const { createAnecdote, voteFor, setAnecdotes, appendAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
