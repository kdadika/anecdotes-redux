import React from "react";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => (
  <div>
    <div>{anecdote.content}</div>
    <div>
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  </div>
);

const Anecdotes = (props) => {
  const handleVote = (anecdote) => {
    props.vote(anecdote);
  };

  return (
    <div>
      <div>
        {props.anecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleVote(anecdote)}
          />
        ))}
      </div>
    </div>
  );
};

export default Anecdotes;
