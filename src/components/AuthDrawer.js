import React, { Component } from 'react';
import { View } from 'react-native';
import { auth } from '../firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import CreatePost from '../screens/CreatePost';

const Drawer = createDrawerNavigator();

export default class AuthDrawer extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedin: false, // estado inicial: no estas logueado
      error: '',
      user: ''
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => { // recibe un callback (funcion como parametro)
      if(user) {
        this.setState({
          loggedin: true,
          user: user.email,
        })
      
      }else{
        this.setState({
          loggedin: false, 
        })

      }
    }) 
  }

  register(email, password, userName){
    auth.createUserWithEmailAndPassword(email, password) //es un metodo de auth
    .then(response => {
      response.user.updateProfile({
        displayName: userName
      })    
     
      this.setState({
        loggedin: true,
        user: response.user.email,
        error: ''
      })
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
      this.setState({
        loggedin: true,
        user:response.user.email,
        error: ''
      })
    })
    .catch(error => {
      console.log(error);
      this.setState({
          loggedin: false,
          error:"Error al iniciar sesión"
        })
    })
  }

  signOut(){
    auth.signOut()
    .then(response => {
      this.setState({
        loggedin: false,
        user: '',
      })
    })
    .catch(error => {

    }) 
  }

  render(){
    return(
      <NavigationContainer>
        <Drawer.Navigator> 
           {  
               this.state.loggedin // if ternario que te muestra el home unicamente si estas logueado y el drawer post vienen del drawer navigator
               ? 
               <React.Fragment>
                    <Drawer.Screen name='Home'>
                        {() => <Home />}  
                    </Drawer.Screen>
                    <Drawer.Screen name='Perfil'>
                        {() => <Profile user={this.state.user} signOut={() => this.signOut()}/>}  
                    </Drawer.Screen>
                    <Drawer.Screen name='Crear Posteo'> 
                    {(drawerProps) => <CreatePost drawerProps={drawerProps} /> } 
                    </Drawer.Screen> 
                </React.Fragment>
                :
                <React.Fragment>
                    <Drawer.Screen name="Login" >
                        {() => <Login login={(email,pass)=> this.login(email, pass)} error={this.state.error}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name="Register">
                        {() => <Register register={(email,pass,userName)=> this.register(email,pass,userName)} error={this.state.error} />}
                    </Drawer.Screen>
                </React.Fragment>

           }

         

          
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }
}