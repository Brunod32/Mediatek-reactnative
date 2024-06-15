import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { StyleSheet} from 'react-native';

const AuthorScreen = () => {
	const [authors, setAuthors] = useState([]);
	const [books, setBooks] = useState({});
	const [countries, setCountries] = useState({});
	const [totalItems, setTotalItems] = useState(0);

useEffect(() => {
		const fetchDataAuthors = async () => {
			try {
				const response = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/writers');
				const data = await response.json();
				const totalItems = data['hydra:totalItems'];
				
				setTotalItems(totalItems);
				setAuthors(data['hydra:member'])

				const responseBooks = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/books');
				const booksData = await responseBooks.json();
				const booksMap = booksData['hydra:member'].reduce((acc, book) => {
					acc[book['@id']] = book.title;
					return acc;
				}, {});
				setBooks(booksMap);
				
				const responseCountries = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/countries');
				const CountriesData = await responseCountries.json();
				const CountriesMap = CountriesData['hydra:member'].reduce((acc, country) => {
					acc[country['@id']] = country.name;
					return acc;
				}, {});
				setCountries(CountriesMap);
			} catch (error) {
				console.error('Error fetching authors:', error);
			}
		};
			
		fetchDataAuthors();
		}, [])

	return (
		<View style={styles.container}>
			<Text style={styles.name}>Les auteurs ({totalItems})</Text>
			{authors && authors.length > 0 ? (
				authors.map((author) => (
					<View style={styles.authorsView} key={author.id}>
						<Text style={styles.authorTitle} >{author.firstname} {author.lastname}</Text>
						<Image source={{ uri: author.picture }} style={{ width: 200, height: 250 }} />
						<Text style={styles.authorInfos}>{countries[author.country]}</Text>
						<Text style={styles.authorInfos}>Bibliographie :</Text>
						<View>
							{author.books.map(bookId => (
								<Text key={bookId} style={styles.authorInfos}>{books[bookId]}</Text>
							))}
						</View>
					</View>
				))
			) : (
				<Text>Pas d'auteur enregistré</Text>
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
  name: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 50,
      marginBottom: 25,
      color: 'red',
  },
  authorsView: {
      flex: 1,
      alignItems: 'center',
  },
  authorTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 15,
      color: 'red',
  },
  authorInfos: {
      color: 'white',
      fontSize: 16,
  }
})

export default AuthorScreen;