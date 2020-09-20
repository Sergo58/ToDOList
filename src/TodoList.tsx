import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id:string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string,toDoListID: string) => void
    removeTask: (taskID: string,toDoListID: string) => void
    changeFilter: (value: FilterValuesType,toDoListID:string) => void
    changeStatus: (taskID: string, isDone: boolean,toDoListID: string) => void
    removeToDoList:(toDoListID:string)=>void
}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)
    const addTask = () => {
        if (title.trim()) {
            props.addTask(title,props.id)
            setTitle("")
        } else {
            setError("Title is required")
        }

    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)


    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active",props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed",props.id)
    }
    return (<div>

        <h3>{props.title}<button onClick={()=>{props.removeToDoList(props.id)}}>x</button></h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyUpHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>

        <ul>{
            props.tasks.map(t => {
                const removeTask = () => {
                    props.removeTask(t.id,props.id)
                }
                const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(t.id, e.currentTarget.checked,props.id)
                }
                return <li key={t.id} className={t.isDone?"is-done":""}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={changeStatus}
                    />
                    <span>{t.title}</span>
                    <button onClick={removeTask}>X
                    </button>
                </li>
            })
        }

        </ul>
        <div>
            <button
                onClick={onAllClickHandler}
                className={props.filter === "all" ? "active-filter" : ""}
            >All
            </button>
            <button onClick={onActiveClickHandler}
                    className={props.filter === "active" ? "active-filter" : ""}
            >Active
            </button>
            <button onClick={onCompletedClickHandler}
                    className={props.filter === "completed" ? "active-filter" : ""}
            >Completed
            </button>
        </div>
    </div>)

}