import React, { Component } from "react";
import {View, Text, StyleSheet, Touchable, TouchableOpacity, Image} from 'react-native';
import {Camera, requestMicrophonePermissionsAsync } from 'expo-camera'
import { storage } from "../firebase/config";

export default class MyCamera extends Component{
    constructor(props){
        super(props);
        this.state ={
            permission: false,
            photo: '',

        }
        this.camera; // sacandolo del estado evitamos el bucle infinito
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync() // camera hace ref al q importas
        .then(()=> {
            this.setState({
                permission: true
            })
        }) 
        .catch(()=> {
            this.setState({
                permission: false
            })
        })
    }

    takePhoto(){
        this.camera.takePictureAsync()
        .then((photo)=> {
            this.setState({
                photo: photo.uri
            })
        })
     }

     onRejetct(){
         this.setState({
             photo:''
         })
     }

     onAcept(){
        fetch(this.state.photo)
        .then((response) => response.blob())
        .then((image) => {
            const storageRef = storage.ref("camera/"+Date.now()) 
            // creo una variable donde se va a guardar la imagen, creo una referencia
            // en este contenedor "camera/"+Date.now va a ser unico x el date 
            storageRef.put(image)
            //y le digo ahi pone este contenido
            .then(()=> {
                storageRef.getDownloadURL() //esto me devuelve la url publica de la imagen 
                .then((url) => {
                    this.props.onPhotoUpload(url); // una vez q ya tengo todo, le paso el link publico q se genero
                })
            })
        })
     }

    render(){

        if(this.state.permission === false) return <Text>No hay permisos</Text>

        return(
            <React.Fragment>
                {
                    this.state.photo ?
                    <React.Fragment> 
                        <Image source={{uri: this.state.photo}} style={styles.preview}/>
                        <View style={styles.btnContainer}> 
                            <TouchableOpacity onPress={()=> this.onAcept()}>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> this.onRejetct()}>
                                <Text>Rechazar</Text>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment> 

                    :

                    <React.Fragment>
                        <Camera
                            style={styles.camera}
                            type={Camera.Constants.Type.front}
                            ref={reference => this.camera = reference}
                        />
                        <TouchableOpacity   onPress ={()=> this.takePhoto()} >
                          <Text>Sacar foto</Text>
                        </TouchableOpacity>  
                    </React.Fragment> 
                }
                
            </React.Fragment>
        )
    }
}

const styles = StyleSheet.create({
    camera: {
        flex:1,
        width: "100%"
    },
    preview: {
        flex:6,
        width: "100%"
    },
    btnContainer: {
        flex: 1
    }
})