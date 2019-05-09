import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
var RNFS = require('react-native-fs');
import {Button} from 'react-native-elements';
import React, {Component} from 'react';
import {StyleSheet, View,Image,TouchableOpacity,Text} from 'react-native';
import {withNavigation,HeaderBackButton} from 'react-navigation';

favorites=[]

class Favorites extends Component {
    static navigationOptions = {
        header:null
      };
    constructor(){
        super()
        this.state={
            favorites:[],
        }
    }
      componentDidMount(){
        this.setState({dummy:1})
        this.readFile()
        this.forceUpdate()
      }
     async readFile() {
        filename= "favorites.txt"
        var rootPath = RNFS.DocumentDirectoryPath
        var path = rootPath + '/' + filename;
        var content = await RNFS.readFile(path, 'utf8');
        global.fileContent = content
        myFavorites = content.split("&")
        for(var i=0;i< myFavorites.length;i++){
          this.state.favorites.push([])
          this.state.favorites[i].push(myFavorites[i])
        }
    }

    _onPress(poet, poem){
        this.props.navigation.navigate("Poem", {poem: poem, poet:poet})
    }
  render() {
    
    this.readFile()
    navigation = this.props.navigation
    fileContent = global.fileContent
    myArr = []

    for (let i = 0; i < fileContent.split('\n').length; i++) {
        myArr.push(
            <View key={i}>
                <TouchableOpacity
                activeOpacity={.7}
                onPress={() =>  this._onPress(fileContent.split("\n")[i].split("|")[0],fileContent.split("\n")[i].split("|")[1])}
                >
                    <Text style= {styles.poems}>{i+1}- {fileContent.split("\n")[i].split("|")[1]} - {fileContent.split("\n")[i].split("|")[0]}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    prevPage = <TouchableOpacity onPress={() => navigation.push('Home')}>
    <Icon
    name = "back"
    size={30}
    color = "black"
    background="white"/>
  </TouchableOpacity>;
        
        return(
            
            <View style = {{flex: 1, width: 100+"%",backgroundColor:"rgb(242,235,229)"}}>

            <View style={{width:100+"%"}}>
                <Header
                    barStyle="light-content" // or directly
                    containerStyle={{
                    backgroundColor: 'rgb(242,235,229)',
                    }}
                    leftComponent={prevPage}
                    centerComponent={{ text: 'Favori Şiirler', style: { color: 'black' } }}
                    />
            </View>

                <ScrollView style={{flex:1,width:100+"%"}}>
                    {myArr}
                </ScrollView>
                </View>
         
        )
    } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  poets:{
      borderBottomWidth: 0.5,
      borderColor: 'rgba(0,0,0,0.3)',
      padding: 10
  },  offlineText: { 
    color: '#fff'
}, offlineText: { 
    color: '#fff'
},
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width:100+"%",
    position: 'absolute',
},
});

export default withNavigation(Favorites);