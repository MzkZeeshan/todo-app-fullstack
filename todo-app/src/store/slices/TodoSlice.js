import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos:[]
}

const TodoSlice=createSlice({
    name:"todo",
    initialState,
    reducers:{
        getAll:(state,action)=>{
            state.todos=action.payload
        },
        addTodo:(state,action)=>{
            console.log(action)
            state.todos=[...state.todos,action.payload]
        },
        editTodo:(state,action)=>{
            state.todos[action.payload.index]=action.payload

            console.log("aaaa",state.todos)

        },
        deleteTodo:(state,action)=>{
            console.log("aaaa",action.payload)

            state.todos=state.todos.filter((_,index)=>index!==action.payload)
        }
    }
    
})


export const {addTodo,editTodo,deleteTodo,getAll} = TodoSlice.actions
 
export default TodoSlice.reducer