import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';


const BooksScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bibliothèque</Text>
        <Image source={require('../assets/img/writer.webp')} style={styles.image}/>
        <Image source={require('../assets/img/book.webp')} style={styles.image}/>
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
        marginTop: 50
    }
})

export default BooksScreen;