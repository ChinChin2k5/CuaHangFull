import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons'; 


import HomeScreen from './screens/HomeScreen';
import Explore from './screens/Explore';
import Beverages from './screens/Beverages';
import ProductDetail from './screens/ProductDetail'; 

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Shop') iconName = 'shopping-bag'; 
          else if (route.name === 'Explore') iconName = 'search'; 
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#53B175',  
        tabBarInactiveTintColor: 'gray',
        headerShown: false, 
        tabBarStyle: { height: 60, paddingBottom: 10, paddingTop: 5 } 
      })}
    >
      
      <Tab.Screen name="Shop" component={HomeScreen} />
      <Tab.Screen name="Explore" component={Explore} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
       
        <Stack.Screen name="MainTabs" component={MainTabs} />

        
        <Stack.Screen name="Beverages" component={Beverages} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}