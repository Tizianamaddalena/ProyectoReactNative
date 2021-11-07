import React, { Component } from 'react';
import { View } from 'react-native';
import { auth } from '../firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

const Drawer = createDrawerNavigator();

export default class AuthDrawer extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedin: false, // estado inicial: no estas logueado
      error: ''
    }
  }
  register(email, password,userName){
    auth.createUserWithEmailAndPassword(email, password) //es un metodo de auth
    .then(response => {
      console.log(response);
      response.user.updateProfile({displayName: userName});
      // console.log(userName) 
      this.setState({loggedin: true})
    })
    .catch(error => { //por si hay un error en la cracion del usuario
      console.log(error);
      this.setState({
          loggedin: false,
          error:"Error al registrarse"
        })
    })
  }

  login(email, password){
    auth.signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response);
      this.setState({loggedin: true})
    })
    .catch(error => {
      console.log(error);
      this.setState({
          loggedin: false,
          error:"Error al iniciar sesión"
        })
    })
  }

  render(){
    return(
      <NavigationContainer>
        <Drawer.Navigator>
           {  
               this.state.loggedin // if ternario que te muestra el home unicamente si estas logueado
               ? 
               <React.Fragment>
                    <Drawer.Screen name='Home'>
                        {() => <Home />}  
                    </Drawer.Screen>
                    <Drawer.Screen name='Perfil'>
                        {() => <Profile />}  
                    </Drawer.Screen>
                </React.Fragment>
                :
                <React.Fragment>
                    <Drawer.Screen name="Login" >
                        {() => <Login login={(email,pass)=> this.login(email, pass)}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name="Register">
                        {() => <Register register={(email,pass,userName)=> this.register(email,pass,userName)} />}
                    </Drawer.Screen>
                </React.Fragment>

           }

         

          
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}