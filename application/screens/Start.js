import React, {Component} from 'react';
import {View} from 'react-native';
import AppButton from '../components/AppButton';
import BackgroundImage from '../components/BackgroundImage';
import {NavigationActions} from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast'
import * as firebase from 'firebase';
import facebook from '../utils/facebook';

export default class Start extends Component {

  static navigationOptions = {
    title: 'Expo App'
  };

  login(){
    const navigateAction = NavigationActions.navigate({
      routeName: 'Login'
    });
    this.props.navigation.dispatch(navigateAction);
  }
  register(){
    const navigateAction = NavigationActions.navigate({
      routeName: 'Register'
    });
    this.props.navigation.dispatch(navigateAction);
  }
  async facebook(){
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
      facebook.config.application_id,
      {permissions: facebook.config.permissions}
    );

    if(type === "success"){
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credentials)
        .catch((error) => {
          this.refs.toast.show("Error al acceder con Facebook", this.LONG, this.TOP);
        });
    } else if(type === "cancel"){
      this.refs.toast.show("Cancelado por el usuario", this.LONG, this.TOP);
    } else {
      this.refs.toast.show("Se ha producido un error", this.LONG, this.TOP);
    }
  }
  render(){
    return(
      <BackgroundImage
        source = {require('../../assets/images/Background.jpg')}
      >
        <View style={{justifyContent: 'center', flex: 1}}>
          <AppButton
            bgColor = "rgba(111, 38, 74, 0.7)"
            title = "Iniciar sesión"
            action = {this.login.bind(this)}
            iconName = "sign-in"
            iconSize = {30}
            iconColor = "#fff"
          />
          <AppButton
            bgColor = "rgba(200, 200, 50, 0.7)"
            title = "Registrate"
            action = {this.register.bind(this)}
            iconName = "user-plus"
            iconSize = {30}
            iconColor = "#fff"
          />
          <AppButton
            bgColor = "rgba(67, 67, 146, 0.7)"
            title = "Facebook"
            action = {this.facebook.bind(this)}
            iconName = "facebook"
            iconSize = {30}
            iconColor = "#fff"
          />
        </View>
      </BackgroundImage>
    );
  }
}
