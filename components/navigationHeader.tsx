import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { recycledStyles } from './recycled-style';

import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';

type name = {
  name?: string | null,
  age?: number | null,
}

let suraj: string| undefined;


export default function NavigationHeader({ title, navigation }: { title: string, navigation: any }) {
    //source={require('../assets/icon.png')}
    
      
      
    return(
        <View style= {styles.header}  >
               


        
            <View  style ={styles.headerView} >
                <Image source={require('../assets/favicon.png')} style= {{alignItems: 'center'}}  />
                <Text style = {styles.title}> {title} </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      flex: 1,
      //width: '100%',
      //height: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'skyblue',
    },

    headerText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#333',
    },

    headerView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    icon: {
        position: 'absolute',
        left: 15,
    },
    Addicon: {
        position: 'absolute',
        right: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
    }
  });
  