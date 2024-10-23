import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed';
export default function NavBar ({}:any){
return (
    <View style={
        styles.container
    }>
<View style={
    styles.box
}>
    <Text>Meals</Text>
</View>
<View
style={
    styles.box}>
<Text>Sides</Text>
</View>
<View
style={
    styles.box
}
>
<Text>Snacks</Text>
</View>

    </View>
)
} 

const styles = StyleSheet.create({
    container:{
        flex: 0.05,
        zIndex:100,
        flexDirection: "row",
        justifyContent: "space-around"
    }
,
    box:{
        borderBottomColor:"black",
        width:60,
        height:60,
        backgroundColor:"red"
    }
})