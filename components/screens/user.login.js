import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, AppRegistry, AsyncStorage, ImageBackground, Image } from 'react-native';

import { StackNavigator } from 'react-navigation';
export default class UserLogin extends React.Component {

  static navigationOptions = {
    headerMode: "none",
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      regNumber: "",
      name: "",
    };
  }

  async componentWillMount() {
    var isLoggedIn = "";
    try {
      isLoggedIn = await AsyncStorage.getItem("LOGIN_STATUS");
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
    if (isLoggedIn == "LoggedIn") {
      this.props.navigation.navigate('main');
    }
  }

  login() {
    var { regNumber } = this.state;
    var { name } = this.state;
    name = name.toUpperCase();
    regNumber = regNumber.toUpperCase();
    if (regNumber == '' || name == '') {
      Alert.alert("Please fill the details !")
    }
    else if ((name == 'SHREYANS' && regNumber == '17BCD7048') || (name == 'SAMARTH' && regNumber == '17MIS7011')) {
      Alert.alert("You are an admin");
    }
    else {
      var login = "LoggedIn"
      AsyncStorage.setItem("LOGIN_STATUS", login);
      AsyncStorage.setItem("USER_NAME", name);
      AsyncStorage.setItem("USER_REG_NUM", regNumber);
      this.props.navigation.navigate("main");
    }
  }

  render() {
    return (
      <ImageBackground source={require('../../assets/class.png')} style={styles.backgroundImage} >
        <View style={styles.container}>
        <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
          <Text style={styles.name}>Your name ?</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            placeholderTextColor={"rgba(120,120,120, 0.7)"}
            placeholder={"Name"}
            underlineColorAndroid="transparent"
            onChangeText={name => this.setState({ name })}
          />
          <Text style={styles.regNum}>Registration Number ?</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            placeholderTextColor={"rgba(120,120,120, 0.7)"}
            placeholder={"Registration Number"}
            underlineColorAndroid="transparent"
            onChangeText={regNumber => this.setState({ regNumber })}
          />
          <TouchableOpacity
            style={styles.btnSubmit}
            onPress={() => this.login()}
          >
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>    
        );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '15%',
  },
  input: {
    marginTop: 10,
    fontSize: 24,
    width: "70%",
    height: 50,
    marginLeft: 15,
    padding:10,
    borderColor: '#000000',
    borderWidth: 2,
  },
  btnSubmit: {
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 120,
    backgroundColor:(100,100,100,100),
    borderRadius: 60,
    elevation:3,
  },
  backgroundImage: {
    position:'absolute',
    flex: 1,
    width: "100%",
    height: "100%",
    tintColor: '#000',
  },
  logo:{
    height:120,
    width:210,
  },
  name:{
    fontSize:22,
    fontWeight:'bold',
    width:'40%',
    backgroundColor:(100,100,100,100),
    color:'white',
    textAlign:'center',
    borderRadius:10,
    marginTop:'15%',

  },
  regNum:{
    fontSize:22,
    fontWeight:'bold',
    width:'70%',
    borderRadius:10,
    textAlign:'center',
    marginTop:30,
    backgroundColor:(100,100,100,100),
    color:'#fff'
    
  },
  submit:{
    fontSize:20,
    textAlignVertical:'center',
    justifyContent:'center',
    color:'white',

  }
});