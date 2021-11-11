import React, { Component } from "react";
import {View, Text, StyleSheet, Image} from 'react-native';
import { auth, db } from "../firebase/config";
import firebase from "firebase";

export default class Posts extends Component{
    constructor(props){
        super(props);
        this.state = {
            likes: 0,
            liked: false
        }
    }

   //like y unlike 
    componentDidMount(){
        if(this.props.info.data.likes){
            let likes = this.props.info.data.likes.length;
            this.setState({
                likes: likes // igualo mi variable al array de likes que cree como estado
            })
            if (this.props.info.data.likes.includes(auth.currentUser.email)){
                this.setState({
                    liked: true,
                })
            }
        }

    }

    // Metodo para likear post 

    // Metodo pata unlike post 

    render(){

    return(
        <View style={styles.container}>
            <Text>{this.props.info.data.username}</Text>
            <Image source={{uri: this.props.info.data.photo}} style={styles.imagen} /> 
            <Text>{this.props.info.data.title}</Text>
            <Text>{this.props.info.data.description}</Text>
        </View>
 
 
 )}
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 5
    },
    imagen: {
        width: 200,
        height: 200
    }
})