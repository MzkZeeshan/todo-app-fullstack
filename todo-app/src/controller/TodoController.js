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
                  resolve(response.data)
              })
              .catch(err => {
                  reject(NETWORK_ERROR);
              });
      })
  }

  static addTodo = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(`${BASE_URL}/todo/add`,{
        title:data?.title,
        description:data?.description
      })
      .then(response => {
          resolve(response.data)
      })
      .catch(err => {
          reject(NETWORK_ERROR);
      });

    })
  }

  static editTodo = (data) => {
    return new Promise((resolve, reject) => {
      axios.put(`${BASE_URL}/todo/edit`,{
        _id:data?._id,
        title:data?.title,
        description:data?.description
      })
      .then(response => {
          resolve(response.data)
      })
      .catch(err => {
          reject(NETWORK_ERROR);
      });

    })
  }

  static deleteTodo = (data) => {
    return new Promise((resolve, reject) => {
      axios.delete(`${BASE_URL}/todo/remove`,{
        _id:data,
      })
      .then(response => {
          resolve(response.data)
      })
      .catch(err => {
          reject(NETWORK_ERROR);
      });

    })
  }

  static checkedTodo = (data) => {
    return new Promise((resolve, reject) => {
      axios.put(`${BASE_URL}/todo/edit`,{
        _id:data,
        status:true
      })
      .then(response => {
          resolve(response.data)
      })
      .catch(err => {
          reject(NETWORK_ERROR);
      });

    })
  }
}

export default TodoController

export const useTodo = () => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [isEdit, setIsEdit] = useState(null);
  let [editText, setEditText] = useState("");
  let [editDescription, setEditDescription] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.TodoSlice.todos);
  const addTodos = (todo) => {
    TodoController.addTodo(todo)
    .then((data) => {
    dispatch(addTodo(todo));
    setTitle("")
    setDescription("")

    })
    .catch((error) => {
        console.log(error, 'Error ')
    })
  };
  const editTodos = (todo) => {
    const data={
      title:editText,
      description:editDescription,
      _id:todo._id,
      index:todo.index,
      status:todo.status
    }
    TodoController.editTodo(data)
    .then((res) => {
        dispatch(editTodo(data));

    })
    .catch((error) => {
        console.log(error, 'Error ')
    })
  };
  const deleteTodos = (todo) => {
    TodoController.deleteTodo(todo._id)
    .then((data) => {
    dispatch(deleteTodo(todo.index));

    })
    .catch((error) => {
        console.log(error, 'Error ')
    })
  };
  const checkedTodos = (todo) => {
    TodoController.checkedTodo(todo._id)
    .then((data) => {
    dispatch(editTodo({...todo,status:true}));
    })
    .catch((error) => {
        console.log(error, 'Error ')
    })
  }

  useEffect(()=>{
    TodoController.getTodos()
            .then((data) => {
              console.log("mzkz",data.data)
                dispatch(getAll(data.data))
            })
            .catch((error) => {
                console.log(error, 'Error')
            })
        },[])



  return {
    todos,
    editTodos,
    addTodos,
    deleteTodos,
    description,
    setDescription,
    title,
    setTitle,
    isEdit,
    setEditText,
    setIsEdit,
    editText,
    editDescription,
    setEditDescription,
    checkedTodos,
  };
};
