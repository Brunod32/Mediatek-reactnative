import { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BandsScreen = () => {
    const [bands, setBands] = useState([]);  
    const [totalItems, setTotalItems] = useState(0);  
    const [countries, setCountries] = useState({});
    const [albums, setAlbums] = useState({});
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [bandsResponse, countriesResponse, albumsResponse] = await Promise.all([
                    fetch('https://mediatek-c59c683546ca.herokuapp.com/api/bands'),
                    fetch('https://mediatek-c59c683546ca.herokuapp.com/api/countries'),
                    fetch('https://mediatek-c59c683546ca.herokuapp.com/api/albums')
                ]);

                const bandsData = await bandsResponse.json();
                const countriesData = await countriesResponse.json();
                const albumsData = await albumsResponse.json();

                // Traiter les données des groupes
                const totalItems = bandsData['hydra:totalItems'];
                setTotalItems(totalItems);
                setBands(bandsData['hydra:member']);

                // Traiter les données des pays
                const countriesMap = countriesData['hydra:member'].reduce((acc, country) => {
                    acc[country["@id"]] = country.name;
                    return acc;
                }, {});
                setCountries(countriesMap);

                // Traiter les données des albums
                const albumsMap = albumsData['hydra:member'].reduce((acc, album) => {
                    acc[album["@id"]] = { title: album.title, date: album.releasedYear };
                    return acc;
                }, {});
                setAlbums(albumsMap);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    
    const handleAlbumPress = (albumId) => {
        navigation.navigate('CDthèque', { albumId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Les groupes ({totalItems}):</Text>
            {isLoading ? (
                <ActivityIndicator size="large" color="red" />
            ) : (
                bands && bands.length > 0 ? (
                    bands.map((band) => (
                        <View style={styles.bandsView} key={band.id}>
                            <Text style={styles.bandName}>{band.name}</Text>
                            <Image source={{ uri: band.picture }} style={{ width: 200, height: 100 }} />
                            <Text style={[styles.bandInfos, {textTransform: 'capitalize'}]}>{band.kindOfMetal}</Text>
                            <Text style={styles.bandInfos}>{countries[band.country]}, {band.creationYear}</Text>
                            <Text style={styles.bandInfos}>Discographie :</Text>
                            {albums[band.albums] && albums[band.albums].date && (
                                <TouchableOpacity onPress={() => handleAlbumPress(band.albums)}>
                                    <View style={styles.albumLinkContainer}>
                                        <Text style={styles.bandLinks}>{albums[band.albums].title}</Text>
                                        <Text style={styles.bandInfos}>, {albums[band.albums].date}</Text>   
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))
                ) : (
                    <Text>No bands found</Text>
                )
            )}
        </View>
    );
};

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
    bandsView: {
        flex: 1,
        alignItems: 'center',
    },
    bandName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'red',
    },
    bandInfos: {
        color: 'white',
        fontSize: 16,
    },
    bandLinks: {
        color: 'red',
        fontSize: 16,
    },
    albumLinkContainer: {
        flexDirection: 'row',
    }
});

export default BandsScreen;