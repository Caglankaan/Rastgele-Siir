import React, { Component } from "react";
import { Text,TouchableOpacity, StyleSheet,View } from "react-native";
import config from "../../../config/index.js";
import { ScrollView } from "react-native-gesture-handler";
var json = require("../../../poems.json")
import {AdMobBanner,AdMobInterstitial} from 'react-native-admob';

var poetNames = {"ah-muhsin-unlu":"Ah Muhsin Ünlü","ahmet-hamdi-tanpinar":"Ahmet Hamdi Tanpınar","ali-lidar":"Ali Lidar","arif-damar":"Arif Damar","asik-veysel-satiroglu":"Aşık Veysel Satıroğlu",
"attila-ilhan":"Attila İlhan","cahit-koytak":"Cahit Koytak","cahit-sitki-taranci":"Cahit Sıtkı Tarancı","can-dundar":"Can Dündar","can-yucel":"Can Yücel","celal-silay":"Celal Silay","cemal-sureya":"Cemal Süreya",
"didem-madak":"Didem Madak","ece-ayhan":"Ece Ayhan","edip-cansever":"Edip Cansever","friedrich-nietzsche":"Friedrich Nietzsche","hasan-huseyin-korkmazgil":"Hasan Hüseyin Korkmazgil",
"ilhan-berk":"İlhan Berk","mehmet-emin-yurdakul":"Mehmet Emin Yurdakul","muzaffer-tayyip-uslu":"Muzaffer Tayyip Uslu","nahit-ulvi-akgun":"Nahit Ulvi Akgün","nazim-hikmet":"Nazım Hikmet",
"necip-fazil-kisakurek":"Necip Fazıl Kısakürek","neset-ertas":"Neşet Ertaş","neyzen-tevfik":"Neyzen Tevfik","omer-hayyam":"Ömer Hayyam","orhan-veli-kanik":"Orhan Veli Kanık","ozdemir-asaf":"Özdemir Asaf",
"peyami-safa":"Peyami Safa","sunay-akin":"Sunay Akın","tevfik-fikret":"Tevfik Fikret","turgut-uyar":"Turgut Uyar","veysel-colak":"Veysel Çolak","william-shakespeare":"William Shakespeare",
"yilmaz-erdogan":"Yılmaz Erdoğan","yilmaz-guney":"Yılmaz Güney","yunus-emre":"Yunus Emre","ziya-gokalp":"Ziya Gökalp"}

var allPoets = []
for(var key in json){
    allPoets.push(key)
}

export default class randomPoemWithPoet extends Component{
    
    constructor(){
        super();
        this.state = {
        poets:[],
        checked:false
        };
        AdMobInterstitial.setAdUnitID("ca-app-pub-2845440886580404/2794124772");
        AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }
      randomIntFromInterval(min,max) // min and max included
      {
          return Math.floor(Math.random()*(max-min+1)+min);
      }
    render(){
        myArr = []
        const {navigation} = this.props;
        const checkedList = navigation.getParam('checkedList',[]);

        for(let i = 0; i< checkedList.length;i++){
            if(checkedList[i]){
                myArr.push(allPoets[i])
            }
        }
        randomNumPoet =this.randomIntFromInterval(0, myArr.length-1)
        chosenPoet = myArr[randomNumPoet]
        chosenPoett = poetNames[chosenPoet]
        idOfChosenPoet = []
        for(var key in json[chosenPoet]){
            idOfChosenPoet.push(key)
        }
        randomNumPoem = this.randomIntFromInterval(0,idOfChosenPoet.length-1)
        titlesOfChosenPoet = []
        poemsOfChosenPoet = []
    
        for (var i = 0; i < idOfChosenPoet.length; i++){
            titlesOfChosenPoet.push(json[chosenPoet][idOfChosenPoet[i]]['Title'])
            poemsOfChosenPoet.push(json[chosenPoet][idOfChosenPoet[i]]['Poem'])
        }
        chosenPoemFromPoet = poemsOfChosenPoet[randomNumPoem]
        chosenPoemTitleFromPoet = titlesOfChosenPoet[randomNumPoem]

        return (

            <View style = {{flex: 1, width: 100+"%",height:100+"%",backgroundColor:"rgb(215,213,212)"}}>
            <ScrollView>
            <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-2845440886580404/4033439858"
            testDeviceID={[AdMobBanner.simulatorId]}/>
                <View style={styles.titleBar}>
                    <Text style={{fontSize:11}}>
                    {chosenPoemTitleFromPoet}
                    </Text>
                </View>
                <View style={styles.poetBar}>
                <View style = {{flex:1}}>
                <Text>

                </Text>
                </View>
                <View style={{flex:1}}>
                <Text style={{textAlign: 'right', alignSelf: 'stretch',fontSize:10}}>
                    {chosenPoett}
                    </Text>
                    </View>
                </View>
                <View style = {{flex:1, width: 100+"%", height:90+"%"}}>
                    <Text>
                    {chosenPoemFromPoet}
                    </Text>
                </View>
                <View style={{flex:1,width:100+"%",alignItems:"center"}}>
                <TouchableOpacity style={styles.TouchableOpacityStyle}
                activeOpacity= {0.8}
                onPress = {() => {
                    this.setState({dummy:1})
                }}
                >
                    <Text style={styles.textStyle}>Yeni Şiir</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>

            </View>
            );
        
        }
    }


const styles = StyleSheet.create({
    TouchableOpacityStyle:{
        width:50+"%",
        marginBottom:10,
        height:30,
        alignItems:"center",
        marginTop:10,
        backgroundColor:"rgb(244,197,168)"
    },

textStyle:{
    color:"black",
    //fontFamily:"sans-serif-condensed",
    lineHeight:30,
    alignContent:"center"
},
    titleBar: {
        width: 100+"%",
        height: 30,
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: "space-between",
        },
    poetBar: {
      width: 100+"%",
      marginTop:5,
      height: 15,
      flexDirection: "row",
      paddingHorizontal: 10,
      justifyContent: "space-between",
      },
});
