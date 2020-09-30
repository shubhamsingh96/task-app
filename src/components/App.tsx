import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import Header from "./Header";
import { TodoType } from "../store/reducer";
import Modal from "../UI/Modal";
import TodoInput from "./TodoInput";
import { CREATE_TODO, OPEN_MODAL, UPDATE_TODO } from "../store/actions";
import {ReactComponent as PenIcon} from '../images/pen.svg';

interface AppProps {
  todos: TodoType[] | null;
  updateTodo: (todo: TodoType) => void;
  addTodo:(todo:TodoType)=>void;
  modalType: number;
  openModal: (value: number) => void; // 0 for Add New Task and 1 for Update existing task
  modalStatus: boolean;
}

export interface FilterType{
  type:'ALL' | 'ACTIVE' | 'COMPLETED';
  isOpen:boolean;
}

const App: React.FC<AppProps> = ({
  todos,
  updateTodo,
  openModal,
  modalType,
  modalStatus,
  addTodo,
}) => {
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const [filterState, setFilterState] = useState<FilterType>({
    type:'ALL',
    isOpen:false
  })
  const handleSelectTask = (todo: TodoType) => {
    setSelectedTodo(todo);
    openModal(1);
  };


  const renderTodos = useCallback(() => {
    let filteredTodos:TodoType[] = []
    if(todos && todos.length > 0){

      if(filterState.type === 'ACTIVE'){
        filteredTodos = todos.filter(todo => !todo.completed);
      }
      if(filterState.type === 'COMPLETED'){
        filteredTodos = todos.filter(todo => todo.completed);
      }
      if(filterState.type === 'ALL'){
        filteredTodos = [...todos];
      }
    }
    return (
      filteredTodos &&
      filteredTodos.length > 0 &&
      filteredTodos.map((todo: TodoType) => (
        <Todo todo={todo} key={todo.id} handleSelectTask={handleSelectTask} />
      ))
    );
  },[todos,filterState])

  return (
    <div>
      <Header filterState={filterState} setFilterState={setFilterState} />
      <main className="main">
        <button className="create-todo-btn" onClick={() => openModal(0)}>
          <PenIcon width={18} height={18} fill='white' /><span>Create Todo</span>
        </button>
        {modalStatus && (
          <Modal>
            {modalType === 0 ? (
              <TodoInput selectedTodo={null} addTodo={addTodo} />
            ) : (
              <TodoInput selectedTodo={selectedTodo} addTodo={updateTodo} />
            )}
          </Modal>
        )}
        <section className="todo-wrapper">{renderTodos()}</section>
      </main>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    todos: state.todos,
    modalStatus: state.modalStatus,
    modalType: state.modalType,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTodo: (todo: TodoType) => dispatch({ type: UPDATE_TODO, todo }),
    openModal: (modalType: number) => dispatch({ type: OPEN_MODAL, modalType }),
    addTodo:(todo:TodoType)=>dispatch({type:CREATE_TODO,todo})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
