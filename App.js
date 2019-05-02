/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Home from './src/components/screens/Home.js';
import Poets from './src/components/presentation/Poets.js';
import choosePoets from './src/components/screens/choosePoets';
import Poem from './src/components/presentation/Poem.js';
import Poems from './src/components/presentation/Poems.js';
import randomPoem from './src/components/presentation/randomPoem.js';
//import WholePoems from './src/components/presentation/WholePoems.js'
import randomPoemWithPoet from './src/components/presentation/randomPoemWithPoet'
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();

const AppNavigator = createStackNavigator(
  {
      Home,
      randomPoem,
      choosePoets,
      randomPoemWithPoet,
      Poets,
      Poems,
      Poem,
      //WholePoems,
      
  },
  {
      initialRouteName: "Home"
  }
);
const AppContainer = createAppContainer(AppNavigator);


export default class App extends Component{
  render() {
    return <AppContainer />;
  }
}