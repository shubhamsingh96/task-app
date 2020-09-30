import { CREATE_TODO, DELETE_TODO, UPDATE_TODO,OPEN_MODAL,CLOSE_MODAL, TOGGLE_TASK_STATUS } from './actions'

export interface TodoType{
  id:string;
  taskName:string;
  dueDate:string;
  taskData:string;
  completed:boolean;
}

interface InitialStateType{
  todos:TodoType[] | [];
  modalStatus:boolean;
  modalType:number;
}

const initialState:InitialStateType = {
  todos:[{"id":"57dpEevXg","completed":false,"dueDate":"2020-09-30T00:00:00.000Z","taskData":"saasdas","taskName":"test"}],
  modalStatus:false,
  modalType:0,
}


const reducer = (state=initialState,action:any) => {
 switch (action.type) {
   case OPEN_MODAL: return {...state,modalStatus:true,modalType:action.modalType}
   case CLOSE_MODAL: return {...state,modalStatus:false,modalType:0}
   case CREATE_TODO: return {...state,todos:state.todos.concat(action.todo),modalStatus:false,modalType:0}
   case DELETE_TODO: return {...state,todos: state.todos.filter((todo:TodoType)=> todo.id !== action.todoId)}
   case UPDATE_TODO:
      const selectedTodoIndex = state.todos.findIndex( (todo:TodoType) => todo.id === action.todo.id);
      console.log(action.todo.id,'redux')
      const copyTodo = [...state.todos];
      copyTodo[selectedTodoIndex] = {
        ...copyTodo[selectedTodoIndex],
        ...action.todo
      }
    return {...state,todos:copyTodo,modalStatus:false,modalType:0};
    case TOGGLE_TASK_STATUS: 
    const todoIndex = state.todos.findIndex( (todo:TodoType) => todo.id === action.todoId);
      const cloneTodo = [...state.todos];
      cloneTodo[todoIndex] = {
        ...cloneTodo[todoIndex],
        completed:action.completed
      }
    return {...state,todos:cloneTodo};
   default: return state;
 }
}

export default reducer
