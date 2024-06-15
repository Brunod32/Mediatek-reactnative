import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleSheet} from 'react-native';

const BandsScreen = () => {
    const [bands, setBands] = useState([]);  
    const [totalItems, setTotalItems] = useState(0);  
    const [countries, setCountries] = useState({});
    const [albums, setAlbums] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/bands');
                const data = await response.json();
                const totalItems = data['hydra:totalItems'];
                setTotalItems(totalItems);
                setBands(data['hydra:member']);
                // console.log(data);
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
                        console.log('Mapped countries:', countriesData);
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
                        console.log('Mapped albums:', albumsData);
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bands ({totalItems}):</Text>
            {bands && bands.length > 0 ? (
                bands.map((band) => (
                    <>
                        <View style={styles.bandsView}>
                            <Text style={styles.bandName} key={band.id}>{band.name}</Text>
                            <Image source={{ uri: band.picture }} style={{ width: 200, height: 100 }} />
                            <Text style={[styles.bandInfos, {textTransform: 'capitalize'}]} key={band.id}>{band.kindOfMetal}</Text>
                            <Text style={styles.bandInfos} key={band.id}>{countries[band.country]}, {band.creationYear}</Text>
                            <Text style={styles.bandInfos} key={band.id}>Discographie :</Text>
                            {albums[band.albums] && albums[band.albums].date && (
                                <Text style={styles.bandInfos} key={band.id}>
                                    {albums[band.albums].title}, {albums[band.albums].date}
                                </Text>
                            )}
                        </View>
                    </>
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
    }
});

export default BandsScreen;
