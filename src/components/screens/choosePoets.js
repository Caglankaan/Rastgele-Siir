import React, { Component } from "react";
import { View, Text,Button, StyleSheet,TouchableOpacity } from "react-native";
import config from "../../../config/index.js";
import { ScrollView } from "react-native-gesture-handler";
var json = require("../../../poems.json")
import { CheckBox } from 'react-native-elements'

var allPoets = []
for(var key in json){
    allPoets.push(key)
}


export default class choosePoets extends Component{
    
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

    myFunc(){
        myArr=[]
        for(let i = 0; i < allPoets.length; i++){
            checkedPoets.push(false)
            myArr.push(
                <CheckBox
                center
                title={allPoets[i]}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                onPress={(key)=> alert("title is : "+key)}
                checked={this.state.checkedClone[i]}
            />
            );
        }
    }
    render(){
        myArr=[]
        checkedPoets=[]
        for(let i = 0; i < allPoets.length; i++){
            checkedPoets.push(false)
            myArr.push(
                <CheckBox
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
