import React from 'react';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title:"Example/AddItemForm",
    component:AddItemForm,
    argTypes:{
        addItem: (title:string)=>{}
    }
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args}/>;

export const Primary = Template.bind({});
Primary.args = {
    addItem: action('Button inside form clicked')
}

