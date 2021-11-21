import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native';
import { db } from '../firebase/config';
import Posts from '../components/Posts';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loadingPosts: true,
            usuarioBuscado: ""
        }
    }


    search(text){
        db.collection("posts")
        .where('username', '==', text)
        .orderBy("createdAt", "desc")
        .onSnapshot((docs) => {
            let posts = [];
            docs.forEach (doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
        this.setState({
            posts: posts,
            loading: false
            })
        })

    }

    render(){
        return(
            <View style= {styles.container}>
               <Text style={styles.text}> Escriba un nombre de usuario: </Text>
               <TextInput style={styles.buscar} onChangeText = {(text) => this.search(text)}/> 

               <FlatList
               data = {this.state.posts}
               keyExtractor = { (item) => item.id.toString()}
               renderItem = { ({item}) => <Posts info={item}/>}
               />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: "center",
    },
    buscar:{
        border:'solid 1px',
        margin: 10,
        padding: 5,
        fontFamily: 'Avenir',
        color: 'black',
        fontSize: 15,
    },
    text:{
        fontFamily: 'Avenir',
        color: 'black',
        fontSize: 15,
        marginLeft: 5,
        marginTop: 10,
    },

})

export default Search;