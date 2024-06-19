import { useEffect, useState } from 'react';
import { Image, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthorScreen = () => {
	const [authors, setAuthors] = useState([]);
	const [books, setBooks] = useState({});
	const [countries, setCountries] = useState({});
	const [totalItems, setTotalItems] = useState(0);
	const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
		const fetchDataAuthors = async () => {
			try {
				setIsLoading(true);
				const response = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/writers');
				const data = await response.json();
				const totalItems = data['hydra:totalItems'];
				
				setTotalItems(totalItems);
				setAuthors(data['hydra:member'])

				const responseBooks = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/books');
				const booksData = await responseBooks.json();
				const booksMap = booksData['hydra:member'].reduce((acc, book) => {
					acc[book['@id']] = { title: book.title, date: book.releasedYear };
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

				setIsLoading(false);
			} catch (error) {
				console.error('Error fetching authors:', error);
			}
		};
			
		fetchDataAuthors();
	}, [])
		
	const handleBookPress = (bookId) => {
		navigation.navigate('Les livres', { bookId });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.name}>Les auteurs ({totalItems})</Text>
			{isLoading ? (
				<ActivityIndicator size="large" color="red" />
			) : (
				<>
					{authors && authors.length > 0 ? (
						authors.map((author) => (
							<View style={styles.authorsView} key={author.id}>
								<Text style={styles.authorTitle} >{author.firstname} {author.lastname}</Text>
								<Image source={{ uri: author.picture }} style={styles.image} />
								<Text style={styles.authorInfos}>{countries[author.country]}</Text>
								<Text style={styles.authorInfos}>Bibliographie :</Text>
								{books[author.books] && books[author.books].date && (
									<TouchableOpacity onPress={() => handleBookPress(author.books)}>
										<View style={styles.bookLinkContainer}>
											<Text style={styles.authorLinks}>{books[author.books].title}</Text>
											<Text style={styles.authorInfos}> , {books[author.books].date}</Text>
										</View>
									</TouchableOpacity>
								)}
							</View>
						))
					) : (
						<Text>Pas d'auteur enregistré</Text>
					)}
				</>
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
	},
	authorLinks: {
        color: 'red',
        fontSize: 16,
    },
    bookLinkContainer: {
        flexDirection: 'row',
	},
	image: {
		marginBottom: 15,
		height: 200,
        width: 200,
        objectFit: 'contain',
	}
})

export default AuthorScreen;