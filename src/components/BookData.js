import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView, StyleSheet, Linking, TouchableWithoutFeedback } from 'react-native';
import HTMLView from 'react-native-htmlview';
import StarRating from 'react-native-star-rating';

import Spinner from './Spinner';
import { fetchBookData } from '../actions/actions'

class BookData extends Component {

    componentWillMount() {
        this.props.fetchBookData(this.props.id);
    }

    render() {
        const { thumbnailContainerStyle, imageStyle, titleStyle, textStyle, textLabelStyle, overviewStyle, siteImgStyle ,htmlStyle} = styles;
        const { image_url, title, average_rating, description, publication_day, publication_month, publication_year, num_pages } = this.props.book;
        if (image_url != undefined) {
            const author = this.props.book.authors.author.name;
            return (
                <ScrollView>
                    <View style={thumbnailContainerStyle}>
                        <Image
                            style={imageStyle}
                            source={{ uri: image_url }}
                        />
                        <Text style={titleStyle}>{title}</Text>
                        {
                            <Text style={textStyle}>{author}</Text>}
                            <Text style={textLabelStyle}>Book Rating</Text>
                            <StarRating
                                disabled={true}
                                maxStars={5}
                                rating={parseFloat(average_rating)}
                            />
                        {
                            this.props.lastField.indexOf("Rating")>-1 ?
                                <View style={thumbnailContainerStyle}>
                                    <Text style={textLabelStyle}>My Rating</Text>
                                    <StarRating
                                        disabled={true}
                                        maxStars={5}
                                        rating={(parseFloat(this.props.lastField.replace("My Rating","")))}
                                    />
                                </View>
                                : <Text style={textLabelStyle}>To-Read</Text>
                        }
                        {
                            <View>
                                <TouchableWithoutFeedback 
                                    onPress={() => Linking.openURL                            ("https://www.goodreads.com/book/show/" + this.props.id)}>
                                    <Image source={{ uri: 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/417027_10150734457702028_1843042659_n.jpg?oh=9f83cba4151bec80e1b64d247fc5a021&oe=5A8B31F8' }} style={siteImgStyle} />
                                </TouchableWithoutFeedback>
                            </View>
                        }
                        <Text style={textStyle}>Published : {publication_year + "-" + publication_month + "-" + publication_day}</Text>
                        {
                            <Text style={textStyle}>{this.props.date_read}</Text>
                        }
                        <Text style={textStyle}>No. of Pages : {num_pages}</Text>
                        {/* <Text style={overviewStyle}>{description}</Text> */}
                        {<HTMLView value={description.replace('<br/><br/>','<br/>')} style={htmlStyle} />}
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
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 1,
        width: 110,
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
    },
    htmlStyle:{
        marginTop: 10
    }
};

function mapStateToProps(state) {
    console.log(state.book)
    return { book: state.book };
}

export default connect(mapStateToProps, {
    fetchBookData
})(BookData);