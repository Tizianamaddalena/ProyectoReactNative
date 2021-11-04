import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

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
            <View>
                <Text>E-mail</Text>
                <TextInput 
                    onChangeText={text => this.setState({email:text})}
                />
                <Text>Contraseña</Text>
                <TextInput 
                    onChangeText={text => this.setState({password:text})}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress = {() => this.send()}>
                    <Text>Ingresar</Text>
                </TouchableOpacity>
            </View>
        )
    }}

    export default Login; 