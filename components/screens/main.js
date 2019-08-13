import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';

import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

export default class main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      date: '',
      name: '',
      regNumber: '',
    };
  }

  async componentWillMount() {
    var username='';
    var regNum='';
    try {
      username = await AsyncStorage.getItem("USER_NAME");
      regNum = await AsyncStorage.getItem("USER_REG_NUM");
    } catch (error) {
      // Error retrieving data
    } 
    var today = new Date();
    date = today.getDate() + "/" + parseInt(today.getMonth() + 1) + "/" + today.getFullYear();
    console.log(date);
    var text1 = date +"%"+regNum;
    this.setState({
      text: text1,
      name: username,
      regNumber: regNum
    });
  }

  logOut() {
    Alert.alert("Successfully Logged out !");
    AsyncStorage.setItem("LOGIN_STATUS", "LoggedOut");
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <View style={styles.containerMain}>
              <View style={styles.container}>
      <QRCode
      style={styles.qrCode}
      value={this.state.text}
      size={200}
      bgColor='purple'
      fgColor='white'/>
    </View>
        <Text style={styles.welcome}>Welcome {this.state.name} !</Text>
        <Text style={styles.reg}>Registration Number {this.state.regNumber} </Text>
        <Text style={styles.head}>Your QR Code:</Text>
        <TouchableOpacity
          style={styles.btnSubmit}
          onPress={() => this.logOut()}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.note}>Note: The QR Code is valid for only today.</Text>
        <Text style={styles.disclaimer}>Developed by: DSC Amaravati</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  containerMain: {
    height: '100%',
    width: '100%',
  },
  welcome: {
    position:'absolute',
    fontSize:20,
    height:60,
    textAlignVertical:'center',
    width:'70%',
    fontWeight:'bold',
    marginTop: '10%',
    marginLeft: 30,
  },
  reg:{
    position:'absolute',
    fontSize:17,
    height:30,
    textAlignVertical:'center',
    width:'70%',
    fontWeight:'bold',
    marginTop: "27%",
    marginLeft: 30,
  },
  head:{
    position:'absolute',
    marginTop:'55%',
    fontSize:32,
    fontWeight:'bold',
    width:'100%',
    alignContent:'center',
    textAlign:'center',
  },
  container: {
    flex: 1,
    marginTop:'70%',
    height:'50%',
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    marginTop: 100,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
  },
  btnSubmit: {
    position: 'absolute',
    top: 10,
    right: 20,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 60,
    elevation:2,
  },
  disclaimer:{
    position:'absolute',
    width:'100%',
    bottom:'5%',
    height:40,
    fontSize:18,
    textAlign:'center',
    alignContent:'center',
    textAlignVertical:'center',
    backgroundColor:'#f7f7f7',
  },
  note:{
    position:'absolute',
    width:'100%',
    bottom:'20%',
    height:40,
    fontSize:18,
    textAlign:'center',
    alignContent:'center',
    textAlignVertical:'center',
  }
});

AppRegistry.registerComponent('HelloWorld', () => HelloWorld);
