import React, { Component } from 'react';
import { View } from 'react-native';
import { auth } from '../firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Register from '../screens/Register';
import Login from '../screens/Login';
​
const Drawer = createDrawerNavigator();
​
export default class AuthDrawer extends Component{
  constructor(props){
    super(props);
    this.state = {
      logueado: false // estado inicial: no estas logueado
    }
  }
​
  registrarse(email, password){
    auth.createUserWithEmailAndPassword(email, password) //es un metodo de auth
    .then(response => {
      console.log(response);
      this.setState({logueado: true})
    })
    .catch(error => { //por si hay un error en la cracion del usuario
      console.log(error);
      this.setState({logueado: false})
    })
  }
​
  ingresar(email, password){
    auth.signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response);
      this.setState({logueado: true})
    })
    .catch(error => {
      console.log(error);
      this.setState({logueado: false})
    })
  }
​
  render(){
    return(
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Register" component={() => <Register registrarse={(email, pass) => this.registrarse(email, pass)} />} />
          <Drawer.Screen name="Login" component={() => <Login ingresar={(email, pass) => this.ingresar(email, pass)} />} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}