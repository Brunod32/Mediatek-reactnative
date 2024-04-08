import { Text, View } from 'react-native';
import { StyleSheet} from 'react-native';

const AlbumsScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Les albums</Text>
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
    }
})

export default AlbumsScreen;