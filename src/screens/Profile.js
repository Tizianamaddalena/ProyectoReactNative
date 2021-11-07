import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Profile(props){
    return(
        <View style={styles.container}>
            <Text>Perfil</Text>
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