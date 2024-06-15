import { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { StyleSheet} from 'react-native';

const BooksScreen = () => {
	const [books, setBooks] = useState([]);
	const [totalItems, setTotalItems] = useState(0);
	const [authors, setAuthors] = useState({});

useEffect(() => {
	const fetchDataBooks = async () => {
		try {
			const response = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/books');
			const data = await response.json();
			const totalItems = data['hydra:totalItems'];
			
			setTotalItems(totalItems);
			setBooks(data['hydra:member'])

			const responseAuthors = await fetch('https://mediatek-c59c683546ca.herokuapp.com/api/writers');
			const authorsData = await responseAuthors.json();
			const authorsMap = authorsData['hydra:member'].reduce((acc, author) => {
				acc[author['@id']] = {
					firstname: author.firstname,
            		lastname: author.lastname
				};
				return acc;
			}, {});
			setAuthors(authorsMap);
			console.log('Authors Map:', authorsMap)
			console.log('Books Data:', data['hydra:member']);
		} catch (error) {
		console.error('Error fetching books:', error);
		}
    	};
          
      fetchDataBooks();
      }, [])

	  return (
		<View style={styles.container}>
		  <Text style={styles.title}>Les Livres ({totalItems})</Text>
		  {books && books.length > 0 ? (
			books.map((book) => (
				<View style={styles.booksView} key={book.id}>
					<Text style={styles.bookTitle}>{book.title}</Text>
					<Image source={{ uri: book.bookCover }} style={{ width: 200, height: 100 }} />
					<Text style={styles.bookInfos}>Année de publication: {book.releasedYear}</Text>
					<Text style={styles.bookInfos}>
						Auteur : {`${authors[book.writer].firstname} ${authors[book.writer].lastname}`}
					</Text>
				</View>
			))
		  ) : (
			<Text>Pas de livre enregistré</Text>
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
	}
})

export default BooksScreen;