import { StyleSheet,Image,ScrollView, SafeAreaView, FlatList  } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Menu } from '@/assets/Data/Menu';
import React from 'react';
// import { } from 'react-native-reanimated/lib/typescript/Animated';
type ItemProps = {id: number,name:string,price:string,imageUrl:string};

const Item = ({id,name,price,imageUrl}: ItemProps) => (
  <View style={styles.card} key={id}>
            <Text style={styles.title}>{name}</Text>
            <Image 
              style={styles.foodImage}
              source={{uri:imageUrl}}
            />
           <Text style={styles.price}>{price}</Text>
            </View>
);
export default function FoodMenu({foodMenu}:any){
    console.log(foodMenu)
    return (
  
          
        <FlatList
        data={Menu}
        renderItem={({item}) => <Item id={item.id} name={item.name} price={item.price} imageUrl={item.imageUrl} />}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        contentContainerStyle={{gap:10,padding:10}}
        columnWrapperStyle={{gap:10}}
      />)
      // <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
      // </ScrollView> 
  {/* <View >
   
        {Menu?.map((menuItem)=>{ 
            
          return ()
        })}
       
      
      </View> */}
    
  
  }

  const styles = StyleSheet.create({
    container: {
      flex: 0.95,
      flexDirection:"row",
      flexWrap:"wrap",
      justifyContent:"flex-start",
      gap:10,
      borderWidth:2,
      borderColor:'red',
    //   alignItems: 'center',
    //   justifyContent: 'sp',
    },
    card:{
        width: 200,
        height:200,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderRadius:15,
        padding:10,
        // backgroundColor:"grey",
        borderColor:"black"
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    price: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    foodImage:{
      width:150,
      height:150,
      borderRadius:100,
    //   aspectRatio:2/1
    },
    scrollView: {
     
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
  });
  