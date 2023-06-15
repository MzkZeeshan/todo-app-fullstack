import { useDispatch, useSelector } from "react-redux";
import { addTodo, editTodo, deleteTodo, getAll } from "../store/slices/TodoSlice";
import { useState, useEffect } from "react";
import axios from "axios";
const NETWORK_ERROR = "network issue"
const BASE_URL = "http://localhost:9000"



class TodoController {

  static getTodos = () => {
      return new Promise((resolve, reject) => {
          axios
              .get(`${BASE_URL}/todo/get`)
              .then(response => {
                console.log(response.data,"res")
                  resolve(response.data)
              })
              .catch(err => {
                  reject(NETWORK_ERROR);
              });
      })
  }}

export default TodoController

export const useTodo = () => {
  let [todoTitle, setTodoTitle] = useState("");
  let [todoDescription, setTodoDescription] = useState("");
  let [isEdit, setIsEdit] = useState(null);
  let [editText, setEditText] = useState("");
  let [editDescription, setEditDescription] = useState("");
  let [loading,setLoading] = useState(true)
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.TodoSlice.todos);
  const addTodos = (todo) => {

    dispatch(addTodo(todo));
  };
  const editTodos = (todo) => {
    dispatch(editTodo(todo));
  };
  const deleteTodos = (todo) => {
    dispatch(deleteTodo(todo));
  };

  useEffect(()=>{
    setLoading(true)
    TodoController.getTodos()
            .then((data) => {
              console.log("mzkz",data.data)
                dispatch(getAll(data.data))
                setLoading(false)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error, 'Error in gettingProducts')
            })
        },[])



  return {
    todos,
    editTodos,
    addTodos,
    deleteTodos,
    todoDescription,
    setTodoDescription,
    todoTitle,
    setTodoTitle,
    isEdit,
    setEditText,
    setIsEdit,
    editText,
    editDescription,
    setEditDescription
  };
};
