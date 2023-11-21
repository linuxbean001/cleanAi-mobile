import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Songs from './src/components/Songs';
import Login from './src/components/auth/Login';
import Register from './src/components/auth/Register';
import ForgotPassword from './src/components/auth/ForgotPassword';
import Verification from './src/components/Verification';
import Scenes from './src/components/Scenes';
import Scene from './src/components/Scene';
import ScenePlayOnPhone from './src/components/ScenePlayOnPhone';
import SceneSettings from './src/components/SceneSettings';
import Menu from './src/components/Menu';
import Plans from './src/components/Plans';
import AddToCart from './src/components/AddToCart';
import Cart from './src/components/Cart';
import Paypal from './src/components/Paypal';
import Checkout from './src/components/Checkout';
import Toast from 'react-native-toast-message';
import TrackPlayer from 'react-native-track-player';
const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    TrackPlayer.setupPlayer();
  }, []);
  return (   
   <NavigationContainer>
     <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="songs" component={Songs} />
       <Stack.Screen name="plans" component={Plans} />
       <Stack.Screen name="addtocart" component={AddToCart} />
       <Stack.Screen name="cart" component={Cart} />
       <Stack.Screen name="paypal" component={Paypal} />
       <Stack.Screen name="checkout" component={Checkout} />
       <Stack.Screen name="login" component={Login} />
       <Stack.Screen name="register" component={Register} />
       <Stack.Screen name="forgotPassword" component={ForgotPassword} />
       <Stack.Screen name="verification" component={Verification} />
       <Stack.Screen name="scenes" component={Scenes} />
       <Stack.Screen name="scene" component={Scene} />
       <Stack.Screen name="scenePlayOnPhone" component={ScenePlayOnPhone} />
       <Stack.Screen name="sceneSettings" component={SceneSettings} />
     </Stack.Navigator>
     <Toast />
   </NavigationContainer>
  );
}

export default App;
