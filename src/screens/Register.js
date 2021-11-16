import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            userName: '',
            password: ''
        }
    }

    send(){
        this.props.register(this.state.email,this.state.password,this.state.userName)
    }
 
    render(){
        return(
            <View style= {styles.container}>
                
                <Image style={styles.logo}
                    source= {require('../../assets/logo.png')}
                />
                
                <Text style={styles.cuenta}>Creá una cuenta</Text>
                
                <Text style={styles.titulo}>Nombre de usuario</Text>
                <TextInput
                    style ={styles.input}
                    onChangeText = { (text) => this.setState({userName: text})} 
                />
                
                <Text style={styles.titulo}>E-Mail</Text>
                <TextInput
                    style ={styles.input}
                    keyboardType = 'email-address'
                    onChangeText = { (text) => this.setState({email: text})} 
                />

                <Text style={styles.titulo}> Contraseña </Text>
                <TextInput 
                    style = {styles.input}
                    onChangeText={text => this.setState({password:text})}
                    secureTextEntry={true}
                />

                
                <TouchableOpacity 
                    style = {styles.boton} 
                    onPress = {() => this.send()}>
                    <Text style={styles.send}>Registrarse</Text>
                </TouchableOpacity>

                <Text style = {styles.error} >{this.props.error} </Text> 
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 250,
        marginTop: 15,
    },
    titulo:{
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
        // fontWeight: "bold"
    },
    input: {
        height: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderRadius: 30,
        padding: 5,
        borderStyle: 'solid',
        borderColor: '#ccc',
        margin: 15,
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
    logo: {
        height: 200,
        margin:5,
    },
    error: {
        fontFamily: 'Avenir',
        textAlign: 'center',
        fontWeight: "bold", 
        fontSize: 15,

    },
    cuenta:{
        fontFamily: 'Avenir',
        textAlign: 'center',
        fontWeight: "bold", 
        fontSize: 20,
        padding: 5,
        marginBottom: 15,
        marginTop: 10,
        backgroundColor: 'pink'
    },
})

export default Register;
