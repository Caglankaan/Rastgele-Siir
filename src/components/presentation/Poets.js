import React, { Component } from "react";
import { View, Text, StyleSheet,Dimensions,TouchableOpacity,Image,ImageBackground } from "react-native";
import config from "../../../config/index.js";
import { ScrollView } from "react-native-gesture-handler";
import SearchInput from 'react-native-search-filter';
import {AdMobBanner, PublisherBanner} from 'react-native-admob';
var json = require("../../../poems.json")

var poetNames = {"ah-muhsin-unlu":"Ah Muhsin Ünlü","ahmet-hamdi-tanpinar":"Ahmet Hamdi Tanpınar","ali-lidar":"Ali Lidar","arif-damar":"Arif Damar","asik-veysel-satiroglu":"Aşık Veysel Satıroğlu",
"attila-ilhan":"Attila İlhan","cahit-koytak":"Cahit Koytak","cahit-sitki-taranci":"Cahit Sıtkı Tarancı","can-dundar":"Can Dündar","can-yucel":"Can Yücel","celal-silay":"Celal Silay","cemal-sureya":"Cemal Süreya",
"didem-madak":"Didem Madak","ece-ayhan":"Ece Ayhan","edip-cansever":"Edip Cansever","friedrich-nietzsche":"Friedrich Nietzsche","hasan-huseyin-korkmazgil":"Hasan Hüseyin Korkmazgil",
"ilhan-berk":"İlhan Berk","mehmet-emin-yurdakul":"Mehmet Emin Yurdakul","muzaffer-tayyip-uslu":"Muzaffer Tayyip Uslu","nahit-ulvi-akgun":"Nahit Ulvi Akgün","nazim-hikmet":"Nazım Hikmet",
"necip-fazil-kisakurek":"Necip Fazıl Kısakürek","neset-ertas":"Neşet Ertaş","neyzen-tevfik":"Neyzen Tevfik","omer-hayyam":"Ömer Hayyam","orhan-veli-kanik":"Orhan Veli Kanık","ozdemir-asaf":"Özdemir Asaf",
"peyami-safa":"Peyami Safa","sunay-akin":"Sunay Akın","tevfik-fikret":"Tevfik Fikret","turgut-uyar":"Turgut Uyar","veysel-colak":"Veysel Çolak","william-shakespeare":"William Shakespeare",
"yilmaz-erdogan":"Yılmaz Erdoğan","yilmaz-guney":"Yılmaz Güney","yunus-emre":"Yunus Emre","ziya-gokalp":"Ziya Gökalp"}


var allPoetss = []
var allPoets = []
for(var key in json){
    allPoetss.push(key)
}
for(let i = 0;i<allPoetss.length;i++){
    allPoets.push(poetNames[allPoetss[i]])
}

export default class Poets extends Component{

    static navigationOptions = {
        title: 'Şairler',
        headerStyle: {
          backgroundColor: 'rgb(244,197,168)',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    
    constructor(){
        super();
        this.state = {
        poet:"",
        search: '',
        screenWidth: Dimensions.get("window").width,
        screenHeight: Dimensions.get("window").height
        };
    }

    findInArray(array, index){
        return array.filter(item => item.indexOf(index) > -1);
     }

    searchUpdated(term) {
        this.setState({ search: term })
      }
    render(){
        
        //const {search} = this.state.search;
        myloop=[]
        if(this.state.search == ""){
            for (let i = 0; i < allPoets.length; i++) {
            myloop.push(
                <View key={i}>
                <TouchableOpacity
                    activeOpacity={.7}
                    onPress={() => this.props.navigation.navigate('Poems',{poet: allPoets[i]})}
                    >
                    <Text style= {styles.poets}>{allPoets[i]}</Text>
                    </TouchableOpacity>
                </View>
            );
            }
        }
        else{
            myElements = this.findInArray(allPoets, this.state.search)
            //alert(myElements)
            for(let i = 0;i < myElements.length;i++){
                myloop.push(
                    <View key={i}>
                    <TouchableOpacity
                        activeOpacity={.7}
                        onPress={() => this.props.navigation.navigate('Poems',{poet: myElements[i] })}
                        >
                        <Text style= {styles.poets}>{myElements[i]}</Text>
                        </TouchableOpacity>
                    </View>
                );
            } 
        }
        return (

            <View style = {{flex: 1, width: 100+"%",backgroundColor:"rgb(244,197,168)"}}>
                    <SearchInput 
                                    onChangeText={(term) => { this.searchUpdated(term) }} 
                                    placeholder="Şair Ara"
                                    style={styles.searchInput}
                                    />
                <ImageBackground style={{width:100+"%",height:100+"%",position:'absolute',marginLeft:this.state.screenWidth / 3 -20, marginTop:this.state.screenHeight/4 + 20}} source={config.images.poets_background}/>

                <ScrollView style = {{flex: 1, width: 100+"%"}}>
                    
                <AdMobBanner
                    adSize="fullBanner"
                    adUnitID="ca-app-pub-2845440886580404/4033439858"
                    //testDeviceID={[AdMobBanner.simulatorId]}/>
                    />
                    {myloop}
                </ScrollView>
            </View>
            );
        
        }
    }


const styles = StyleSheet.create({
tempNav: {
    width: 100+"%",
    height: 56,
    marginTop: 20,
    backgroundColor:"rgb(250,250,250)",
    borderBottomColor: "rgb(233,233,233)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "center",
    alignItems: "center",
    },
userBar: {
    width: 100+"%",
    height: config.styleConstants.rowHeight,
    backgroundColor: "rgb(255,255,255)",
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    },
userPic: {
    height:40,
    width:40,
    borderRadius:20,
},
iconBar: {
    height: config.styleConstants.rowHeight,
    width: 100 +"%",
    borderColor: "rgb(233,233,233)",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row"
},
icon:{
    marginLeft: 5
},
poets:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
},  
searchInput:{
    padding: 10,
    backgroundColor:"rgb(202,215,206)",
    width:90+"%",
    borderColor: '#CCC',
    borderWidth: 1,
    marginLeft:5+"%"
  }
});
