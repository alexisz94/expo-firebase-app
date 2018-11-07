import React, {Component} from 'react';
import {View} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import Toast, {DURATION} from 'react-native-easy-toast'
import AppButton from '../components/AppButton';
import {Card} from 'react-native-elements';
import t from 'tcomb-form-native';
import FormValidation from '../utils/validation';
import * as firebase from 'firebase';

const Form = t.form.Form;

export default class Register extends Component {

  constructor() {
    super();

    this.state = {
      user: {
        email: '',
        password: ''
      }
    };

    this.samePassword = t.refinement(t.String, (s) => {
      return s === this.state.user.password;
    });

    this.user = t.struct({
      email: FormValidation.email,
      password: FormValidation.password,
      password_confirmation: this.samePassword
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
        },
        password_confirmation: {
          help: 'Confirma tu contraseña',
          error: 'La contraseña no coincide',
          password: true,
          secureTextEntry: true
        }
      }
    }

    this.validate = null;
  }

  register(){
    this.validate = this.refs.form.getValue();
    if(this.validate){
      firebase.auth().createUserWithEmailAndPassword(
        this.validate.email, this.validate.password
      )
        .then(() => {
          this.refs.toast.show("Registro completado", this.LONG, this.BOTTOM);
        })
        .catch((error) => {
          this.refs.toast.show(error.message, this.LONG, this.BOTTOM);
        });
    }
  }

  onChange(user){
    this.setState({user});
  }

  render(){
    return(
      <BackgroundImage source={require('../../assets/images/Background.jpg')}>
        <View>
          <Card wrapperStyle={{paddingLeft: 10}} title="Registro">
            <Form
              ref="form"
              type={this.user}
              options={this.options}
              onChange={(v) => this.onChange(v)}
              value={this.state.user}
            />
            <AppButton
              bgColor = "rgba(200, 200, 50, 0.9)"
              title = "Registrarme"
              action = {this.register.bind(this)}
              iconName = "user-plus"
              iconSize = {30}
              iconColor = "#fff"
              width = {10}
            />
          </Card>
        </View>
        <Toast ref="toast"/>
      </BackgroundImage>
    );
  }

}
