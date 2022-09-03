/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import AppVertical from './AppVertical';
import {name as appName} from './app.json';
import fade from './fade';
AppRegistry.registerComponent(appName, () => fade);
