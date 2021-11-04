import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

class Register extends Component{
    constructor(){
        super();
        this.state = {
            email : '',
            userName: '',
            password: ''
        }
    }

    enviar(){
        console.log(`El email que se coloco es: ${this.state.email} `);
    }
 
    render(){
        return(
            <View style= {styles.container}>
                
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
                    onPress = {() => this.enviar()}>
                    <Text style={styles.enviar}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 250,
        marginTop: 20
    },
    titulo:{
        fontFamily: 'arial',
        textAlign: 'center',
        color: 'tomato',
        fontSize: '2rem'
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        borderRadius: 6,
        marginVertical:10
    },
    boton: {
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'blue'
    },
    enviar:{
        color: 'white'
    }
})

export default Register;
