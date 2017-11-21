import React, { Component } from 'react';
import { ScrollView, View, Text, NetInfo } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { ListView,RefreshControl } from 'react-native';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import TvDetail from './TvDetail';
import { fetchTvShows, fetchTVSeries } from '../actions/actions';
import Spinner from './Spinner';

class TvList extends Component {
    constructor() {
        super();

        this.state = { type: "", activeTab: 0, isOnline: true ,refreshing: false};
        this.renderRow = this.renderRow.bind(this);
        this.handleFirstConnectivityChange=this.handleFirstConnectivityChange.bind(this);
        this.onSwipeLeft=this.onSwipeLeft.bind(this);
        this.onSwipeRight=this.onSwipeRight.bind(this);
    }

    handleFirstConnectivityChange(isConnected) {
        this.setState({isOnline:isConnected});
        isConnected? this.props.fetchTvShows():"";
    }

    _onRefresh() {
        // this.setState({refreshing: true});
        (this.state.type=="watchlist"||this.state.type=="dnf")?
        this.props.fetchTvShows(this.state.type): this.props.fetchTvShows();
      }

    componentWillMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            this.setState({isOnline:isConnected});
            isConnected?this.props.fetchTvShows():""
          });
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
          );
        

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {

        this.createDataSource(nextProps);
    }

    createDataSource({ shows }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(shows);
    }

    renderRow(shows) {
        return <TvDetail album={shows} type={this.state.type} />;
    }
    
    onSwipeRight(state){
        if(this.state.activeTab==1||this.state.activeTab==2){
            this.changeView(this.state.activeTab-1);
        }

    }

    onSwipeLeft(state){
        if(this.state.activeTab==1||this.state.activeTab==0){
            this.changeView(this.state.activeTab+1);
        }
    }

    changeView(i) {
        if (i == 0) {
            this.setState({ type: "", activeTab: 0 });
            this.props.fetchTvShows();
        } else if (i == 1) {
            this.setState({ type: "watchlist", activeTab: 1 });
            this.props.fetchTvShows("watchlist");
        } else if (i == 2) {
            this.setState({ type: "dnf", activeTab: 2 });
            this.props.fetchTvShows("dnf");
        }
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
          };
        return (
            this.state.isOnline?(
            (this.props.shows.length > 0) ?
            <GestureRecognizer
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
            >
                <View>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                        refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    />
                    <BottomNavigation
                        activeTab={this.state.activeTab}
                        labelColor="white"
                        rippleColor="white"
                        style={{ height: 56, elevation: 8, position: 'absolute', left: 0, bottom: 0, right: 0 }}
                        onTabChange={(newTabIndex) => this.changeView(newTabIndex)}
                    >
                        <Tab
                            barBackgroundColor="#37474F"
                            label="TV Shows"
                            icon={<Icon size={24} color="white" name="live-tv" />}
                        />
                        <Tab
                            barBackgroundColor="#00796B"
                            label="Watchlist"
                            icon={<Icon size={24} color="white" name="tv" />}
                        />
                        <Tab
                            barBackgroundColor="#5D4037"
                            label="DNF"
                            icon={<Icon size={24} color="white" name="do-not-disturb" />}
                        />
                        {/* book collections-bookmark library-books */}
                    </BottomNavigation>
                </View>
                </GestureRecognizer>
                :
                <View style={styles.spinnerView}>
                    <Spinner />
                </View>
                ):
                <View style={styles.spinnerView}>
                    <Text >Please connect to Internet</Text>
                </View>

        );
    }
}

const styles = {
    spinnerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

function mapStateToProps(state) {
    var showRet = (state.shows.length == 0 ? state.shows : state.shows.results);
    return { shows: showRet };
}


export default connect(mapStateToProps, {
    fetchTvShows, fetchTVSeries
})(TvList);
