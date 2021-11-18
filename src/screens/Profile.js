import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser} from '@fortawesome/free-solid-svg-icons'
import Posts from '../components/Posts';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {posts: []}
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

    borrar(id){
        let posteo = db.collection('posts').doc(id); // este es el id del post 
        posteo.delete()
        // filtrar posts siempre y cuando el id sea distinto al id que recorro en el filter 
        //y dsps un setState, el filter nos devuelve un array q lo tenemos q guardar, y eso es lo q vamos a posts: filterPost
    }

    render(){
        return(
            <View style={styles.container}>
                    <FontAwesomeIcon icon={ faUser} size={70} style={styles.icon}/> 
                    <Text style={styles.text}>Usuario </Text> <Text style={styles.dato}>{auth.currentUser.displayName}</Text>
                    <Text style={styles.text}>Email</Text>  <Text style={styles.dato}>{this.props.user}</Text>
                    <Text style={styles.text}>Última conexión</Text> <Text style={styles.dato}> {auth.currentUser.metadata.lastSignInTime} </Text>
                    <Text style={styles.text}>Cuenta creada el</Text> <Text style={styles.dato}> {auth.currentUser.metadata.creationTime} </Text>

                    <TouchableOpacity onPress={()=> this.props.signOut()}> 
                    {/* //como signOut es una funcion no se pone this */}
                        <Text style={styles.logout}>Cerrar Sesión </Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>Mis Posteos:</Text>

                    <FlatList 
                    data = {this.state.posts}
                    keyExtractor = { (item) => item.id.toString()}
                    renderItem = { ({item}) => <ProfilePosts info={item} borrar={(id)=> this.borrar(id)} />} 
                    
                    />

{/* postProfile */}
        
            </View>
        )}
}

const styles = StyleSheet.create({
    container: {
       padding: 15,
       alignItems: 'center',
       flex: 1,
        paddingTop: 15,
        width: '100%',
        backgroundColor: 'white',
       
    },
    icon: {
       marginBottom: 10,
    },
    text:{
        fontSize: 16,
        fontFamily: 'Avenir',
        fontWeight: 'bold',
        padding: 2,
        marginTop: 6,
    },
    dato:{
        fontSize: 16,
        fontFamily: 'Avenir',
        padding: 2,
    },

    logout:{
        margin: 20,
        fontFamily: 'Avenir',
        fontSize: 16,
        backgroundColor: 'pink',
        borderRadius: 5,
        padding: 5,
        borderStyle: 'solid',
        fontWeight: 'bold'
    }

})