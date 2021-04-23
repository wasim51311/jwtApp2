import React from 'react';
import {View, Text,Button,StyleSheet} from 'react-native';

const DetailScreen =({navigation})=>{
    return(
        <View style={styles.container}>
       <Text>Detail Screen</Text>
       <Button
          title={'Go to details Screen...again'}
          onPress={()=> navigation.push("Details")}
       />
        <Button
          title={'Go to Home'}
          onPress={()=> navigation.navigate("Home")}
       />
        <Button
          title={'Go to back'}
          onPress={()=> navigation.goBack()}
       />
        <Button
          title={'Go to first screen '}
          onPress={()=> navigation.popToTop()}
       />
     </View>
    );

}
export default DetailScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
    }
});