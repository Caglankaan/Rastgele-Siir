import React, { Component } from 'react';  
import { View, Text, StyleSheet, TouchableOpacity,Dimensions, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {withNavigation} from 'react-navigation'
import SearchInput from 'react-native-search-filter';
import {AdMobBanner} from 'react-native-admob';
import config from "../../../config/index.js";
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';

var json = require("../../../poems.json")

var poetNames = {"ah-muhsin-unlu":"Ah Muhsin Ünlü","ahmet-hamdi-tanpinar":"Ahmet Hamdi Tanpınar","ali-lidar":"Ali Lidar","arif-damar":"Arif Damar","asik-veysel-satiroglu":"Aşık Veysel Satıroğlu",
"attila-ilhan":"Attila İlhan","cahit-koytak":"Cahit Koytak","cahit-sitki-taranci":"Cahit Sıtkı Tarancı","can-dundar":"Can Dündar","can-yucel":"Can Yücel","celal-silay":"Celal Silay","cemal-sureya":"Cemal Süreya",
"didem-madak":"Didem Madak","ece-ayhan":"Ece Ayhan","edip-cansever":"Edip Cansever","friedrich-nietzsche":"Friedrich Nietzsche","hasan-huseyin-korkmazgil":"Hasan Hüseyin Korkmazgil",
"ilhan-berk":"İlhan Berk","mehmet-emin-yurdakul":"Mehmet Emin Yurdakul","muzaffer-tayyip-uslu":"Muzaffer Tayyip Uslu","nahit-ulvi-akgun":"Nahit Ulvi Akgün","nazim-hikmet":"Nazım Hikmet",
"necip-fazil-kisakurek":"Necip Fazıl Kısakürek","neset-ertas":"Neşet Ertaş","neyzen-tevfik":"Neyzen Tevfik","omer-hayyam":"Ömer Hayyam","orhan-veli-kanik":"Orhan Veli Kanık","ozdemir-asaf":"Özdemir Asaf",
"peyami-safa":"Peyami Safa","sunay-akin":"Sunay Akın","tevfik-fikret":"Tevfik Fikret","turgut-uyar":"Turgut Uyar","veysel-colak":"Veysel Çolak","william-shakespeare":"William Shakespeare",
"yilmaz-erdogan":"Yılmaz Erdoğan","yilmaz-guney":"Yılmaz Güney","yunus-emre":"Yunus Emre","ziya-gokalp":"Ziya Gökalp"}

class Poems extends Component {  
    static navigationOptions = {
        header:null
      };
    
    constructor(){
        super()
        this.state={
            search:'',
            screenWidth: Dimensions.get("window").width,
            screenHeight: Dimensions.get("window").height
        }
    }
    findInArray(array, index){
        return array.filter(item => item.indexOf(index) > -1);
     }

    searchUpdated(term) {
        this.setState({ search: term })
      }
    getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
      }
  render() {
    navigation = this.props.navigation

    prevPage = <TouchableOpacity onPress={() => navigation.push('Poets')}>
    <Icon
    name = "back"
    size={30}
    color = "black"
    background="white"/>
  </TouchableOpacity>;
    myloop=[]
    navigation = this.props.navigation
    currenttPoet = navigation.getParam('poet',"default poet");
    currentPoet = this.getKeyByValue(poetNames,currenttPoet)
    numbersOfCurrentPoet = []
    titlesOfCurrentPoet = []
    idOfCurrentPoet = []
    
    for(var key in json[currentPoet]){
        idOfCurrentPoet.push(key)
    }
    for (var i = 0; i < idOfCurrentPoet.length; i++){
        titlesOfCurrentPoet.push(json[currentPoet][idOfCurrentPoet[i]]['Title'])
        numbersOfCurrentPoet.push(json[currentPoet][idOfCurrentPoet[i]]['Number'])
    }
    if(this.state.search == ""){
        for (let i = 0; i < titlesOfCurrentPoet.length; i++) {
            myloop.push(
                <View key={i}>
                    <TouchableOpacity
                    activeOpacity={.7}
                    onPress={() =>  navigation.navigate('Poem',{poet:currentPoet, poem: titlesOfCurrentPoet[i]})}
                    >
                        <Text style= {styles.poems}>{numbersOfCurrentPoet[i]}- {titlesOfCurrentPoet[i]}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    else{
        myElements = this.findInArray(titlesOfCurrentPoet, this.state.search)
            for(let i = 0; i < myElements.length;i++){
            myloop.push(
                <View key={i}>
                    <TouchableOpacity
                    activeOpacity={.7}
                    onPress={() =>  navigation.navigate('Poem',{poet:currentPoet, poem: myElements[i]})}
                    >
                        <Text style= {styles.poems}>{i+1} - {myElements[i]}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    return (
        <View style = {{flex: 1, width: 100+"%",backgroundColor:"rgb(242,235,229)"}}>
        <View style={{width:100+"%"}}>
                <Header
                    barStyle="light-content" // or directly
                    containerStyle={{
                    backgroundColor: 'rgb(242,235,229)',
                    }}
                    leftComponent={prevPage}
                    centerComponent={{ text: 'Şiirler', style: { color: 'black' } }}
                    />
            </View>
        <SearchInput 
                    onChangeText={(term) => { this.searchUpdated(term) }} 
                    style={styles.searchInput}
                    placeholder="Şiir Ara"
                    />
                <ImageBackground style={{width:100+"%",height:100+"%",position:'absolute',marginLeft:this.state.screenWidth / 3 -20, marginTop:this.state.screenHeight/4 + 30}} source={config.images.poems_background}/>

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
  poems:{
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

export default  withNavigation(Poems);