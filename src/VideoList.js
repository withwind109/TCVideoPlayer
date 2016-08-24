/**
 * Created by tangchao on 16/8/24.
 */
import React, {Component} from 'react';
import {
    View,
    ListView,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableHighlight,
    Dimensions
} from 'react-native';

import RNFS from "react-native-fs";
import Player from './Player.js';

export default class VideoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }


    componentDidMount() {
        var _this = this;

        // RNFS.readDir(RNFS.DocumentDirectoryPath)
        RNFS.readDir(RNFS.MainBundlePath)
            .then((result) => {
                _this.setState({
                    dataSource: _this.state.dataSource.cloneWithRows(result)
                });
            });
    }

    render() {
        // <TouchableWithoutFeedback
        //     onPress={()=>this._navigate('你好! (来源第一页:右出)')}>
        //     <View>
        //         <Text style={{marginTop: 20}}>VideoList</Text>
        //     </View>
        // </TouchableWithoutFeedback>
        return (
            <View>
                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>
        );
    }

    _renderRow(rowData) {
        console.log(rowData);
        return (
            <TouchableHighlight
                underlayColor="#cccccc"
                onPress={()=>this._selectVideo(rowData.path)}
            >
                <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.name}>{rowData.name}</Text>
                    <Text style={styles.size}>大小:{this._formatFileSize(rowData.size)}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    _formatFileSize(size) {
        if (size < 1024) {
            return '小于1KB';
        }
        else if (size >= 1024 && size < 1048576) {
            return (size / 1024).toFixed(2) + 'KB';
        }
        else {
            return (size / 1024 / 1024 ).toFixed(2) + 'MB';
        }
    }

    _selectVideo(path) {
        console.log(path);
    }

    _navigate(name) {
        this.props.navigator.push({
            component: Player,
            passProps: {
                name: name
            }
        })
    }
}

var w = Dimensions.get('window');
const screenWidth = w.width;
const screenHeight = w.height;

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        height: screenHeight
    },
    row: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        flex: 1,
        flexDirection: 'row'
    },
    name: {
        height: 60,
        marginLeft: 16,
        marginRight: 30,
        fontSize: 20,
        flex: 5,
        lineHeight: 40
    },
    size: {
        height: 60,
        marginRight: 16,
        fontSize: 14,
        flex: 2,
        lineHeight: 37
    }
});