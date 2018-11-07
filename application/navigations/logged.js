import React from 'react';
import RestaurantsScreen from '../screens/Restaurants/Restaurants';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const navigationOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'rgba(200, 38, 74, 1)'
    },
    headerTitleStyle: {
      textAlign: 'center',
      alignSelf: 'center',
      fontSize: 20,
      color: '#fff',
      fontWeight: 'bold'
    }
  }
};

const leftIcon = (navigation, icon) => <Icon
  name={icon}
  style={{marginLeft: 20, }}
  size={20}
  color='white'
  onPress={() => navigation.navigate('DrawerOpen')}
/>;

const rightIcon = (navigation, icon) => <Icon
  name={icon}
  style={{marginLeft: 20, }}
  size={30}
  color='white'
  onPress={() => navigation.navigate('ListRestaurants')}
/>;

const restaurantsScreenStack = StackNavigator(
  {
    ListRestaurants: {
      screen: RestaurantsScreen,
      navigationOptions: ({navigation}) => ({
        title: 'Restaurantes',
        drawerIcon: ({tintColor}) => (<Icon name="home" size={24} style={{color:tintColor}}/>),
        headerLeft: leftIcon(navigation, 'bars')
      }),
    }
  },
  navigationOptions
)

export default DrawerNavigator(
  {
    RestaurantsScreen: {
      screen: restaurantsScreenStack
    }
  },
  {
    drawerBackgroundColor: 'rgba(128, 35, 60, 0.7)',
    contentOptions: {
      activeTintColor: 'white',
      activeBackgroundColor: 'transparent',
      inactiveTintColor: 'white',
      itemsContainerStyle: {
        marginVertical: 0
      }
    }
  }
)
