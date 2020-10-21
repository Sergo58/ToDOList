import React, {useReducer} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type ToDoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"


export function AppWithRedux() {

    /*let [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "Rest API2", isDone: false}

        ]
    )*/



    const toDoLists=useSelector<AppRootStateType,Array<ToDoListType>>(state => state.toDoLists)
    const tasks=useSelector<AppRootStateType,TaskStateType>(state =>state.tasks )
    const dispatch=useDispatch()

    function addTask(title: string, toDoListID: string) {
        dispatch(addTaskAC(title,toDoListID))
    }

    function removeTasks(taskID: string, toDoListID: string) {

dispatch(removeTaskAC(taskID,toDoListID))

    }


    function changeFilter(value: FilterValuesType, toDoListID: string) {
       dispatch(ChangeTodolistFilterAC(value,toDoListID))
    }


    function changeStatus(taskID: string, isDone: boolean, toDoListID: string) {
      dispatch(changeTaskStatusAC(taskID,toDoListID,isDone))
    }

    function removeTodoList(toDoListID: string) {
       dispatch(RemoveTodolistAC(toDoListID))

    }

    function addToDoList(title: string) {
let action=AddTodolistAC(title)

        dispatch(action)

    }

    function changeTaskTitle(taskID: string, title: string, toDoListID: string) {
        dispatch(changeTaskTitleAC(taskID,toDoListID,title))
    }

    function changeToDoListTitle(title: string, toDoListID: string) {
        dispatch(ChangeTodolistTitleAC(title,toDoListID))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid style={{padding: "15px"}} container>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid spacing={3} container>
                    {
                        toDoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            }
                            return (
                                <Grid item={true} key={tl.id}>
                                    <Paper elevation={3} style={{padding: "15px"}}>
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            filter={tl.filter}
                                            changeFilter={changeFilter}
                                            removeToDoList={removeTodoList}
                                            addTask={addTask}
                                            removeTask={removeTasks}
                                            changeStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeToDoListTitle={changeToDoListTitle}


                                        />
                                    </Paper>
                                </Grid>
                            )

                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}




