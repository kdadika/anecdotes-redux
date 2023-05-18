import { createSlice } from "@reduxjs/toolkit";

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const anecdotes = [
  {
    content: "If it hurts, do it more often",
    id: "47145",
    votes: 0,
  },
  {
    content: "Adding manpower to a late software project makes it later!",
    id: "21149",
    votes: 0,
  },
  {
    content:
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    id: "69581",
    votes: 0,
  },
  {
    content:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    id: "36975",
    votes: 7,
  },
  {
    content: "Premature optimization is the root of all evil.",
    id: "25170",
    votes: 8,
  },
  {
    content:
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    id: "98312",
    votes: 7,
  },
];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: anecdotes,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload;
      state.push({
        content,
        id: generateId(),
        votes: 0,
      });
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

    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

// const reducer = (state = anecdotes, action) => {
//   console.log("state now: ", state);

//   switch (action.type) {
//     case "CREATE_ANECDOTE": {
//       return [...state, action.payload];
//     }
//     case "VOTE": {
//       const id = action.payload.id;
//       const updatedAnecdote = state.find((anecdote) => anecdote.id === id);
//       const changedAnecdote = {
//         ...updatedAnecdote,
//         votes: updatedAnecdote.votes + 1,
//       };
//       return state
//         .map((anecdote) => (anecdote.id !== id ? anecdote : changedAnecdote))
//         .sort((a, b) => b.votes - a.votes);
//     }
//     default:
//       return state;
//   }
// };

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

// export const createAnecdote = (content) => {
//   return {
//     type: "CREATE_ANECDOTE",
//     payload: {
//       content,
//       id: generateId().toString(),
//       votes: 0,
//     },
//   };
// };

// export const vote = (id) => {
//   return {
//     type: "VOTE",
//     payload: { id },
//   };
// };

export const { createAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
