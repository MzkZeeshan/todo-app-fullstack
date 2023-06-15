import "./App.css";
import { Provider } from "react-redux";
import Store  from "./store";
import Todo from "./screens/Todo";
function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <Todo />
      </Provider>
    </div>
  );
}

export default App;
