import Navbar from './Utils/Navbar';
import BandsScreen from './Screens/BandsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <>
            <Navbar />
            
        </>
      
    );
};