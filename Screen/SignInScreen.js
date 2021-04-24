import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
    Dimensions,
    ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../components/AuthContext';

import Users from '../model/Users';

const SignInScreen = ({navigation},props) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        userId:'',
        requestedCode:'',
        token :'',
        code:'',
        
    });

    const { colors } = useTheme();
    // This signIn  from App.js
    const { signIn } = React.useContext(AuthContext);

    async function get(e,p){
        const apig = "https://apis.tierebook.com/api/getLoginCode";
            try{
                const response = await fetch(apig);
                const gData = await response.json();
                console.log(gData);
                post(gData.data.code,e,p)
            }
            catch(e){
                    console.log("Error :",e.message);
            }
   
        }
    async function post (code,e,p){
        const api="https://apis.tierebook.com/api/loginUser";
        try{
          await fetch (api,
               {
                method: 'POST',
                credentials: 'same-origin',
                mode: 'same-origin',
                headers:{
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    
                    "email": e,
                    "password": p,
                    "reqCode" : code,
                    
                
              })
            })
              .then ((res)=> res.json())
              .then ((resJSON) =>{
                console.log('Responce Object : ', resJSON);
                // setData({
                //     ...data,
                //     email: resJSON.data.email,
                //     password: resJSON.data.password,
                //     userId: resJSON.data._id,
                //     requestedCode: resJSON.data.code,
                //     token: resJSON.data.token,
                //     code: resJSON.code,
                // });
                loginHandle(resJSON.code, resJSON)
              })
                            
            }
        catch(e){
        console.log("Errorrrrrrrrrrr",e.message)
        }
        
      }




    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    // const loginHandle = (userName, password) => {

    //     const foundUser = Users.filter( item => {
    //         return userName == item.username && password == item.password;
    //     } );

    //     if ( data.username.length == 0 || data.password.length == 0 ) {
    //         Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
    //             {text: 'Okay'}
    //         ]);
    //         return;
    //     }

    //     if ( foundUser.length == 0 ) {
    //         Alert.alert('Invalid User!', 'Username or password is incorrect.', [
    //             {text: 'Okay'}
    //         ]);
    //         return;
    //     }
    //     signIn(foundUser);
    // }
    const loginHandle = (code, Data) => {

        if (  data.email.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }

        if ( code == 500 || code == 401) {
            Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                {text: 'Okay'}
            ]);
            return;
        }
        if (code == 200){
            
           
            //signIn(data);
            props.navigation.navigate("Home");
            alert("Welcome "+Data.data.fname + " " + Data.data.lname);
        }
        
    }

    return (
      <View style={styles.container}>
          <StatusBar style="auto"/>
          {/* <StatusBar backgroundColor='#009387' barStyle="light-content"/> */}
          <ImageBackground
            source={require('../assets/bg.jpeg')}
            style={styles.backgroundBg}
            resizeMode="stretch"/>
        <View style={styles.header}>
      
           
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
      <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/tierebook.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email*</Text>
            <View style={styles.action}>
                <FontAwesome 
                    //name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            {/**This is for display message to user  */}
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password*</Text>
            <View style={styles.action}>
                <Feather 
                    //name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            {/* <TouchableOpacity>
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity> */}
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {get(data.email,data.password)}}
                >
                {/* <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    // style={styles.signIn}
                >
                    </LinearGradient> */}
                    <Text style={styles.buttonText}>Login</Text>
                
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity> */}
          <View style={styles.singinContainer}>
                <TouchableOpacity
                style={styles.forgotButton}
                onPress={()=> {}}>
                <Text style={styles.navButtonText}>Reset</Text>
            </TouchableOpacity>
                <Text>Forgot Password? </Text>
            </View>
                 <View style={styles.singUpContainer}>
                <TouchableOpacity
                    style={styles.forgotButton}
                    onPress={()=> navigation.navigate("SignUpScreen")}>
                    <Text style={styles.navButtonText}>Signup</Text>
                </TouchableOpacity>
                <Text>You don't have account yet? </Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center', marginTop:10}}>
                <Text>For more info check </Text>
                <TouchableOpacity
                    style={styles.navButton1}
                    onPress={() => navigation.navigate("https://tierebook.com")}>

                    <Text style={styles.navButtonText1}> https://tierebook.com</Text>
                </TouchableOpacity>

            </View>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;


const {height} = Dimensions.get("screen");
const {width} = Dimensions.get("window");
const height_logo = height * 0.24;
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387',
      padding:20,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        //paddingHorizontal: 20,
        //paddingBottom: 50
    },
    backgroundBg: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        position:'absolute',
        resizeMode:'cover',
        
    },
    logo: {
        width: height_logo,
        height: height_logo,
        alignSelf:'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        padding : 20,
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        // paddingHorizontal: 20,
        // paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    buttonContainer:{
        marginTop:10,
        width:Dimensions.get('window').width/3,
        height:Dimensions.get('window').height/15,
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
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    navButton:{
        //marginTop:15,
    },
    forgotButton:{
      //marginVertical:10,

    },
    navButtonText:{
      fontSize: 18,
      fontWeight:'500',
      color:'#2e64e5',

    },
    singinContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row-reverse',
        flexWrap:'wrap',
        marginTop: 20,

    },
    singUpContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row-reverse',
        flexWrap:'wrap',
        marginTop: 20,
        marginBottom:10,
    },
    navButton1:{
        marginTop:2,
    },

    navButtonText1:{
        fontSize: 18,
        fontWeight:'500',
        color:'#2e64e5',

    },
  });