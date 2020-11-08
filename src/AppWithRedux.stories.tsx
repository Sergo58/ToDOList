import React from 'react';
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";


export default {
    title:"Example/AppWithRedux",
    component:AppWithRedux,
decorators:[ReduxStoreProviderDecorator]
} as Meta;



const Template: Story = (args) => <AppWithRedux /> ;




export const BaseExample = Template.bind({});
BaseExample.args = {

}

