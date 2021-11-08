import React, {Component} from "react";
import {Stylesheet, View, Text, TouchableOpacity, TextInput} from "react-native";
import { db, auth } from "../firebase/config";
import MyCamera from "../components/MyCamera";

export default class CreatePost extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            photo: '',
            showCamera: true,
          
        }
    }

    createPost(){
        db.collection("posts").add({
            title: this.state.title,
            description: this.state.description,
            createdAt: Date.now(),
            likes: [],
            username: auth.currentUser.displayName, // con el displayName acceso al nombre de mi usuario
            photo: this.state.photo,


        })
        .then(response => {
            this.setState({
                title:"",
                description:"",
               
            });
            this.props.drawerProps.navigation.navigate("Home"); // va a navegar a la screen que yo quiero 
        })
        .catch(error => {
            console.log(error)
        })
    }
    
    onPhotoUpload(url){ //creo funcion q recibe como parametro url
        this.setState({
            photo: url,
            showCamera: false,
        })
    }

    render(){
        return(
            <React.Fragment>
            { this.state.showCamera? 
                <MyCamera onPhotoUpload={(url) => this.onPhotoUpload(url)} // le pasamos como prop la url a My Camera
                />
                :

            <View>
                <Text> Titulo </Text>
                <TextInput onChangeText={text => this.setState({title:text})} />

                <Text> Descripción </Text>
                <TextInput 
                multiline = {true}
                numberOfLines = {4}
                onChangeText={text => this.setState({description:text})} 
                />
                
                <TouchableOpacity
                    onPress = {() => this.createPost()}
                >
                    <Text>Crear Posteo</Text>
                </TouchableOpacity>
                
            </View>
        }
        </React.Fragment>
        )
    
    }}

