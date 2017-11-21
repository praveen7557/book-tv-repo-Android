import React, { Component } from 'react';
import { Text, View, Image, Linking, TouchableWithoutFeedback } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';
import { Actions } from 'react-native-router-flux';

export default class TvDetail extends Component {

    // constructor() {
    //     ths.renderGenres = this.renderGenres.bind(this);
    //     this.getSeries = this.getSeries.bind(this);
    // }

    renderGenres(boxData) {
        const ids = boxData.genre_ids;
        const genres = [{ "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" }, { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" }, { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" }, { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" }, { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }];
        var genreTextArr = [];
        ids.map(function (i) {
            var item = genres.filter(function (e) {
                return e.id == i
            });
            item.length > 0 ? genreTextArr.push(item[0].name) : "";
        });
        return genreTextArr.join(", ");
    }

    getSeries() {
        const account_rating = this.props.album.account_rating != undefined ? this.props.album.account_rating.value : "";
        Actions.series({ id: this.props.album.id, title: this.props.album.original_name, account_rating: account_rating });
    }

    render() {
        const { original_name, poster_path, link, vote_average, id } = this.props.album;
        let account_rating = "";
        if (this.props.type == "") {
            account_rating = this.props.album.account_rating != undefined ? this.props.album.account_rating.value + "(My rating)" : "";
        }
        const {
            thumbnailStyle,
            headerContentStyle,
            thumbnailContainerStyle,
            headerTextStyle,
            imageStyle
          } = styles;

        return (
            <Card>
                <TouchableWithoutFeedback onPress={this.getSeries.bind(this)}>
                    <View>
                        <CardSection>
                            <View style={thumbnailContainerStyle}>
                                <Image
                                    style={imageStyle}
                                    source={{ uri: "https://image.tmdb.org/t/p/w300_and_h450_bestv2" + poster_path }}
                                />
                            </View>
                            <View style={headerContentStyle}>
                                <Text style={headerTextStyle}>{original_name}</Text>
                                <Text>{this.renderGenres(this.props.album)}</Text>
                                {<Text>{vote_average}(Show rating)</Text>}
                                {<Text>{account_rating}</Text>}
                            </View>
                        </CardSection>
                    </View>
                </TouchableWithoutFeedback>
            </Card>
        );
    }

}

// const TvDetail = ({ album, type }) => {
//     function 

// };

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    thumbnailStyle: {
        height: 50,
        width: 50
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        width: 120
    }
};

// export default TvDetail;
