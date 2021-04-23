import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet, 
    StatusBar,
    ImageBackground,
    Dimensions,
    TextInput,
    useState,
    TouchableOpacity} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {useRoute, useTheme} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';

const HomeScreen =({navigation,route})=>{
   
    const [data, setData] = React.useState({
        post: '',
        check_textInputChange: false,
       
    });


    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                post: val,
                check_textInputChange: true,
               
            });
        } else {
            setData({
                ...data,
                post: val,
                check_textInputChange: false,
              
            });
        }
    }

    const {colors} =useTheme();
    const theme = useTheme();
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle={theme.dark ? "light-content " : "dark-content"}/>
            <ImageBackground
            source={require('../assets/bg.jpeg')}
            style={styles.backgroundBg}
            resizeMode="stretch"/>
          <View style={{ flexDirection:"column",backgroundColor:"#fff",margin:10}}>
          <View style={styles.thinkcontainer}>
            <TextInput 
                    
                    placeholder="What do you think "
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    />
                   
                 {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                    style={{alignSelf:'center'}}
                >
                    <Feather 
                        name="check-circle"
                        color="blue"
                        size={20}
                    />
                </Animatable.View>
                : null}
               
            </View>

            <View>
            {data.check_textInputChange ? 
               <TouchableOpacity
               style={styles.buttonContainer}
               onPress={() => {}}
           >
          
               <Text style={styles.buttonText}>POST</Text>
           
           </TouchableOpacity>
                : null}
                
                </View>
          </View>

        </View>
    );

}
export default HomeScreen;
const width =Dimensions.get('window').width;
const height=Dimensions.get('window').height;
const styles=StyleSheet.create({
    container:{
        flex:1,
        
    },
    backgroundBg: {
        width:width,
        height:height,
        position:'absolute',
        resizeMode:'cover',
        
    },
    thinkcontainer:{
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5,
        padding:10,
        margin:10,
        backgroundColor:'#fff',
    },
    textInput: {
        flex:1,
        paddingLeft: 10,
        color: '#05375a',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        
    },
    buttonContainer:{
        margin:30,
        
        width:Dimensions.get('window').width/5,
        height:Dimensions.get('window').height/18,
        backgroundColor:'rgba(0,0,0,0)',
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:3,
        //borderWidth:1,
        shadowColor: "#bbb",
        shadowOffset: {
          width: 8,
          height: 8,
         },
        shadowOpacity: 0.9,
        shadowRadius: 10.32,
        elevation: 1,
        
      },
      buttonText:{
          fontSize:18,
          color:'#070707',
  
      },
});