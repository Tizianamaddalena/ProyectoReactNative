import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'

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
                    <FontAwesomeIcon icon={ faUser} size={70} style={styles.icon}/> 
                    <Text style={styles.text}>Usuario: {auth.currentUser.displayName}</Text>
                    <Text style={styles.text}>Email: {this.props.user}</Text>
                    <Text style={styles.text}>Última conexión: </Text>
                    
                    <TouchableOpacity onPress={()=> this.props.signOut()}> 
                    {/* //como signOut es una funcion no se pone this */}
                        <Text style={styles.logout}>Cerrar Sesión </Text>
                    </TouchableOpacity>
        
            </View>
        )}
}

const styles = StyleSheet.create({
    container: {
       padding: 15,
       alignItems: 'center',
       
    },
    icon: {
       marginBottom: 10,
    },
    text:{
        fontSize: 16,
        fontFamily: 'Avenir',
        padding: 5,
    },

    logout:{
        margin: 30,
        fontFamily: 'Avenir',
        fontSize: 16,
        backgroundColor: 'pink',
        borderRadius: 5,
        padding: 5,
        borderStyle: 'solid',
        fontWeight: 'bold'
    }

})