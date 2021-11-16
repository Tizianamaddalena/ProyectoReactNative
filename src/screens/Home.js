import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator} from 'react-native';

import { db } from '../firebase/config';
import Posts from '../components/Posts';


class Home extends Component{
    constructor(){
        super();
        this.state ={
            posts: [],
            loadingHome: true
        }
    }

    componentDidMount(){
        db.collection("posts").orderBy("createdAt", "desc").onSnapshot((docs) => {
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

            <View>
                {
                    this.state.loadingHome ?
                    // si es true
                    <ActivityIndicator color={'pink'} size={'large'} /> // revisar si podemos agregar un condicional para cuando no hay peliculas 

                    :
                    // si es false
                    <FlatList 
                    data = {this.state.posts}
                    keyExtractor = { (item) => item.id.toString()}
                    renderItem = { ({item}) => <Posts info={item}/>} // recibe una funcion, info es una propiedad
                />

                }


            </View>
        )
    }

}
const styles = StyleSheet.create({

    imagen:  {
        height: 400,
        alignContent: 'center'
     }
})

export default Home;

