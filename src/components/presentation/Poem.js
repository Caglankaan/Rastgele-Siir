import React, { Component } from 'react';  
import {View, Text,Dimensions,StyleSheet } from 'react-native';
var json = require("../../../poems.json");
import { ScrollView } from 'react-native-gesture-handler';
import {AdMobBanner} from 'react-native-admob';
import config from "../../../config/index.js";

var poetNames = {"ah-muhsin-unlu":"Ah Muhsin Ünlü","ahmet-hamdi-tanpinar":"Ahmet Hamdi Tanpınar","ali-lidar":"Ali Lidar","arif-damar":"Arif Damar","asik-veysel-satiroglu":"Aşık Veysel Satıroğlu",
"attila-ilhan":"Attila İlhan","cahit-koytak":"Cahit Koytak","cahit-sitki-taranci":"Cahit Sıtkı Tarancı","can-dundar":"Can Dündar","can-yucel":"Can Yücel","celal-silay":"Celal Silay","cemal-sureya":"Cemal Süreya",
"didem-madak":"Didem Madak","ece-ayhan":"Ece Ayhan","edip-cansever":"Edip Cansever","friedrich-nietzsche":"Friedrich Nietzsche","hasan-huseyin-korkmazgil":"Hasan Hüseyin Korkmazgil",
"ilhan-berk":"İlhan Berk","mehmet-emin-yurdakul":"Mehmet Emin Yurdakul","muzaffer-tayyip-uslu":"Muzaffer Tayyip Uslu","nahit-ulvi-akgun":"Nahit Ulvi Akgün","nazim-hikmet":"Nazım Hikmet",
"necip-fazil-kisakurek":"Necip Fazıl Kısakürek","neset-ertas":"Neşet Ertaş","neyzen-tevfik":"Neyzen Tevfik","omer-hayyam":"Ömer Hayyam","orhan-veli-kanik":"Orhan Veli Kanık","ozdemir-asaf":"Özdemir Asaf",
"peyami-safa":"Peyami Safa","sunay-akin":"Sunay Akın","tevfik-fikret":"Tevfik Fikret","turgut-uyar":"Turgut Uyar","veysel-colak":"Veysel Çolak","william-shakespeare":"William Shakespeare",
"yilmaz-erdogan":"Yılmaz Erdoğan","yilmaz-guney":"Yılmaz Güney","yunus-emre":"Yunus Emre","ziya-gokalp":"Ziya Gökalp"}

export default class Poem extends Component {  

      constructor(){
        super()
        this.state={
          stateTitle:"Şiir",
            screenWidth: Dimensions.get("window").width,
            screenHeight: Dimensions.get("window").height
        }
    }
    static navigationOptions = {
      title: this.stateTitle,
      headerStyle: {
        backgroundColor: 'rgb(244,197,168)',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    };
  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  
  render() {
    navigation = this.props.navigation
    currentPoet = navigation.getParam('poet',"default poet").toString();
    currenttPoet = poetNames[currentPoet]
    const currentPoemName = navigation.getParam('poem',"default poet").toString();
    titlesOfCurrentPoet = []
    wholePoemsArr = []
    for(var key in json[currentPoet]){
      idOfCurrentPoet.push(key)
  }
  for (var i = 0; i < idOfCurrentPoet.length; i++){
      titlesOfCurrentPoet.push(json[currentPoet][idOfCurrentPoet[i]]['Title'])
      wholePoemsArr.push(json[currentPoet][idOfCurrentPoet[i]]['Poem'])
  }
  indexOfTitle = this.getKeyByValue(titlesOfCurrentPoet,currentPoemName)
  poemItself = wholePoemsArr[indexOfTitle]

   return(
    <View style = {{flex: 1, width: 100+"%",height:100+"%",backgroundColor:"rgb(215,213,212)"}}>
    <ScrollView>
            <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-2845440886580404/4033439858"
            testDeviceID={[AdMobBanner.simulatorId]}/>
      <View style={styles.titleBar}>
        <Text style={{fontSize:13}}>
        {currentPoemName}
        </Text>
      </View>
      <View style={styles.poetBar}>
      <View style = {{flex:1}}>
      <Text>

      </Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{textAlign: 'right', alignSelf: 'stretch',fontSize:10}}>
        {currenttPoet}
        </Text>
        </View>
      </View>
      <View style = {{flex:1, width: 100+"%", height:90+"%"}}>
        <Text>
        {poemItself}
        </Text>
    </View>
    </ScrollView>
    </View>
   );
  }
}


const styles = StyleSheet.create({
  titleBar: {
      width: 100+"%",
      height: 30,
      flexDirection: "row",
      paddingHorizontal: 10,
      justifyContent: "space-between",
      },
  poetBar: {
    width: 100+"%",
    height: 15,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    },
  });