import React from "react";
import {View, Text, StyleSheet, Image} from 'react-native';

export default function Posts(props){
    return(
        <View style={styles.container}>
            <Text>{props.info.data.username}</Text>
            <Image source={{uri: props.info.data.photo}} style={styles.imagen} /> 
            <Text>{props.info.data.title}</Text>
            <Text>{props.info.data.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 5
    },
    imagen: {
        width: 200,
        height: 200
    }
})