import React, { Component } from "react";
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Profile from '../screens/Profile';

const SwitchNavigator = createSwitchNavigator(
    {
        Login: Login,
        Signup: Signup,
        Profile: Profile
    },
    {
        initialRouteName: 'Login'
    }
)

export default createAppContainer(SwitchNavigator);