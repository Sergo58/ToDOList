import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditAbleSpan} from "./EditAbleSpan";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, toDoListID: string) => void
    removeTask: (taskID: string, toDoListID: string) => void
    changeFilter: (value: FilterValuesType, toDoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, toDoListID: string) => void
    removeToDoList: (toDoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, toDoListID: string) => void
    changeToDoListTitle:(title: string, toDoListID: string)=>void
}

export function TodoList(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    };

    const changeToDoListTitle=(title: string)=>{
        props.changeToDoListTitle(title,props.id)
    }


    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    return (<div>

        <h3>
            <EditAbleSpan value={props.title} changeValue={changeToDoListTitle}/>
            <button onClick={() => {
                props.removeToDoList(props.id)
            }}>x
            </button>
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul>{
            props.tasks.map(t => {
                const removeTask = () => {
                    props.removeTask(t.id, props.id)
                }
                const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                    props.changeStatus(t.id, e.currentTarget.checked, props.id)
                }
                const changeTaskTitle = (value: string) => {
                    props.changeTaskTitle(t.id, value, props.id)
                }
                return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={changeStatus}
                    />
                    <EditAbleSpan value={t.title}
                                  changeValue={changeTaskTitle}
                    />

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