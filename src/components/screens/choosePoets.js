import React, { Component } from "react";
import { View, Text,Button, StyleSheet,TouchableOpacity } from "react-native";
import config from "../../../config/index.js";
import { ScrollView } from "react-native-gesture-handler";
var json = require("../../../poems.json")
import { CheckBox } from 'react-native-elements'

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
for(let i = 0;i < allPoetss.length;i++){
    allPoets.push(poetNames[allPoetss[i]])
}

export default class choosePoets extends Component{
    static navigationOptions = {
        title: 'Şair Seç',
        headerStyle: {
          backgroundColor: 'rgb(202,215,206)',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };
    
    constructor(){
        super();
        this.state = {
        checked:[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
        };
    }
    _onPress(index){
        checkedClone = this.state.checked.slice();
        checkedClone[index] = !checkedClone[index]
        this.setState({checked: checkedClone})
    }

    render(){
        myArr=[]
        checkedPoets=[]
        for(let i = 0; i < allPoets.length; i++){
            checkedPoets.push(false)
            myArr.push(
                <CheckBox
                key = {i+1}
                width = {100+"%"}
                containerStyle={{/*width:50+"%",*/backgroundColor : "rgb(202,215,206)"}}
                title={allPoets[i]}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checkedColor="blue"
                onPress={()=>this._onPress(i)}
                checked={this.state.checked[i]}
            />
            );
        }
        const { tag }= this.props;
        return (
            <View  style={{backgroundColor:"rgb(202,215,206)",alignItems:"center", flex:1,width:100+"%"}}>
            <ScrollView style={{backgroundColor:"rgb(202,215,206)", width:100+"%"}}>
                {myArr}
                </ScrollView>
                <TouchableOpacity style={styles.TouchableOpacityStyle}
                activeOpacity= {0.8}
                onPress = {() => {
                    this.props.navigation.navigate('randomPoemWithPoet', {checkedList: this.state.checked});
                }}
                >
                    <Text style={styles.textStyle}>Seçtiğim şairlerden rastgele şiir ver</Text>
                </TouchableOpacity>
            </View>
            );
        
        }
    }


const styles = StyleSheet.create({
    TouchableOpacityStyle:{
        width:70+"%",
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
poets:{
    borderBottomWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.3)',
    padding: 10
}
});
