import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/Login';
import Welcome from './src/components/Welcome';
import Register from './src/components/Register';
import ForgotPassword from './src/components/ForgotPassword';
import Verification from './src/components/Verification';
import Scenes from './src/components/Scenes';
import Scene from './src/components/Scene';
import ScenePlayOnPhone from './src/components/ScenePlayOnPhone';
import SceneSettings from './src/components/SceneSettings';

const Stack = createNativeStackNavigator();

function App() {
  return (
   
   <NavigationContainer>
   <Stack.Navigator screenOptions={{headerShown: false}}>
     <Stack.Screen name="Home" component={Welcome} />
     <Stack.Screen name="login" component={Login} />
     <Stack.Screen name="register" component={Register} />
     <Stack.Screen name="forgotPassword" component={ForgotPassword} />
     <Stack.Screen name="verification" component={Verification} />
     <Stack.Screen name="scenes" component={Scenes} />
     <Stack.Screen name="scene" component={Scene} />
     <Stack.Screen name="scenePlayOnPhone" component={ScenePlayOnPhone} />
     <Stack.Screen name="sceneSettings" component={SceneSettings} />
   </Stack.Navigator>
 </NavigationContainer>
  );
}

export default App;
