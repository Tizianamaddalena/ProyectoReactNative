import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../firebase/config';

export default function Profile(props){
    return(
        <View style={styles.container}>
            <Text>Usuario</Text>
            <Text>{auth.currentUser.displayName}</Text>

            <Text>Email</Text>
            <Text>{props.user}</Text>


            <TouchableOpacity onPress={()=> props.signOut()} //como signOut es una funcion no se pone this
            >
                <Text> Cerrar Sesión </Text>
            </TouchableOpacity>


        </View>
    )
}

const styles = StyleSheet.create({

})