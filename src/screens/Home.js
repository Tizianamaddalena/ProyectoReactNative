import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList,ActivityIndicator} from 'react-native';
// import Contador  from '../components/Contador';

let familia = [
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
]

class Home extends Component{
    constructor(){
        super();
        this.state ={

        }
    }
    saludar(){
        return alert('me clickearon');
    }
    render(){
        return(
            <View>
                <ActivityIndicator  size= 'large' color= 'teal'/>
                <Text style={styles.titulo} >Hola Mundo!!!</Text>
                <Image   style= {styles.imagen} 
                    source = {{uri : 'https://picsum.photos/1080/960'}}
                    resizeMode = {'cover'}
                />
                <TouchableOpacity onPress = {() => this.saludar()}>
                    <Text>Clickeame</Text>
                </TouchableOpacity>
                {/* <Contador /> */}
                <FlatList 
                    data = {familia }
                    keyExtractor = { familia => familia.id.toString()}
                    renderItem = { ({item}) => <Text>{ item.nombre}</Text>}
                />

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

