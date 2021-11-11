import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }
   
    componentDidMount(){
        db.collection("posts")
        .where("email", '==',auth.currentUser.email)
        // (q es lo q quiero q coincida, la parte logica 'igual', a que )
        .orderBy("createdAt", "desc")
        .onSnapshot((docs) => {
            let posts = [];
            docs.forEach((doc) => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                });
            })
            console.log('posts',posts)
            this.setState({
                posts: posts, //igualo mi variable de estado al array que yo cree de posts creados
                loadingHome: false
            })
        })
    }

    render(){
        return(
            <View style={styles.container}>
                    <Text>Usuario: {auth.currentUser.displayName}</Text>
                    <Text>Email: {this.props.user}</Text>
                    
                    <TouchableOpacity onPress={()=> this.props.signOut()}> 
                    {/* //como signOut es una funcion no se pone this */}
                        <Text>Cerrar Sesión </Text>
                    </TouchableOpacity>
        
            </View>
        )}
}

const styles = StyleSheet.create({

})