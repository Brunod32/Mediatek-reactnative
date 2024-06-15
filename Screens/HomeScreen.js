import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue dans la mediatek</Text>
            <Image
                style={styles.image}
                source={require('../assets/img/metalBook.jpg')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: '#3c4043',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
    },
    image: {
      marginTop: 50,
    }
})

export default HomeScreen;