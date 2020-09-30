import React from 'react'
import { TodoType } from '../store/reducer'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import '../scss/todo.scss';
import { connect } from 'react-redux';
import { DELETE_TODO, TOGGLE_TASK_STATUS } from '../store/actions';
import deleteIcon from '../images/delete.svg';
dayjs.extend(relativeTime);


interface TodoProp{
  todo:TodoType;
  handleSelectTask:(todo:TodoType)=>void;
  deleteTodo:(id:string)=>void;
  toggleTaskStatus:(id:string,completed:boolean)=>void;
}

const Todo:React.FC<TodoProp> = ({todo,handleSelectTask,deleteTodo,toggleTaskStatus}) => {
  
  const {id,taskName,taskData,dueDate,completed} = todo;

  const getDate=(date:string):string=>{
    const diffrence = dayjs().diff(date,'day');
    if(diffrence === 0){
      return 'today'
    }
    return diffrence > 0
          ? `${Math.abs(diffrence) === 1 ? `${Math.abs(diffrence)} day ago` : `${Math.abs(diffrence)} days ago`}` 
          : `${Math.abs(diffrence) === 1 ? `${Math.abs(diffrence)} day remaining` : `${Math.abs(diffrence)} days remaining`}`
  }
  return (
    <article className={`todo ${completed ? 'todo--completed' : 'todo--active'}`}>
      <div className='todo__info'>
        <h2 className='todo__info__name'>{taskName}</h2>
        <div className='todo__info__delete' onClick={()=>deleteTodo(id)}>
          <img src={deleteIcon} alt=""/>
        </div>
      </div>
      <div className='todo-options--block'>
          <div 
            onClick={()=>toggleTaskStatus(id,!completed)}
            className={`status-toggle ${ completed ? '' : 'active'}`}
            >status: {
              completed 
              ? <span>&#10003;</span> 
              : <span>&#10005;</span>}
            </div>  
          <h5 className='todo__info__date'>{getDate(dueDate)}</h5>
        </div>
      <p className='todo__data' onClick={()=>handleSelectTask({...todo})}>{taskData}</p>
    </article>
  )
}

const mapStateToProps = (state:any) => ({});

const mapDispatchToProps = (dispatch:any) => {
  return {
    deleteTodo:(todoId:string)=>dispatch({type:DELETE_TODO,todoId}),
    toggleTaskStatus:(todoId:string,completed:boolean)=>dispatch({type:TOGGLE_TASK_STATUS,completed,todoId})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo)