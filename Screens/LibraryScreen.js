import { Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const BooksScreen = () => {
    const navigation = useNavigation();

    const handleAuthorPress = () => {
        navigation.navigate('AuthorScreen');
    };

    const handleBooksPress = () => {
        navigation.navigate('BooksScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bibliothèque</Text>

            <TouchableOpacity onPress={handleAuthorPress}>
                <Image source={require('../assets/img/writer.webp')} style={styles.image}/>
            </TouchableOpacity>
            <TouchableOpacity  onPress={handleBooksPress}>
                <Image source={require('../assets/img/book.webp')} style={styles.image}/>
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
        marginTop: 50
    }
})

export default BooksScreen;