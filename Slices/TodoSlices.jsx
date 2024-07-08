import { createSlice } from '@reduxjs/toolkit';

const initialState = []
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        settodo(state, action) {
            return action.payload
        },
        addtodo(state, action) {
            state.push(action.payload)
        },
        edittodo(state, action) {
            console.log("outside map", action.payload)
            const newstate = state.map((task) => {
                if (task.id === action.payload.id) {
                    console.log("inside if", task.id, " ", action.payload.id)
                    return {
                        ...state, taskname: action.payload.taskname, taskdesc: action.payload.taskdesc, id: action.payload.id, status: action.payload.status

                    }


                }
                console.log(state)
                return task
            })

            return newstate
        },
        removetodo(state, action) {
            return state.filter(todo => todo.id !== action.payload)
        },
        savetodo(state) {

        },
        toggletodo(state, action) {

            return state.map(todo =>
                todo.id === action.payload ? { ...todo, status: todo.status === 'Completed' ? 'Pending' : 'Completed' } : todo
            );

        },
        /*filtertodo(state, action) {
            let newstate;
            switch (action.payload) {
                case 'Pending':
                    newstate = state.filter((item) => item.status === 'Pending');
                    break;
                case 'Completed':
                    newstate = state.filter((item) => item.status === 'Completed');
                    break;
                default:
                    newstate = state;
                    break;
            }
            return [...newstate];
        },*/
    }
})
    

export const { settodo, addtodo, edittodo, removetodo, savetodo, toggletodo, filtertodo } = todoSlice.actions;
export default todoSlice; 
