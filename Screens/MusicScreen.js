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
        marginTop: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
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