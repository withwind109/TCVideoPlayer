/**
 * Created by tangchao on 16/8/24.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Navigator,
    StyleSheet
} from 'react-native';

import VideoList from './src/VideoList.js';

export default class App extends Component {
    render() {
        return (
            <Navigator
                style={{flex: 1}}
                initialRoute={{component: VideoList}}
                configureScene={this.configureScene}
                renderScene={this.renderScene}/>
        );
    }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
    }

    renderScene(route, navigator) {
        return <route.component navigator={navigator}  {...route.passProps} />;
    }
}

const styles = StyleSheet.create({});