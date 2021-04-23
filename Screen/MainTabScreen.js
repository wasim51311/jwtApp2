import React from 'react';
 
 import { createStackNavigator } from '@react-navigation/stack';
 import  HomeScreen  from './HomeScreen';
 import  DetailScreen  from './DetailsScreen';
 import ProfileScreen from './ProfileScreen';
 import ExploerScreen from './ExploerScreen';
 import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();
 
const MainTabScreen =() =>{
    return (
        <Tab.Navigator
          initialRouteName="Feed"
          activeColor="#e91e63"
          barStyle={{ backgroundColor: 'tomato' }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarColor:'#009387',
              
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <Icon name='home' color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Details"
            component={DetailsStackScreen}
            options={{
              tabBarLabel: 'Details',
              tabBarColor:'#0cccf3',
              tabBarIcon: ({ color }) => (
                <Icon name="ios-desktop-sharp" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Explore"
            component={ExploreStackScreen}
            options={{
              tabBarLabel: 'Explore',
              tabBarColor:'#00f4a2',
              tabBarIcon: ({ color }) => (
                <Icon name="expand" color={color} size={26} />
              ),
            }}
          />
           <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarColor:'#d02860',
              tabBarIcon: ({ color }) => (
                <Icon name="person-outline" color={color} size={30} />
              ),
            }}
          />
        </Tab.Navigator>
      );
}
export default MainTabScreen;

const HomeStack = createStackNavigator();
 const DetailsStack = createStackNavigator();
 const ProfileStack = createStackNavigator();
 const ExploreStack = createStackNavigator();
const HomeStackScreen= ({navigation})=>(
    <HomeStack.Navigator screenOptions={{
             
        headerStyle:{
                     backgroundColor:'#009387',
                            },
                     headerTintColor:'#fff',       
                     headerTitleStyle:{
                             fontWeight:'bold',
                     },
                 }}>
          <HomeStack.Screen name="Home" component={HomeScreen}
           options={{
                title:'Overview',
                 headerLeft:()=> (
                   <Icon.Button 
                      name='ios-menu' 
                      size={25} 
                      backgroundColor={'#009387'}
                      onPress={()=> navigation.openDrawer()}/>
                 )
          }}                
          />
           
         </HomeStack.Navigator> 
    );
    const DetailsStackScreen= ({navigation})=>(
     <DetailsStack.Navigator screenOptions={{
              headerLeft:()=> (
                <Icon.Button 
                  name='ios-menu' 
                  size={25} 
                  backgroundColor={'#0cccf3'}
                  onPress={()=> navigation.openDrawer()}/>
              ),
              headerStyle:{
                           backgroundColor:'#0cccf3',
                                  },
                           headerTintColor:'#fff',       
                           headerTitleStyle:{
                                   fontWeight:'bold',
                           },
                       }} >
         
             <DetailsStack.Screen 
                name="Details" 
                component={DetailScreen}          
              />
                
          </DetailsStack.Navigator> 
    );

    const ProfileStackScreen= ({navigation})=>(
      <ProfileStack.Navigator screenOptions={{
               headerLeft:()=> (
                 <Icon.Button 
                   name='ios-menu' 
                   size={25} 
                   backgroundColor={'#d02860'}
                   onPress={()=> navigation.openDrawer()}/>
               ),
               headerStyle:{
                            backgroundColor:'#d02860',
                                   },
                            headerTintColor:'#fff',       
                            headerTitleStyle:{
                                    fontWeight:'bold',
                            },
                        }} >
          
              <ProfileStack.Screen 
                 name="Profile" 
                 component={ProfileScreen}          
               />
                 
           </ProfileStack.Navigator> 
     );

     const ExploreStackScreen =({navigation}) =>(
     <ExploreStack.Navigator screenOptions={{
      headerLeft:()=> (
        <Icon.Button 
          name='ios-menu' 
          size={25} 
          backgroundColor={'#00f4a2'}
          onPress={()=> navigation.openDrawer()}/>
      ),
      headerStyle:{
                   backgroundColor:'#00f4a2',
                          },
                   headerTintColor:'#fff',       
                   headerTitleStyle:{
                           fontWeight:'bold',
                   },
               }} >
 
     <ExploreStack.Screen 
        name="Explore" 
        component={ExploerScreen}          
      />
        
  </ExploreStack.Navigator> 
);