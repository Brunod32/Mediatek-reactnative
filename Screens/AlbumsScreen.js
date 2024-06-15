import { useEffect, useState } from 'react';
import { Image , Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AlbumsScreen = () => {
	const [albums, setAlbums] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [bands, setBands] = useState({});
    const navigation = useNavigation();

	useEffect(() => {
        const fetchDataAlbums = async () => {
            try {
				const response = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/albums');
                const data = await response.json();
                const totalItems = data['hydra:totalItems'];
                
                setTotalItems(totalItems);
                setAlbums(data['hydra:member'])

                const responseBands = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/bands');
                const bandsData = await responseBands.json();
                const bandsMap = bandsData['hydra:member'].reduce((acc, band) => {
                    acc[band['@id']] = band.name;
                    return acc;
                }, {});
                setBands(bandsMap);

				
			} catch (error) {
			  console.error('Error fetching albums:', error);
			}
        };
            
        fetchDataAlbums();
    }, [])
    
    const handleBandPress = (bandId) => {
        navigation.navigate('Les groupes', { bandId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Les albums ({totalItems})</Text>
			{albums && albums.length > 0 ? (
                albums.map((album) => (
                    <View style={styles.albumsView} key={album.id}>
                        <Text style={styles.albumTitle} >{album.title}</Text>
                        <Image source={{ uri: album.albumCover }} style={styles.image} />
                        <Text style={[styles.albumInfos]}>{album.releasedYear}</Text>
                        <TouchableOpacity onPress={() => handleBandPress(album.band)}>
                            <Text style={styles.albumLinks}>{bands[album.band]}</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <Text>Pas d'album enregistré</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#3c4043',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 25,
        color: 'red',
    },
    albumsView: {
        flex: 1,
        alignItems: 'center',
    },
    albumTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'red',
    },
    albumInfos: {
        color: 'white',
        fontSize: 16,
        marginTop: 15,
    },
    albumLinks: {
        color: 'red',
        fontSize: 16,
    },
	image: {
		marginBottom: 15,
		height: 200,
        width: 200,
        objectFit: 'contain',
	}
})

export default AlbumsScreen;