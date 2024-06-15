import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MusicScreen from '../Screens/MusicScreen';
import BandsScreen from '../Screens/BandsScreen';
import AlbumsScreen from '../Screens/AlbumsScreen';
import LibraryScreen from '../Screens/LibraryScreen';
import AuthorScreen from '../Screens/AuthorScreen';
import BooksScreen from '../Screens/BooksScreen';
import HomeScreen from '../Screens/HomeScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Navbar() {

    return (
        <>
            <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Accueil"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                        <View style={{ paddingTop: 5 }}>
                            <Image
                                source={require('../assets/img/home.webp')}
                                style={{ width: size*1.5, height: size*1.5 }}
                            />
                        </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Musique"
                    component={MusicScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                        <View style={{ paddingTop: 5 }}>
                            <Image
                                source={require('../assets/img/metal.png')}
                                style={{ width: size*1.5, height: size*1.5 }}
                            />
                        </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Bibliothèque"
                    component={LibraryScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                        <View style={{ paddingTop: 5}}>
                            <Image
                                source={require('../assets/img/book.webp')}
                                style={{ width: size*1.5, height: size*1.5 }}
                            />
                        </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Les groupes"
                    component={BandsScreen}
                    options={{
                        tabBarLabel: 'Hidden Screen',
                        tabBarButton: () => null, // Cache le bouton de l'onglet
                    }}
                />
                <Tab.Screen
                    name="CDthèque"
                    component={AlbumsScreen}
                    options={{
                        tabBarLabel: 'Hidden Screen',
                        tabBarButton: () => null,
                    }}
                />
                <Tab.Screen
                    name="Les auteurs"
                    component={AuthorScreen}
                    options={{
                        tabBarLabel: 'Hidden Screen',
                        tabBarButton: () => null,
                    }}
                />
                <Tab.Screen
                    name="Les livres"
                    component={BooksScreen}
                    options={{
                        tabBarLabel: 'Hidden Screen',
                        tabBarButton: () => null,
                    }}
                />
            </Tab.Navigator>
            </NavigationContainer>
        </>

    );
}

const styles = StyleSheet.create({
  bar: {
    padding: 10
  },
});