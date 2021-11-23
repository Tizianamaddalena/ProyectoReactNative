import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
        }
    }


    send(){
        this.props.login(this.state.email,this.state.password)
    }
 

    render(){
        return(
            <View style={styles.container} >
                
                <Image style={styles.logo}
                    source= {require('../../assets/logo.png')}
                />
                <Text style={styles.bienvenido}>Bienvenido</Text>
                <Text style={styles.titulo}>E-mail</Text>
                <TextInput  style ={styles.input}
                    onChangeText={text => this.setState({email:text})}
                />
                <Text style={styles.titulo} >Contraseña</Text>
                <TextInput  style ={styles.input}
                    onChangeText={text => this.setState({password:text})}
                    secureTextEntry={true}
                />
                <TouchableOpacity style = {styles.boton} 
                    onPress = {() => this.send()}
                    disabled={this.state.email === '' ? true : false || this.state.password === '' ? true : false} 
                    >
                    <Text style = {styles.send} >Ingresar</Text>
                </TouchableOpacity>

                <Text style = {styles.error} >{this.props.error}</Text>
            </View>
        )
    }}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 15,
            width: '100%',
            backgroundColor: 'white',
        },
        titulo:{
            fontFamily: 'Avenir',
            textAlign: 'center',
            fontWeight: "bold",
            color: 'black',
            fontSize: 15,
            marginTop: 10,
        },
        logo: {
            height: 225,
            margin:5,
        },
        input: {
            height: 20,
            paddingVertical: 15,
            borderWidth: 1,
            //borderRadius: 30,
            padding: 5,
            borderStyle:'solid',
            borderColor: 'black',
            margin: 5,
            fontFamily: 'Avenir',
        },
        boton: {
            margin: 15,
            fontFamily: 'Avenir',
            fontSize: 15,
            backgroundColor: 'pink',
            borderRadius: 30,
            padding: 5,
            borderStyle: 'solid'
        },
        send:{
            color: 'black',
            fontFamily: 'Avenir',
            textAlign: 'center',
            fontWeight: "bold"
        },
        bienvenido:{
            fontFamily: 'Avenir',
            textAlign: 'center',
            fontWeight: "bold", 
            fontSize: 20,
            padding: 5,
            marginBottom: 10,
            marginTop: 10,
            backgroundColor: 'pink'
        },
        error: {
            fontFamily: 'Avenir',
            textAlign: 'center',
            fontWeight: "bold", 
            fontSize: 15,
    
        },
    })

    export default Login; 