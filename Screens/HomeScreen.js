import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue dans la mediatek</Text>
            <Image
                style={styles.image}
                source={require('../assets/img/metalBook.png')}
            />
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
      marginTop: 50,
    }
})

export default HomeScreen;