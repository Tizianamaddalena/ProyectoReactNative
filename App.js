import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthDrawer from './src/components/AuthDrawer';


export default function App() {
  return (
      
      < AuthDrawer style={styles.container}/>
      
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
