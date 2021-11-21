import React, { Component } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity,Modal, TextInput, FlatList} from 'react-native';
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'


export default class Posts extends Component{
    constructor(props){
        super(props);
        this.state = {
            likes: 0,  // cantidad de likes, 
            liked: false, // si yo lo likee o no
            showModal: false,
            comentarios: '',
        }
    }

   //like y unlike 
    componentDidMount(){
        // console.log(this.props.info.data)
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
    like(){
        let corazon = db.collection('posts').doc(this.props.info.id); // este es el id del post 
        corazon.update(  // actualizo la referencia 
            {likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)} // al array que teniamos previamente, le suammos ese mail. 
        )
        .then (
            this.setState({
                liked: true,
                likes: this.state.likes + 1
            },
            console.log('likeado ok'))
        )   
            .catch (e => console.log(e))
            }

    // Metodo pata unlike post 
    unlike(){
        let corazon = db.collection('posts').doc(this.props.info.id); // este es el id del post 
        corazon.update(  // actualizo la referencia 
            {likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)} // al array que teniamos previamente, le removemos ese mail. 
        )
        .then (
            this.setState({
                liked: false,
                likes: this.state.likes - 1
            },
            console.log('deslikeado ok'))
        )   
            .catch (e => console.log(e))
            }
    
    // Para el modal de los comentarios
    openModal(){
        this.setState({
            showModal: true
        })
    }

      // Para el modal de los comentarios
      closeModal(){
        this.setState({
            showModal: false
        })
    }

    // Para comentar
    comentar(){
        let comentario = db.collection('posts').doc(this.props.info.id); // este es el id del post 
        comentario.update(  // actualizo la referencia 
            {comentarios: firebase.firestore.FieldValue.arrayUnion({
                comentario: this.state.comentarios,
                autor: auth.currentUser.email,
            })}  
        )
        .then (
            this.setState({
                comentarios: ''
            },
            console.log('comentado'))
        )   
            .catch (e => console.log(e))
    }

    render(){

    return(
        <View style={styles.container}>
            <Text style={styles.usuario}>@{this.props.info.data.username}</Text>
            <Image source={{uri: this.props.info.data.photo}} style={styles.imagen} /> 
            <Text style={styles.title}  >{this.props.info.data.title}</Text>
            <Text style={styles.titulo} >{this.props.info.data.description}</Text>
            <View>
                {this.state.liked === true ?
                
                <TouchableOpacity onPress={()=>this.unlike()}>
                  <FontAwesomeIcon icon={ faHeart} style={ styles.icon } />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>this.like()}>
                <FontAwesomeIcon icon={ faHeart} style={ styles.iconnegro }/>  
                </TouchableOpacity>
                }

                <Text style={styles.titulo} >Likes: {this.state.likes}</Text>
            </View>
        
            
            
            {
              this.state.showModal  ?
                <Modal
                animationType="slide"
                visible={this.state.showModal} 
                >
                <TouchableOpacity  style={styles.boton}
                 onPress={()=>this.closeModal() }>
                <Text style={styles.titulo}>Ocultar comentarios</Text>
                </TouchableOpacity>

                {/* <Text>prueba</Text>  */}
            <View>
                <TextInput
                style={styles.comentar} 
                multiline = {true}
                numberOfLines = {5}
                onChangeText={text => this.setState({comentarios:text})} 
                />
                
                <TouchableOpacity  style={styles.boton}
                     onPress = {() => this.comentar()}
                     disabled={this.state.comentarios === '' ? true : false } 
                >
                    <Text style={styles.titulo} >Comentar</Text>
                </TouchableOpacity>
                
            </View>
               
                {this.props.info.data.comentarios.length > 0  ? 

                <View style={styles.flatlist}>
                
                <FlatList
                    data = { this.props.info.data.comentarios}
                    keyExtractor = { (item,id) => id.toString()}
                    renderItem = { ({item}) => <Text style={styles.comentario}>{item.autor} - {item.comentario}</Text> }
                />
                </View>

                 :
                <Text style={styles.title} > Aún no hay comentarios. Sé el primero en opinar</Text> 
                 }
                
                </Modal>
            :
                <TouchableOpacity onPress={()=>this.openModal() }>
                <Text style={styles.titulo} >Ver comentarios ({this.props.info.data.comentarios.length})</Text>
                </TouchableOpacity>
            }
            


        </View>
 
 
 )}
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 5,
        backgroundColor: 'white',
        padding: 10,
    },
    imagen: {
        width: 200,
        height: 200
    },
    icon:{
        color: 'red'
    },
    iconnegro: {
        color: 'black'
    },
    flatlist:{
        width:'100%',
        flex:1 
    },
    usuario: {
        fontFamily: 'Avenir',
        color: 'black',
        fontSize: 15,
        fontWeight: 'bold'
    },
    titulo:{
        fontFamily: 'Avenir',
        color: 'black',
        fontSize: 15,
    },
    title:{
        fontFamily: 'Avenir',
        color: 'black',
        fontSize: 15,
        fontStyle: 'italic',
        textAlign: "center",
    },
    comentar:{
        border:'solid 1px',
        margin: 10,
    },
    comentario:{
        padding: 10,
    },
    boton: {
        margin: 7,
        backgroundColor: 'pink',
        borderRadius: 30,
        padding: 2,
        borderStyle: 'solid',
        textAlign: 'center',

    },
})