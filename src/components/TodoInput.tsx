import React, { useEffect, useRef, useState } from 'react'
import { TodoType } from '../store/reducer'
import { generate } from 'shortid'; 
import '../scss/addTodo.scss';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { CLOSE_MODAL, DELETE_TODO } from '../store/actions';

interface TodoInputProp{
  addTodo:(todo:TodoType)=>void;
  closeModal:()=>void;
  selectedTodo?:TodoType | null;
  deleteTask:(todoId:string)=>void;
}

interface TodoInputState{
  id:string;
  taskName:string;
  dueDate:string;
  completed:boolean;
}

const TodoInput:React.FC<TodoInputProp> = ({addTodo,closeModal,selectedTodo,deleteTask}) => {
  const todoInputRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<TodoInputState>({
    id:'',
    taskName:'',
    dueDate:dayjs().format('YYYY-MM-DD'),
    completed:false,
  })
  const [error, setError] = useState('')

  useEffect(() => {

   if(todoInputRef.current){
     todoInputRef.current.innerText = selectedTodo?.taskData || ''
   }
    const updatedTudo = {
      id:selectedTodo?.id || '',
      taskName:selectedTodo?.taskName || '',
      dueDate:selectedTodo?.dueDate && dayjs(selectedTodo.dueDate).format('YYYY-MM-DD') || dayjs().format('YYYY-MM-DD'),
      completed:selectedTodo?.completed || false,
    }
    setState(updatedTudo);

  }, [selectedTodo])

  const handleSubmit = () => {
    if(state.taskName === '' || state.taskName.trim() === ''){
      return setError('Task name is required');
    }
    if(todoInputRef.current && (todoInputRef.current.innerText === '' || todoInputRef.current.innerText.trim() === '')){
      return setError('Task content is required');
    }
    
    if(todoInputRef.current){
      const newTodo:TodoType = {
        id: state.id !=='' ? state.id : generate(),
        completed:state.completed,
        dueDate:new Date(state.dueDate).toISOString(),
        taskData:todoInputRef.current.innerText,
        taskName:state.taskName
      }
      addTodo(newTodo);
      closeModal();
      todoInputRef.current.innerText = '';
      setState({
        id:'',
        taskName:'',
        completed:false,
        dueDate:dayjs().format('YYYY-MM-DD')
      });
    }
  }

  const handleTaskDelete=()=>{
    deleteTask(state.id)
    closeModal()
  }

  const handleTaskName = (e:any) => {
    const filter = /[a-zA-Z]/;
    if(!filter.test(e.key)){
     e.preventDefault();
    }
    
  }

  return (
    <article className='addTodo'>
    <header className='addTodo__header'>
      <input type="text" placeholder='Task Name' maxLength={62} value={state.taskName} 
      onChange={({target:{value}})=>setState({...state,taskName:value})}
      onKeyDown={handleTaskName}
      />
      <article className='addTodo__options'>
      <div>
       <input type="date" name="asdas" id="" value={state.dueDate} onChange={({target:{value}})=>setState({...state,dueDate:value})} />
      </div>
      <div 
      className={`status-toggle ${ state.completed ? '' : 'active'}`} 
      onClick={()=>setState({...state,completed:!state.completed})}>status: {state.completed ? <span>&#10003;</span> : <span>&#10005;</span>}</div>
      </article>
    </header>
    <div className='addTodo__input' data-ph='Task content' ref={todoInputRef} contentEditable={true} />
  <p className='error-message'>{error}</p>
    <div className='addTodo__btn__wrapper'>
    <button className='addTodo__btn' onClick={handleSubmit}>{state.id !=='' ? 'UPDATE' : 'ADD'}</button>
    {state.id !=='' && <button className='addTodo__btn' onClick={handleTaskDelete}>DELETE</button>}
    
    </div>
    </article>
  )
}

const mapStateToProps = (state:any) => ({});

const mapDispatchToProps = (dispatch:any) => {
  return {
    closeModal:()=>dispatch({type:CLOSE_MODAL}),
    deleteTask:(todoId:string)=>dispatch({type:DELETE_TODO,todoId})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoInput)
