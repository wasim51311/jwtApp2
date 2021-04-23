import React from 'react';
import {View, Text,Button,StyleSheet} from 'react-native';

const ExploerScreen =({navigation})=>{
    return(
        <View style={styles.container}>
            <Text>Explore Screen</Text>
            <Button
                title={'Go to details Screen'}
                onPress={()=> navigation.navigate("Details")}
            />

        </View>
    );

}
export default ExploerScreen;

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center',
    }
});