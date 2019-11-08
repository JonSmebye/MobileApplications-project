import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ApiKeys from './src/constants/ApiKeys';
import * as firebase from 'firebase';
import HeaderApp from './src/components/HeaderApp';
import SwitchNavigator from './navigation/SwitchNavigator';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialize firebase
    firebase.initializeApp(ApiKeys.firebaseConfig);
  }
  render(){
  return (
      <SwitchNavigator/>
  );
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
