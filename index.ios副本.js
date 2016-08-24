/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';

import Video from 'react-native-video';
import RNFS from "react-native-fs";

class TCVideoPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isPlay: false,
            path: ''
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback
                onPress={this.startPlay.bind(this)}
            >
                <View style={styles.fullScreen}>
                    {this.movieRender()}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    movieRender() {
        if (this.state.isPlay) {
            return (
                <Video
                    source={{uri: this.state.path}} // Can be a URL or a local file.
                    rate={1.0}                   // 0 is paused, 1 is normal.
                    volume={1.0}                 // 0 is muted, 1 is normal.
                    muted={false}                // Mutes the audio entirely.
                    paused={false}               // Pauses playback entirely.
                    resizeMode="cover"           // Fill the whole screen at aspect ratio.
                    repeat={true}                // Repeat forever.
                    playInBackground={false}     // Audio continues to play when aentering background.
                    playWhenInactive={false}     // [iOS] Video continues to play whcontrol or notification center are shown.
                    onLoadStart={this.loadStart} // Callback when video starts to load
                    onLoad={this.setDuration}    // Callback when video loads
                    onProgress={this.setTime}    // Callback every ~250ms with currentTime
                    onEnd={this.onEnd}           // Callback when playback finishes
                    onError={this.videoError}    // Callback when video cannot be loaded
                    style={styles.fullScreen}
                />
            );
        }
    }

    startPlay() {
        RNFS.readDir(RNFS.DocumentDirectoryPath)
            .then((result) => {
                console.log('GOT RESULT', result);

                console.log(result[0].path);

                this.setState({
                    isPlay: true,
                    path: result[0].path
                });

                // stat the first file
                return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((statResult) => {
                if (statResult[0].isFile()) {
                    // if we have a file, read it
                    return RNFS.readFile(statResult[1], 'utf8');
                }

                return 'no file';
            })
            .then((contents) => {
                // log the file contents
                console.log(contents);
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
        // this.setState({
        //     isPlay: true,
        //     path: '/Documents/m2oive.mp4'
        // });

    }

    loadStart() {

    }

    setDuration() {

    }

    setTime() {

    }

    videoError() {

    }

    onEnd() {

    }
}

var w = Dimensions.get('window');
const screenWidth = w.width;
const screenHeight = w.height;

const styles = StyleSheet.create({
    fullScreen: {
        width: screenWidth,
        height: screenHeight
    },
    backgroundVideo: {
        width: screenWidth,
        height: screenHeight
    },
});

AppRegistry.registerComponent('TCVideoPlayer', () => TCVideoPlayer);
