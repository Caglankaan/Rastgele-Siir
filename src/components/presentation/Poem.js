import React, { Component } from 'react';  
import {View, Text,Dimensions,StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
var json = require("../../../poems.json");
import { ScrollView } from 'react-native-gesture-handler';
import {AdMobBanner} from 'react-native-admob';
import config from "../../../config/index.js";
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { showMessage } from "react-native-flash-message";
var RNFS = require('react-native-fs');


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
          newEntered: true,
          liked: true,
          poet:"",
          poem:"",
            screenWidth: Dimensions.get("window").width,
            screenHeight: Dimensions.get("window").height
        }
    }
    static navigationOptions = {
      header:null
    };
  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  likeToggled(bool){
    this.setState({
        liked: bool
    })
  }
  findInArray(array, index){
    return array.filter(item => item.indexOf(index) > -1);
}

componentDidMount(){
/*
  poem = this.props.navigation.getParam('poem')
  poet = this.props.navigation.getParam('poet')
  console.log("poem is : ",poem," and poet is : ",poet)
  this.setState({poem:poem})
  this.setState({poet:poet})
  this.setState({newEntered:true})
  */
}

  async favorites(poem, poet){
    this.setState({newEntered:false})
    filename= "favorites.txt"
    var rootPath = RNFS.DocumentDirectoryPath
    var readPath = rootPath + '/' + filename;
    var content = await RNFS.readFile(readPath, 'utf8')
   if(content == ""){
    global.fileContent = poet+"|"+poem 
   }
   else{
    global.fileContent = content
    global.fileContent = poet+"|"+poem +"\n"+global.fileContent
   }
   myArr = global.fileContent.split('\n')
   inFile = this.findInArray(myArr,poet+"|"+poem)
   if(inFile.length===2){
    showMessage({
        message: "Deleted from favorites",
        type: "info",
        backgroundColor: "rgb(40,40,40)", // background color
        color: "rgb(175,175,175)", 
      });
     global.fileContent=""
     for(var i=0;i<myArr.length; i++){
      if (myArr[i] === poet+"|"+poem){
        this.likeToggled(false)
        console.log("already in list")
      }
      else{
        if(global.fileContent == ""){
          global.fileContent= myArr[i]
        }
        else{
          global.fileContent = global.fileContent +"\n"+ myArr[i]
        }
          var path = RNFS.DocumentDirectoryPath + '/favorites.txt';
          RNFS.writeFile(path, global.fileContent, 'utf8')
            .then((success) => {
              console.log('FILE WRITTEN!');
            })
            .catch((err) => {
              console.log("error is : " ,err.message);
            });
      }
     }
   }
   else{
    showMessage({
        message: "Added to favorites",
        type: "info",
        backgroundColor: "rgb(40,40,40)", // background color
        color: "rgb(175,175,175)", 
      });
    this.likeToggled(true)
    var path = RNFS.DocumentDirectoryPath + '/favorites.txt';
    RNFS.writeFile(path, global.fileContent, 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log("error is : " ,err.message);
      });
   }

   this.readFile()
    
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
  clearFile(){
    var path = RNFS.DocumentDirectoryPath + '/favorites.txt';
    RNFS.writeFile(path, "", 'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        console.log("error is : " ,err.message);
      });
  }
  render() {
    //console.log("render a girme sayisi")
    //return(<View><Text>gg</Text></View>)
    navigation = this.props.navigation
    currentPoet = navigation.getParam('poet',"default poet")
    console.log("currentpoet is : ",currentPoet)
    currenttPoet = poetNames[currentPoet]
    const currentPoemName = navigation.getParam('poem',"default poet")
    console.log("currentpoemname is : ",currentPoemName)
    poemandpoet= currentPoet +"|"+currentPoemName
    this.readFile()
    if(this.state.newEntered){
      console.log("new entered aslında")
      myArr = global.fileContent.split('\n')
      inFile = this.findInArray(myArr,poemandpoet)
      if(inFile.length===1){
        iconName = "heart" 
        iconColor = "red"
      }
      else{
        iconName = "hearto" 
        iconColor = "black"
      }
    }
    else{
      iconName = (this.state.liked) ? "heart" : "hearto"
      iconColor = (this.state.liked)? "red":"black"
    }
    favoritesIcon = <TouchableOpacity
    onPress={()=> {
      this.favorites(navigation.getParam('poem'), navigation.getParam('poet'))
    }}>
    <Icon
    name={iconName}
    size={30}
    color={iconColor}
    background="white"/>
</TouchableOpacity>
prevPage = <TouchableOpacity onPress={() => this.props.navigation.push(this.props.navigation.navigate('Poets'))}>
<Icon
name = "back"
size={30}
color = "black"
background="white"/>
</TouchableOpacity>;
    titlesOfCurrentPoet = []
    wholePoemsArr = []
    idOfCurrentPoet=[]
    
  for(var key in json[currentPoet]){
      idOfCurrentPoet.push(key)
  }
  for (var i = 0; i < idOfCurrentPoet.length; i++){
    //console.log("title shit:",json[currentPoet][idOfCurrentPoet[i]])
      titlesOfCurrentPoet.push(json[currentPoet][idOfCurrentPoet[i]]['Title'])
      wholePoemsArr.push(json[currentPoet][idOfCurrentPoet[i]]['Poem'])
  }
  indexOfTitle = this.getKeyByValue(titlesOfCurrentPoet,currentPoemName)
  poemItself = wholePoemsArr[indexOfTitle]

   return(
    <View style = {{flex: 1, width: 100+"%",height:100+"%",backgroundColor:"rgb(215,213,212)"}}>
    <View style={{width:100+"%",alignItems:"center"}}>
        <Header
            barStyle="light-content" // or directly
            containerStyle={{
            backgroundColor: 'rgb(215,213,212)',
            justifyContent: 'center',
            alignItems: 'stretch',
            }}
            leftComponent={prevPage}
            centerComponent={{ text: 'Şiir', style: { color: 'black',marginBottom:5 } }}
            rightComponent={favoritesIcon}
            />
     </View>
          <ImageBackground style={{opacity:0.3,width:100+"%",height:100+"%",position:'absolute',marginLeft:this.state.screenWidth / 3 -20, marginTop:this.state.screenHeight/4 + 30}} source={config.images.poem_background}/>
    <ScrollView>
            <AdMobBanner
            adSize="fullBanner"
            adUnitID="ca-app-pub-2845440886580404/4033439858"
            //testDeviceID={[AdMobBanner.simulatorId]}
            />
      <View style={styles.titleBar}>
        <Text style={{fontStyle:"italic",fontSize:13}}>
        {currentPoemName}
        </Text>
      </View>
      <View style={styles.poetBar}>
      <View style = {{flex:1}}>
      <Text>

      </Text>
      </View>
      <View style={{flex:1}}>
      <Text style={{fontStyle:"italic",textAlign: 'right', alignSelf: 'stretch',fontSize:10}}>
        {currenttPoet}
        </Text>
        </View>
      </View>
      <View style = {{flex:1, width: 100+"%", height:90+"%"}}>
        <Text style={{fontSize:20, fontStyle:"italic"}}>
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