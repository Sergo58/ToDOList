import React, {ChangeEvent, useState, KeyboardEvent, useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditAbleSpan} from "./EditAbleSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

export const TodoList=React.memo( function (props: PropsType) {
    console.log("TODOLIST")
    const addTask =useCallback( (title: string) => {
        props.addTask(title, props.id)
    },[props.addTask,props.id]);

    const removeToDoList=useCallback((toDoListID: string)=>{
        props.removeToDoList(props.id)
    },[props.removeToDoList,props.id])

    const changeToDoListTitle=useCallback((title: string)=>{
        props.changeToDoListTitle(title,props.id)
    },[props.changeToDoListTitle,props.id])

    const onAllClickHandler =useCallback(() => {
        props.changeFilter("all", props.id)
    },[props.changeFilter,props.id])
    const onActiveClickHandler =useCallback(() => {
        props.changeFilter("active", props.id)
    },[props.changeFilter,props.id])
    const onCompletedClickHandler =useCallback(() => {
        props.changeFilter("completed", props.id)
    },[props.changeFilter,props.id])


        let tasksForTodoList = props.tasks;

        if (props.filter === "active") {
            tasksForTodoList = props.tasks.filter(t => t.isDone === false)
        }
        if (props.filter === "completed") {
            tasksForTodoList = props.tasks.filter(t => t.isDone === true)
        }


    return (<div>

        <h3>
            <EditAbleSpan value={props.title} changeValue={changeToDoListTitle}/>

            <IconButton onClick={() => {
                removeToDoList(props.id)
            } }><Delete/></IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul style={{listStyle:"none",padding:"0"}}>{
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
                  {/*  <input type="checkbox"
                           checked={t.isDone}
                           onChange={changeStatus}
                    />*/}
                    <Checkbox
                        color={"primary"}
                        checked={t.isDone}
                        onChange={changeStatus}

                    />
                    <EditAbleSpan value={t.title}
                                  changeValue={changeTaskTitle}
                    />
                    <IconButton size={"small"} onClick={
                        removeTask }><Delete/></IconButton>

                </li>
            })
            }

        </ul>
        <div>
            <Button
                size={"small"}
                color={props.filter === "all" ? "primary" : "default"}
                variant={"contained"}
                onClick={onAllClickHandler}
                //className={props.filter === "all" ? "active-filter" : ""}
            >All
            </Button>
            <Button
                style={{margin:"0 5px"}}
                size={"small"}
                color={props.filter === "active" ? "primary" : "default"}
                variant={"contained"}
                onClick={onActiveClickHandler}
                   // className={props.filter === "active" ? "active-filter" : ""}
            >Active
            </Button>
            <Button
                size={"small"}
                color={props.filter === "completed"  ? "primary" : "default"}
                variant={"contained"}
                onClick={onCompletedClickHandler}
                   // className={props.filter === "completed" ? "active-filter" : ""}
            >Completed
            </Button>
        </div>
    </div>)

})