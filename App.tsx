import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './src/store'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/screens/Home';
import UpdateProduct from './src/screens/UpdateProduct';


const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Notifications" component={UpdateProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App