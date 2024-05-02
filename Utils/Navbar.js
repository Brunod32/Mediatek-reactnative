import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MusicScreen from '../Screens/MusicScreen';
import LibraryScreen from '../Screens/LibraryScreen';
import HomeScreen from '../Screens/HomeScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
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
            }}/>
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