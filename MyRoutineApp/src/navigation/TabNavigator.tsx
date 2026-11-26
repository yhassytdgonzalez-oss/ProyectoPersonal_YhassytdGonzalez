import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MovementsScreen from '../screens/MovementsScreen';
import { TabParamList } from '../utils/types';

const Tab = createBottomTabNavigator<TabParamList>();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#007AFF' }}>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Movimientos" component={MovementsScreen} />
    </Tab.Navigator>
  );
}