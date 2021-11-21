import React, {Component} from "react";
import {StyleSheet, View, Text, TouchableOpacity, TextInput} from "react-native";
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
            createdAt: new Date(),
            likes: [],
            comentarios: [], 
            username: auth.currentUser.displayName, // con el displayName acceso al nombre de mi usuario
            email: auth.currentUser.email, // sirve como identiicador unico
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

            <View style={styles.container}>
                <Text style={styles.titulo}> Titulo </Text>
                <TextInput  style = {styles.input} onChangeText={text => this.setState({title:text})} />

                <Text style={styles.titulo} > Descripción </Text>
                <TextInput 
                style = {styles.input}
                multiline = {true}
                numberOfLines = {4}
                onChangeText={text => this.setState({description:text})} 
                />
                
                <TouchableOpacity
                    style = {styles.boton} 
                    onPress = {() => this.createPost()}
                >
                    <Text style={styles.send}>Crear Posteo</Text>
                </TouchableOpacity>
                
            </View>
        }
        </React.Fragment>
        )
    
    }}

    const styles = StyleSheet.create({
    titulo:{
        fontFamily: 'Avenir',
        textAlign: 'center',
        color: 'black',
        fontSize: 15,
    },
    container:{
        backgroundColor:'white',
        width:'100%',
        flex: 1,
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
        marginTop: 24,
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
})