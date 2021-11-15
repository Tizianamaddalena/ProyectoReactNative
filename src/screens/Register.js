import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

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
                <Text>{this.props.error}</Text>
                
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
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 250,
        marginTop: 150,
    },
    titulo:{
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
        fontWeight: "bold"
    },
    input: {
        height: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderStyle: 'solid',
        borderColor: '#ccc',
        margin: 20,
    },
    boton: {
        margin: 20,
        fontFamily: 'Avenir',
        fontSize: 16,
        backgroundColor: 'pink',
        borderRadius: 5,
        padding: 5,
        borderStyle: 'solid'
    },
    send:{
        color: 'black',
        fontFamily: 'Avenir',
        textAlign: 'center',
        fontWeight: "bold"
    }
})

export default Register;
