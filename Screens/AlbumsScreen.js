import { useEffect, useState } from 'react';
import { Image , Text, View } from 'react-native';
import { StyleSheet} from 'react-native';

const AlbumsScreen = () => {
	const [albums, setAlbums] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [bands, setBands] = useState({});

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Les albums ({totalItems})</Text>
			{albums && albums.length > 0 ? (
                albums.map((album) => (
                    <View style={styles.albumsView} key={album.id}>
                        <Text style={styles.albumTitle} >{album.title}</Text>
                        <Image source={{ uri: album.albumCover }} style={{ width: 200, height: 100 }} />
                        <Text style={[styles.albumInfos]}>{album.releasedYear}</Text>
                        <Text style={styles.albumInfos}>{bands[album.band]}</Text>
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
    }
})

export default AlbumsScreen;