import { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BooksScreen = () => {
	const [books, setBooks] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [authors, setAuthors] = useState({});
	const navigation = useNavigation();
	const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
	const fetchDataBooks = async () => {
		try {
			setIsLoading(true);
			const response = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/books');
			const data = await response.json();
			const totalItems = data['hydra:totalItems'];
			
			setTotalItems(totalItems);
			setBooks(data['hydra:member'])

			const responseAuthors = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/writers');
			const authorsData = await responseAuthors.json();
			const authorsMap = authorsData['hydra:member'].reduce((acc, author) => {
				acc[author['@id']] = author.lastname;
				return acc;
			}, {});
			setAuthors(authorsMap);
			console.log('Authors Map:', authorsMap)
			console.log('Books Data:', data['hydra:member']);
		} catch (error) {
			console.error('Error fetching books:', error);
		}
		setIsLoading(false);
    };
          
      	fetchDataBooks();
	}, [])
		
	const handleBandPress = (authorId) => {
		navigation.navigate('Les auteurs', { authorId });
	};


	  return (
		<View style={styles.container}>
		  	<Text style={styles.title}>Les Livres ({totalItems})</Text>
			{isLoading ? (
				<ActivityIndicator size="large" color="red" />
			) : (
				<>
			
					{books && books.length > 0 ? (
						books.map((book) => (
							<View style={styles.booksView} key={book.id}>
								<Text style={styles.bookTitle}>{book.title}</Text>
								<Image source={{ uri: book.bookCover }} style={styles.image} />
								<Text style={styles.bookInfos}>Année de publication: {book.releasedYear}</Text>
								{/* Affichage de l'auteur */}
								<TouchableOpacity onPress={() => handleBandPress(book.writer)}>
									<View style={styles.auhtorLinkContainer}>
										<Text style={styles.bookInfos}>Auteur: </Text>
										<Text style={styles.bookLinks}>{authors[book.writer]}</Text>
									</View>
								</TouchableOpacity>
							</View>
						))
					) : (
						<Text>Pas de livre enregistré</Text>
					)}
				</>
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
	booksView: {
		flex: 1,
		alignItems: 'center',
	},
	bookTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 15,
		color: 'red',
	},
	bookInfos: {
		color: 'white',
		fontSize: 16,
	},
	bookLinks: {
        color: 'red',
        fontSize: 16,
	},
	auhtorLinkContainer: {
        flexDirection: 'row',
    },
	image: {
		marginBottom: 15,
		height: 200,
        width: 200,
        objectFit: 'contain',
	}
})

export default BooksScreen;