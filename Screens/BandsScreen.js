import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleSheet} from 'react-native';

const BandsScreen = () => {
  const [bands, setBands] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/bands');
        const data = await response.json().then(data => { return data["hydra:member"] });
        setBands(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Les groupes:</Text>
      {bands && bands.length > 0 ? (
        bands.map((band, index) => (
          <>
              <Image source={band.picture} />
              <Text key={index}>{band.name}</Text>
              <Text key={index}>{band.kindOfMetal}</Text>
              <Text key={index}>{band.creationYear}</Text>
              <Text key={index}>{band.country}</Text>
              <Text key={index}>{band.albums}</Text>
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
    marginTop: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default BandsScreen;
