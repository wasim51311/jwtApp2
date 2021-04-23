import React from 'react';
import {View, Text,Button,StyleSheet} from 'react-native';

const ProfileScreen =({navigation})=>{
    return(
        <View style={styles.container}>
            <Text>ProfileScreen Screen</Text>
            <Button
                title={'Go to details Screen'}
                onPress={()=> navigation.navigate("Details")}
            />

        </View>
    );

}
export default ProfileScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
    }
});