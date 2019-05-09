import React, { Component } from 'react';  
import {Text,View,StyleSheet,TouchableOpacity,Dimensions,ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
var json = require("../../../poems.json");
import {AdMobBanner
    ,AdMobInterstitial
} from 'react-native-admob';
import config from '../../../config/index.js'
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

var poets = []
for(var key in json){
    poets.push(key)
}

export default class randomPoem extends Component {  
    static navigationOptions = {
      header:null
    };
    constructor(){
        super()
        this.state={newEntered: true,
            liked: true,
            poet:"",
            poetDb:"",
            poem:"",
            poemItself:"",
              screenWidth: Dimensions.get("window").width,
              screenHeight: Dimensions.get("window").height
          }
        AdMobInterstitial.setAdUnitID("ca-app-pub-2845440886580404/2794124772");
        //AdMobInterstitial.setTestDevices(["15a66beb"]);
        AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
    }
    componentDidMount(){
        this.setState({newEntered:true})
        console.log("giriyo")
        randomNumPoet =this.randomIntFromInterval(0, poets.length-1)
        chosenPoet = poets[randomNumPoet]
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
        this.setState({poet: chosenPoett})
        this.setState({poetDb: chosenPoet})
        this.setState({poem: chosenPoemTitleFromPoet})
        this.setState({poemItself: chosenPoemFromPoet})
    }
  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  randomIntFromInterval(min,max) // min and max included
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }
  likeToggled(bool){
    this.setState({
        liked: bool
    })
  }
  findInArray(array, index){
    return array.filter(item => item.indexOf(index) > -1);
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
  myFunc(){
    this.componentDidMount()
  }
  render() {
    poemandpoet= this.state.poetDb+ "|"+ this.state.poem
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
      this.favorites(this.state.poem, this.state.poetDb)
    }}>
    <Icon
    name={iconName}
    size={30}
    color={iconColor}
    background="white"/>
</TouchableOpacity>
prevPage = <TouchableOpacity onPress={() => this.props.navigation.push(this.props.navigation.navigate('Home'))}>
<Icon
name = "back"
size={30}
color = "black"
background="white"/>
</TouchableOpacity>;
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
            adUnitID="ca-app-pub-2845440886580404/4033439858"/>
                <View style={styles.titleBar}>
                    <Text style={{fontSize:15}}>
                    {this.state.poem}
                    </Text>
                </View>
                <View style={styles.poetBar}>
                <View style = {{flex:1}}>
                <Text>

                </Text>
                </View>
                <View style={{flex:1}}>
                <Text style={{textAlign: 'right', alignSelf: 'stretch',fontSize:10}}>
                    {this.state.poet}
                    </Text>
                    </View>
                </View>
                <View style = {{flex:1, width: 100+"%", height:90+"%"}}>
                    <Text style={{fontStyle:"italic",fontSize:20}}>
                    {this.state.poemItself}
                    </Text>
                </View>
                <View style={{flex:1,width:100+"%",alignItems:"center"}}>
                <TouchableOpacity style={styles.TouchableOpacityStyle}
                activeOpacity= {0.8}
                onPress = {() => {
                    this.myFunc()
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
          height: 15,
          flexDirection: "row",
          paddingHorizontal: 10,
          justifyContent: "space-between",
          },
    poets:{
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.3)',
        padding: 10
    },  
    });
    