import React from "react";
import {View, Text, StyleSheet} from 'react-native';

export default function Posts(props){
    return(
        <View style={styles.container}>
            <Text>{props.info.data.username}</Text>
            <Text>{props.info.data.title}</Text>
            <Text>{props.info.data.description}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 5
    }
})