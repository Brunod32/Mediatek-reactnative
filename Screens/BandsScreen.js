import { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BandsScreen = () => {
    const [bands, setBands] = useState([]);  
    const [totalItems, setTotalItems] = useState(0);  
    const [countries, setCountries] = useState({});
    const [albums, setAlbums] = useState({});
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/bands');
                const data = await response.json();
                const totalItems = data['hydra:totalItems'];
                setTotalItems(totalItems);
                setBands(data['hydra:member']);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };
            
            const fetchCountries = async () => {
                try {
                    const response = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/countries');
                    const data = await response.json();
                    console.log('Countries data:', data);
                    const countriesData = {};

                    if (data && data["hydra:member"]) {
                        data["hydra:member"].forEach(country => {
                        countriesData[country["@id"]] = country.name; // Mappe les pays par URL
                        });
                        setCountries(countriesData);
                    } else {
                        console.error('Error: Unexpected data format');
                    }
                } catch (error) {
                  console.error('Error fetching countries:', error);
                }
            };
            
            const fetchAlbums = async () => {
                try {
                    const response = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/albums');
                    const data = await response.json();
                    const albumsData = {};
                    
                    if (data && data["hydra:member"]) {
                        data["hydra:member"].forEach(album => {
                            albumsData[album["@id"]] = { title: album.title, date: album.releasedYear }; // Permet de récupérer le titre et la date de réalisation de l'album
                        });
                        setAlbums(albumsData);albumsData
                    } else {
                        console.error('Error: Unexpected data format');
                    }
                } catch (error) {
                  console.error('Error fetching albums:', error);
                }
            };
        
            fetchData();
            fetchCountries();
            fetchAlbums();
    }, []);
    
    const handleAlbumPress = (albumId) => {
        navigation.navigate('CDthèque', { albumId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bands ({totalItems}):</Text>
            {bands && bands.length > 0 ? (
                bands.map((band) => (
                    <View style={styles.bandsView} key={band.id}>
                        <Text style={styles.bandName}>{band.name}</Text>
                        <Image source={{ uri: band.picture }} style={{ width: 200, height: 100 }} />
                        <Text style={[styles.bandInfos, {textTransform: 'capitalize'}]}>{band.kindOfMetal}</Text>
                        <Text style={styles.bandInfos} >{countries[band.country]}, {band.creationYear}</Text>
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
