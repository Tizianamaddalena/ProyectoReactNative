import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator} from 'react-native';
// import Contador  from '../components/Contador';
import { db } from '../firebase/config';
import Posts from '../components/Posts';

/*let familia = [
    {
        id : 1,
        nombre: 'Gloria'
    },
    {
        id : 2,
        nombre: 'Indira'
    },
    {
        id : 3,
        nombre: 'Victor'
    },
    {
        id : 4,
        nombre: 'Luis'
    }
] */

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
            this.setState({
                posts: posts, //igualo mi variable de estado al array que yo cree de posts creados
                loadingHome: false
            })

        })

    }

   /* saludar(){
        return alert('me clickearon');
    } */

    render(){
        return(
            /*
                <ActivityIndicator  size= 'large' color= 'teal'/>
                <Text style={styles.titulo} >Hola Mundo!!!</Text>
                <Image   style= {styles.imagen} 
                    source = {{uri : 'https://picsum.photos/1080/960'}}
                    resizeMode = {'cover'}
                />
                <TouchableOpacity onPress = {() => this.saludar()}>
                    <Text>Clickeame</Text>
                </TouchableOpacity> 
                {/* <Contador />} */

            <View>
                {
                    this.state.loadingHome ?
                    // si es true
                    <ActivityIndicator color={'lightblue'} size={'large'} /> // revisar si podemos agregar un condicional para cuando no hay peliculas 

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
    titulo : {
        fontFamily : 'Arial',
        textAlign: 'center',
        color: 'white',
        backgroundColor : 'teal',
        fontSize : '2.5rem',
        padding: 4 
    },
    imagen:  {height: 400 }
})

export default Home;

