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
               <Text> Escriba un nombre de usuario: </Text>
               <TextInput onChangeText = {(text) => this.search(text)}/> 

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
    }

})

export default Search;