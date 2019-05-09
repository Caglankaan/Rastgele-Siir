import React, { Component } from 'react';  
import {View, Text , TouchableOpacity, StyleSheet, Image} from 'react-native';
var json = require("../../../poems.json")
import {withNavigation} from 'react-navigation'
import config from '../../../config/index.js';
import {AdMobBanner,
    AdMobInterstitial
} from 'react-native-admob';
var RNFS = require('react-native-fs');

global.fileContent= ""

var wholePoets = []
for(var key in json){
    wholePoets.push(key)
}
class Home extends Component {
    static navigationOptions = {
        title: 'Ana Sayfa',
        headerStyle: {
          backgroundColor: "rgb(202,215,206)",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            alignItems:"center",
            justifyContent:"center",
          fontWeight: 'bold',
          color:"black"
        },
      };
    
  constructor(){
    super()
    this.state = {
        disabled: false
    };
    myloop=[]
        global.wholePoemsOfPoets = []
        
            for (let i = 0; i <wholePoets.length;i++){
                currentPoet = wholePoets[i]
                idOfCurrentPoet = []
                for(var key in json[currentPoet]){
                    idOfCurrentPoet.push(key)
                }
                for (var j = 0; j < idOfCurrentPoet.length; j++){
                  global.wholePoemsOfPoets.push(json[currentPoet][idOfCurrentPoet[j]]['Title'])
                }
            }
            for (let i = 0; i < global.wholePoemsOfPoets.length; i++) {
                myloop.push(
                    <View key={i}>
                        <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() =>  navigation.navigate('PoemFeed',{poet:currentPoet, poem: global.wholePoemsOfPoets[i]})}
                        >
                            <Text style= {styles.poems}>{i+1} - {global.wholePoemsOfPoets[i]}</Text>
                        </TouchableOpacity>
                    </View>
                );
            }
            global.callWholePoemsWithPage= []
            j = 1

            for(let i = 0; i<myloop.length;i=i+30){
              global.callWholePoemsWithPage.push(
                    <View style={styles.pageStyle}>
                        {myloop[i]}
                        {myloop[i+1]}
                        {myloop[i+2]}
                        {myloop[i+3]}
                        {myloop[i+4]}
                        {myloop[i+5]}
                        {myloop[i+6]}
                        {myloop[i+7]}
                        {myloop[i+8]}
                        {myloop[i+9]}
                        {myloop[i+10]}
                        {myloop[i+11]}
                        {myloop[i+12]}
                        {myloop[i+13]}
                        {myloop[i+14]}
                        {myloop[i+15]}
                        {myloop[i+16]}
                        {myloop[i+17]}
                        {myloop[i+18]}
                        {myloop[i+19]}
                        {myloop[i+20]}
                        {myloop[i+21]}
                        {myloop[i+22]}
                        {myloop[i+23]}
                        {myloop[i+24]}
                        {myloop[i+25]}
                        {myloop[i+26]}
                        {myloop[i+27]}
                        {myloop[i+28]}
                        {myloop[i+29]}
                    </View>
                );
            }
            
          
  }
  async readFile() {
    filename= "favorites.txt"
    var rootPath = RNFS.DocumentDirectoryPath
    var path = rootPath + '/' + filename;
    if(await RNFS.exists(path)){
        var content = await RNFS.readFile(path, 'utf8')
        myFavorites = content.split("\n")
        if(content == ""){
        global.fileContent =  poet+"|"+poem
        }
        else{
        global.fileContent = content
        console.log("content is : ",content)
        }
    }
    else{
        this.clearFile()
    }
  }
  render() {
      this.readFile()
    return (
      <View  style={{backgroundColor:"rgb(202,215,206)",alignItems:"center", flex:1,width:100+"%"}}>    
      <View style={{width:100+"%",height:300,alignItems:"center"}}>
        <Image style={[{height:100+"%", width:100+"%", marginRight:30}]} source={config.images.home_background} />
      </View>
                <TouchableOpacity style={styles.TouchableOpacityStyle}
                activeOpacity= {0.8}
                onPress = {() => {
                    this.props.navigation.navigate('Poets');
                }}
                >
                    <Text style={styles.textStyle}>Şairlere Git</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TouchableOpacityStyle}
                activeOpacity= {0.8}
                onPress = {() => {
                    this.props.navigation.navigate('randomPoem');
                }}
                >
                    <Text style={styles.textStyle}>Rastgele bir şairden rastgele şiir ver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TouchableOpacityStyle}
                activeOpacity= {0.8}
                onPress = {() => {
                    this.props.navigation.navigate('choosePoets');
                }}
                >
                    <Text style={styles.textStyle}>Belirli şair(ler)den rastgele şiir ver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.TouchableOpacityStyle}
                activeOpacity= {0.8}
                onPress = {() => {
                    this.props.navigation.navigate('Favorites');
                }}
                >
                    <Text style={styles.textStyle}>Favori Şiirler</Text>
                </TouchableOpacity>
        </View>

    );
  }
}

const styles = StyleSheet.create({
    TouchableOpacityStyle:{
        width:70+"%",
        height:40,
        alignItems:"center",
        marginTop:10,
        backgroundColor:"rgb(244,197,168)"
    },
    textStyle:{
        color:"black",
        //fontFamily:"sans-serif-condensed",
        lineHeight:40,
        alignContent:"center"
    },
    pageStyle: {
      alignItems: 'center',
      padding: 20,
    }
})

export default  withNavigation(Home);