import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BandsScreen from './Screens/BandsScreen';
import AlbumsScreen from './Screens/AlbumsScreen';
import HomeScreen from './Screens/HomeScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function App() {
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
                    source={require('./assets/img/music-store.png')}
                    style={{ width: size*1.5, height: size*1.5 }}
                  />
                </View>
              ),
            }}/>
          <Tab.Screen
            name="Bands"
            component={BandsScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <View style={{ paddingTop: 5 }}>
                  <Image
                    source={require('./assets/img/metal.png')}
                    style={{ width: size*1.5, height: size*1.5 }}
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Albums"
            component={AlbumsScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <View style={{ paddingTop: 5}}>
                  <Image
                    source={require('./assets/img/cd.png')}
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