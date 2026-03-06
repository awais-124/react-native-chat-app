import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import GlobalErrorBoundary from './src/components/GlobalErrorBoundary';
import AppNavigator from './src/navigation/AppNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <Provider store={store}>
      <GlobalErrorBoundary>
        <AppNavigator />
      </GlobalErrorBoundary>
    </Provider>
  </GestureHandlerRootView>
);

export default App;
