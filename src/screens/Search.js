import React, {Component} from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image, FlatList} from 'react-native';
import { db } from '../firebase/config';
import Posts from '../components/Posts';
import { faBold } from "@fortawesome/free-solid-svg-icons";

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            usuarioBuscado: ''
        }
    }


    search(text){
        db.collection("posts")
        .where('username', '==', text)
        .get().then((docs) => { // .get no
            let posts = [];
            docs.forEach (doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
        this.setState({
            posts: posts,
            usuarioBuscado: text
            })
        })  

    }

    


    render(){
        return(
            <View style= {styles.container}>
            


               <Text style={styles.textTitulo}> Buscador de posteos por usuario </Text>


               <TextInput style={styles.buscar} onChangeText = {(text) => this.search(text)}/> 

               { this.state.usuarioBuscado === '' ?
               <Text style={styles.text}>  Ingrese un nombre de usuario </Text>
               : 
                this.state.posts.length > 0 ?
                <FlatList
               data = {this.state.posts}
               keyExtractor = { (item) => item.id.toString()}
               renderItem = { ({item}) => <Posts info={item}/>}
               />
               :
               <Text style={styles.text}> No se encontraron posteos de ese usuario </Text>

               }
               
            
            
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
        borderColor: 'black',
        borderRadius: 30,
        height: 30,
       
    },
    text:{
        fontFamily: 'Avenir',
        color: 'black',
        fontSize: 15,
        marginLeft: 5,
        marginTop: 10,
    },

    textTitulo:{
        fontFamily: 'Avenir',
        color: '#4335B2',
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 5,
        marginTop: 10,
    },

})

export default Search;