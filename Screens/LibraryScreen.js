import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const BooksScreen = () => {
    const navigation = useNavigation();

    const handleAuthorPress = () => {
        navigation.navigate('Les auteurs');
    };

    const handleBooksPress = () => {
        navigation.navigate('Les livres');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bibliothèque</Text>

            <TouchableOpacity onPress={handleAuthorPress}>
                <Image source={require('../assets/img/writer.webp')} style={styles.imageWriter}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={handleBooksPress}>
                <Image source={require('../assets/img/book.webp')} style={styles.imageBook}/>
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
    },
    imageWriter: {
        height: 200,
        width: 200,
        objectFit: 'contain',
        marginTop: 50,
        backgroundColor: '#cacaca',
        borderRadius: 25,
    },
    imageBook: {
        height: 200,
        width: 200,
        objectFit: 'contain',
        marginTop: 50,
    },
})

export default BooksScreen;