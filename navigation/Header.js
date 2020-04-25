import React from 'react';
//import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import * as Icon from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  
} from 'react-navigation-tabs';
import {
    
    createStackNavigator
  } from 'react-navigation-stack';
import ListofDecks from '../components/ListofDecks';
import AddNewDeck from '../components/AddNewDeck';
import DetailsMain from '../components/DetailsMain';
import AddNewCard from '../components/AddNewCard';
import Quiz from '../components/Quiz';
import Config from '../components/Config';

import { darkGray, white, green, lightGreen } from '../utils/colors';

//const isIOS = Platform.OS === 'ios' ? true : false;

const routeConfigs = {
  Decks: {
    screen: ListofDecks,
    navigationOptions: {
      tabBarLabel: 'List Of Decks',
      tabBarIcon: ({ tintColor }) => (
        <Icon.Ionicons
          name={'md-bookmarks'}
          size={30}
          color={tintColor}
        />
      )
    }
  },
  AddNewDeck: {
    screen: AddNewDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => (
        <Icon.FontAwesome name="plus-square" size={30} color={tintColor} />
      )
    }
  },
  Config: {
    screen: Config,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon.FontAwesome name="sliders" size={30} color={tintColor} />
      )
    }
  }
};

// routeConfigs.Decks.navigationOptions.tabBarIcon.propTypes = {
//   tintColor: PropTypes.string.isRequired
// };
// routeConfigs.AddNewDeck.navigationOptions.tabBarIcon.propTypes = {
//   tintColor: PropTypes.string.isRequired
// };
// routeConfigs.Config.navigationOptions.tabBarIcon.propTypes = {
//   tintColor: PropTypes.string.isRequired
// };

const tabNavigatorConfig = {
  navigationOptions: {
    header:()=> false
  },
  defaultNavigationOptions: {
    bounces: true
  },
  tabBarOptions: {
    activeTintColor: green,
    style: {
      height: 60,
      backgroundColor: white,
      shadowColor: 'rgba(0,0,0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      borderTopWidth: 1,
      borderTopColor: darkGray
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3
    },
    showIcon: true
  }
};

const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

const Header = createStackNavigator(
  {
    Home: {
      screen: Tabs
    },
    DetailsMain: {
        screen: DetailsMain,
      navigationOptions: {
        headerTintColor: green,
        headerStyle: {
          backgroundColor: lightGreen
        },
        title: 'Deck Details'
      }
    },
    AddNewCard: {
      screen: AddNewCard,
    navigationOptions: {
      headerTintColor: green,
      headerStyle: {
        backgroundColor: lightGreen
      },
      headerTitleStyle: {
        justifyContent: 'center',
        textAlign: 'center'
      },
      title: 'Add Card'
    }
  },
    
  
    Quiz: {
        screen: Quiz,
      navigationOptions: {
        headerTintColor: green,
        headerStyle: {
          backgroundColor: lightGreen
        },
      title: 'Quiz'
      }
    }
  },
  { headerTitleAlign: 'center' }
);

export default Header;