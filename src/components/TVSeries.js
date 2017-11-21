import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView, StyleSheet, Linking, TouchableWithoutFeedback } from 'react-native';
import HTMLView from 'react-native-htmlview';
import StarRating from 'react-native-star-rating';

import Spinner from './Spinner';
import { fetchTVSeries } from '../actions/actions'

class TVSeries extends Component {

    componentWillMount() {
        this.props.fetchTVSeries(this.props.id);
    }

    renderGenres(genres) {
        let genreTextArr = [];
        genres.map(function (e) {
            genreTextArr.push(e.name);
        })
        return genreTextArr.join(", ");
    }

    render() {
        const { thumbnailContainerStyle, imageStyle, titleStyle, textStyle, textLabelStyle, overviewStyle, siteImgStyle } = styles;
        const { poster_path, original_name, vote_average, first_air_date, last_air_date, number_of_seasons, status, overview, genres } = this.props.series;
        if (original_name != undefined) {
            const imdbID = this.props.series.external_ids.imdb_id;
            return (
                <ScrollView>
                    <View style={thumbnailContainerStyle}>
                        <Image
                            style={imageStyle}
                            source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + this.props.series.poster_path }}
                        />
                        <Text style={titleStyle}>{original_name}</Text>
                        <Text style={textStyle}>{this.renderGenres(genres)}</Text>
                        <Text style={textLabelStyle}>Show Rating</Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={vote_average / 2}
                        />
                        {
                            this.props.account_rating != "" ?
                                <View style={thumbnailContainerStyle}>
                                    <Text style={textLabelStyle}>My Rating</Text>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={this.props.account_rating / 2}
                                    />
                                </View>
                                : null
                        }
                        <View>
                            <TouchableWithoutFeedback onPress={() => Linking.openURL("http://www.imdb.com/title/" + imdbID)}>
                                <Image source={{ uri: 'http://g-ecx.images-amazon.com/images/G/01/imdb/plugins/rating/images/imdb_46x22.png' }} style={siteImgStyle} />
                            </TouchableWithoutFeedback>
                        </View>
                        <Text style={textStyle}>Started : {first_air_date}</Text>
                        {
                            status == 'Ended' ? <Text style={textStyle}>Ended : {last_air_date}</Text> : null
                        }
                        <Text style={textStyle}>No. of season(s) : {number_of_seasons}</Text>
                        <Text style={overviewStyle}>{overview}</Text>
                        {/* <HTMLView value={overview} style={webStyle} /> */}
                    </View>
                </ScrollView >
            );
        } else {
            return (
                <View style={styles.spinnerView}>
                    <Spinner />
                </View>);
        }
    }
}

const styles = {
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        flex: 1
    },
    imageStyle: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        width: 100,
        marginTop: 10
    },
    titleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'black'
    },
    textStyle: {
        fontSize: 18,
        marginTop: 10,
        color: 'rgba(0, 0, 0, 0.7)'
    },
    textLabelStyle: {
        fontSize: 18,
        marginTop: 10
    },
    spinnerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    overviewStyle: {
        fontSize: 14,
        marginTop: 10,
        color: 'rgba(0, 0, 0, 0.7)',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 20
    },
    siteImgStyle: {
        width: 80,
        height: 40,
        marginTop: 10
    }
};

const webStyle = StyleSheet.create({
    p: {
        color: '#000', // make links coloured pink
    },
});

function mapStateToProps(state) {
    console.log(state.series)
    return { series: state.series };
}

export default connect(mapStateToProps, {
    fetchTVSeries
})(TVSeries);