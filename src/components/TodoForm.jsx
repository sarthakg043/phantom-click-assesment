import React, { useState } from 'react'
import { Button } from './ui/button'
import { DatePickerWithPresets } from './DatePickerWithPresets'
import Todo from './Todo'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo } from '@/features/todo/todoSlice'

const TodoForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todo.todos)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addTodo({
            title,
            description,
            targetDate: String(targetDate),
        }))
        setTitle('')
        setDescription('')
        setTargetDate()
    }

    const handleDateChange = (date) => {
        setTargetDate(date)
    }
  return (
    <div 
        className='w-full flex flex-row justify-center items-center text-xl font-bold bg-transparent'
    >
        <div 
            className='w-11/12 max-w-[40rem] flex flex-wrap justify-center items-center dark:bg-black shadow-md rounded-lg p-4 mt-12 backdrop-blur-sm bg-white/30 dark:bg-black/30'
        >
            <form onSubmit={handleSubmit} className=' w-full bg-white dark:bg-black dark:text-white border dark:border-cyan-500  shadow-sm rounded-md pb-5 px-3 pt-2'>
                <input 
                    name="title"
                    type='text' 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-4/5 h-10 px-2 text-base lg:text-lg font-normal rounded-lg bg-transparent focus:outline-none  dark:text-white' 
                    placeholder='Add todo...'
                    maxLength={50}
                    required
                />
                <input 
                    name="description"
                    type='text' 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='w-4/5 h-10 px-2 text-xs lg:text-sm font-light rounded-lg focus:outline-none bg-transparent dark:text-white' 
                    placeholder='Add description...'
                    maxLength={225}
                />
                <div className='flex flex-wrap justify-between pt-3'>
                    <div className="w-full sm:w-auto">
                        <DatePickerWithPresets label={"Pick a target Date"} onStateChange={handleDateChange} value={targetDate}/>
                    </div>
                    <div className='w-full max-w-32 sm:w-1/5 pt-3 sm:pt-0 mx-3'>
                        <Button
                            type='submit'
                            className='w-full h-10 dark:outline-cyan-500 outline text-white font-bold rounded-lg bg-blue-500 dark:bg-transparent dark:text-cyan-500 dark:hover:bg-cyan-500 dark:hover:text-white'
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </form>
            <div className='w-full'>
                <br />
                {/* Todo List */}
                {todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default TodoForm