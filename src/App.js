import AnecdoteList from "./components/Anecdotes";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  return (
    <div>
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
