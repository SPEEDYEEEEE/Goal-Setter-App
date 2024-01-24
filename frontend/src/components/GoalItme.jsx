import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goals/goalSlice'
import { IoCloseCircleOutline } from "react-icons/io5";


function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <IoCloseCircleOutline onClick={() => dispatch(deleteGoal(goal._id))} className='close'/>
    </div>
  )
}

export default GoalItem