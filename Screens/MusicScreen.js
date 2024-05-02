import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';

const MusicScreen = () => {
    return (
      <View style={styles.container}>
            <Text style={styles.title}>Musique</Text>
            <Image source={require('../assets/img/guitar.webp')} style={styles.image}/>
            <Image source={require('../assets/img/cd.png')} style={styles.image}/>
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