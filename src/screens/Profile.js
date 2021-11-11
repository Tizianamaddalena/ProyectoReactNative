import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { auth, db } from '../firebase/config';

export default function Profile(props){
    return(
        <View style={styles.container}>
            <Text>Usuario: {auth.currentUser.displayName}</Text>
            <Text>Email: {props.user}</Text>
            
            <TouchableOpacity onPress={()=> props.signOut()}> 
            {/* //como signOut es una funcion no se pone this */}
                <Text>Cerrar Sesión </Text>
            </TouchableOpacity>

            {/* <FlatList> */}
                {/* data = {db.collection('post')orderBy("createdAt", "desc").onSnapshot((docs) =>} */}
                {/* keyExtractor = {} */}
                {/* renderItem = {} */}
            {/* </FlatList> */}


        </View>
    )
}

const styles = StyleSheet.create({

})