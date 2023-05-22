import { createSlice } from "@reduxjs/toolkit";
import service from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
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

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await service.createNew(content);
    dispatch(appendAnecdotes(newAnecdote));
  };
};

export const { voteFor, setAnecdotes, appendAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
