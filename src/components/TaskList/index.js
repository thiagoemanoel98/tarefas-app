import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TaskList( {data, deleteItem, editItem} ){
    return(
        <View style = {styles.container}>
            <TouchableOpacity style = {{ marginRight: 10 }} onPress = { () => deleteItem(data.key) }>
                <MaterialIcons name="delete-outline" color = "#FFF" size={24} />
            </TouchableOpacity>

            <View style = {{ paddingRight: 10 }}>
                <TouchableOpacity onPress={ () => editItem(data)}>
                    <Text style = {{color: '#FFF', paddingRight: 10}}>{data.name}</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#121212',
        marginBottom: 10,
        padding: 10,
        borderRadius: 4
    }
}) 