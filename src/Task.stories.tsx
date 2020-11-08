import React from 'react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";


export default {
    title:"Example/Task",
    component:Task,

} as Meta;

const removeCallback=action("Remove callback was clicked")
const changeStatusCallback=action("changeStatus callback was clicked")
const changeTitleCallback=action("changeTitle callback was clicked")

const Template: Story<TaskPropsType> = (args) => <Task {...args}/>;

const baseArgs = {
    changeTaskStatus: changeStatusCallback,
    changeTaskTitle: changeTitleCallback,
    removeTask: removeCallback,
}


export const isNotCompletedTask = Template.bind({});
isNotCompletedTask.args = {
    todolistId:'todolist2',
    ...baseArgs,
    task:{id:'1',title:'CSS',isDone:false},

}

export const completedTask = Template.bind({});
completedTask.args = {
    todolistId:'todolist2',
    ...baseArgs,
    task:{id:'1',title:'JS',isDone:true},

}