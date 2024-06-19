import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MusicScreen = () => {
    const navigation = useNavigation();

    const handleGuitarPress = () => {
        navigation.navigate('Les groupes');
    };

    const handleAlbumsPress = () => {
        navigation.navigate('CDthèque');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Musique</Text>
            <TouchableOpacity onPress={handleGuitarPress}>
                <Image source={require('../assets/img/guitar.webp')} style={styles.image}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={handleAlbumsPress}>
                <Image source={require('../assets/img/cd.png')} style={styles.image}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 50,
        backgroundColor: '#3c4043',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'red'
    },
    image: {
        height: 200,
        width: 200,
        objectFit: 'contain',
        marginTop: 50,
        transform: [{ rotate: '45deg'}]
    }
})

export default MusicScreen;