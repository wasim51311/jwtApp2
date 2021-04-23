/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 
 import { 
   NavigationContainer,
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme as NavigationDarkTheme }
 from '@react-navigation/native';
 import {
    
    Provider as PaperProvider,
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme
  } from  'react-native-paper';
 import { createStackNavigator } from '@react-navigation/stack';
 import  HomeScreen  from './Screen/HomeScreen';
 import  DetailScreen  from './Screen/DetailsScreen';
 import { createDrawerNavigator } from '@react-navigation/drawer';
 
import { View,ActivityIndicator, StatusBar } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import MainTabScreen from './Screen/MainTabScreen';
import {DrawerConent} from './Screen/DrawerContent';
import SupportScreen from './Screen/SupportScreen';
import BookMarkScreen from './Screen/BookMarkScreen';
import SettingsScreen from './Screen/SettingsScreen';
import {AuthContext} from './components/AuthContext';
import RootStackScreen from './Screen/RootStackScreen';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


//  const HomeScreen=({navigation})=> {
//    return (
//      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//        <Text>Home Screen</Text>
//        <Button
//           title={'Go to details Screen'}
//           onPress={()=> navigation.navigate("Details")}
//        />
       
//      </View>
//    );
//  }
//  const DetailScreen=({navigation})=> {
//    return (
//      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//        <Text>Detail Screen</Text>
//        <Button
//           title={'Go to details Screen...again'}
//           onPress={()=> navigation.push("Details")}
//        />
//         <Button
//           title={'Go to Home'}
//           onPress={()=> navigation.navigate("Home")}
//        />
//         <Button
//           title={'Go to back'}
//           onPress={()=> navigation.goBack()}
//        />
//         <Button
//           title={'Go to first screen '}
//           onPress={()=> navigation.popToTop()}
//        />
//      </View>
//    );
//  }
 
 
 const Drawer = createDrawerNavigator();


 
 
 const App =() =>{
  //  const [isLoading, setIsLoading] = React.useState(true);
  //  const [userToken, setUserToken] = React.useState(null);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

 

  const initialLoginState ={
    isLoading: true,
    userName:null,
    userToken:null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer =(prevState, action)=>{
      switch(action.type) {
        case 'RETRIEVE_TOKEN' :
          return{
            ...prevState,
            userToken:action.token,
            isLoading: false,
          };
        case 'LOGIN' :
          return{
            ...prevState,
            userName:action.id,
            userToken: action.token,
            isLoading: false,
          };
        case 'LOGOUT' :
          return{
            ...prevState,
            userName:null,
            userToken:null,
            isLoading: false,
          };
        case 'REGISTER' :
          return{
            ...prevState,
            userName:action.id,
            userToken: action.token,
            isLoading: false,
          };
      }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

   const authContent = React.useMemo(()=>({
     signIn:async(userName, password)=>{
      // setUserToken('fgkj') 
      // setIsLoading(false);
      let userToken;
      userToken= "dfdfdf";
      if (userName=='user' && password=='password'){
        userToken="dfdfdf";
        try{
          await AsyncStorage.setItem('userToken',userToken)
        } catch (e) {
          console.log(e);
        }
       
      }
      console.log('user token', userToken);
      dispatch({type:'LOGIN' ,id:userName, token:userToken});
        },
     signOut :async ()=>{
      // setUserToken(null) 
      // setIsLoading(false);
      try{
        await AsyncStorage.removeItem('userToken',userToken)
      } catch (e) {
        console.log(e);
      }
      dispatch({type:'LOGOUT'});
    },
     signUp : ()=> {
      // setUserToken('fgkj') 
      // setIsLoading(false);
     },
     toggleTheme:()=> {
        setIsDarkTheme(!isDarkTheme);
     },
   }));

   useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
   return (
     <PaperProvider theme ={theme}>

    
     <AuthContext.Provider value={authContent}>
     <NavigationContainer theme={theme} >
       {loginState.userToken !== null ?(
         <Drawer.Navigator drawerContent={props => <DrawerConent {...props}/>} screenOptions={{
          headerShown:false,
         }}>
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name ="Support" component ={SupportScreen}/>
        <Drawer.Screen name ="Bookmark" component ={BookMarkScreen}/>
        <Drawer.Screen name ="Settings" component ={SettingsScreen}/>

    </Drawer.Navigator>
       ) :
       <RootStackScreen/>
      }
       
     
     </NavigationContainer>
     </AuthContext.Provider>
     </PaperProvider>
   )
 }
 
 
 
 
 export default App;
 