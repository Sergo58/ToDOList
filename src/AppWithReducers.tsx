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


export function AppWithReducers() {

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

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [toDoLists, dispatchToDoLists] = useReducer(todolistReducer,[
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistID1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "GraphQL", isDone: true},
            {id: v1(), title: "Rest API", isDone: true},
            {id: v1(), title: "TS", isDone: false}],
        [todolistID2]: [{id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Onion", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: false}]
    })

    function addTask(title: string, toDoListID: string) {
        dispatchTasks(addTaskAC(title,toDoListID))
    }

    function removeTasks(taskID: string, toDoListID: string) {

dispatchTasks(removeTaskAC(taskID,toDoListID))

    }


    function changeFilter(value: FilterValuesType, toDoListID: string) {
       dispatchToDoLists(ChangeTodolistFilterAC(value,toDoListID))
    }


    function changeStatus(taskID: string, isDone: boolean, toDoListID: string) {
      dispatchTasks(changeTaskStatusAC(taskID,toDoListID,isDone))
    }

    function removeTodoList(toDoListID: string) {
       dispatchToDoLists(RemoveTodolistAC(toDoListID))
        dispatchTasks(RemoveTodolistAC(toDoListID))
    }

    function addToDoList(title: string) {
let action=AddTodolistAC(title)
       dispatchToDoLists(action)
        dispatchTasks(action)

    }

    function changeTaskTitle(taskID: string, title: string, toDoListID: string) {
        dispatchTasks(changeTaskTitleAC(taskID,toDoListID,title))
    }

    function changeToDoListTitle(title: string, toDoListID: string) {
        dispatchToDoLists(ChangeTodolistTitleAC(title,toDoListID))
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




