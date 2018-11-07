import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import AppButton from '../components/AppButton';
import t from 'tcomb-form-native';
import FormValidation from '../utils/validation';
import {Card} from 'react-native-elements';
import * as firebase from 'firebase';
import Toast, {DURATION} from 'react-native-easy-toast'

const Form = t.form.Form;

export default class Login extends Component{

  constructor(){
    super();
    this.user = t.struct({
      email: FormValidation.email,
      password: FormValidation.password
    });
    this.options = {
      fields: {
        email: {
          help: 'Ingresa tu dirección de correo',
          error: 'La dirección de correo no es valida',
          autoCapitalize: 'none'
        },
        password: {
          help: 'Ingresa tu contraseña',
          error: 'La contraseña no es valida',
          password: true,
          secureTextEntry: true
        }
      }
    }
  }

  login(){
    const validate = this.refs.form.getValue();
    if(validate){
      firebase.auth().signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          this.refs.toast.show("Bienvenido", this.LONG, this.BOTTOM);
        })
        .catch((e) => {
          const errorCode = e.code;
          const errorMessage = e.message;
          if(errorCode == 'auth/wrong-password'){
            this.refs.toast.show("Contraseña incorrecta", this.LONG, this.BOTTOM);
          } else {
            this.refs.toast.show(errorMessage, this.LONG, this.BOTTOM);
          }
        });
    }
  }

  render(){
    return(
      <BackgroundImage source={require('../../assets/images/Background.jpg')}>
        <View>
          <Card wrapperStyle={{paddingLeft:10}} title="Iniciar sesión">
            <Form
              ref="form"
              type={this.user}
              options={this.options}
            />
            <AppButton
              bgColor = "rgba(111, 38, 74, 0.7)"
              title = "Iniciar sesión"
              action = {this.login.bind(this)}
              iconName = "sign-in"
              iconSize = {30}
              iconColor = "#fff"
            />
          </Card>
        </View>
        <Toast ref="toast"/>
      </BackgroundImage>
    );
  }

}
