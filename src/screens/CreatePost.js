import React, {Component} from "react";
import {Stylesheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import { db, auth } from "../firebase/config";

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: ""
        }
    }

    createPost(){
        db.collection("posts").add({
            title: this.state.title,
            description: this.state.description,
            createdAt: Date.now(),
            username: auth.currentUser.displayName, // con el displayName acceso al nombre de mi usuario
        })
        .then(response => {
            this.setState({
                title:"",
                description:""
            });
            
        })
        .catch(error => {
            console.log(error)
        })
    }

    render(){
        return(
            <View>
                <Text> Titulo </Text>
                <TextInput onChangeText={text => this.setState({title:text})} />

                <Text> Descripción </Text>
                <TextInput 
                multiline = {true}
                numberOfLines = {4}
                onChangeText={text => this.setState({title:text})} 
                />
                
                <TouchableOpacity
                    onPress = {() => this.createPost()}
                >
                    <Text>Crear Posteo</Text>
                </TouchableOpacity>
                
            </View>
        )
    
    }}

