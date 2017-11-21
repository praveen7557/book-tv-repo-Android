import React from 'react';
import { Text, View, Image, Linking, TouchableWithoutFeedback } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import { Actions } from 'react-native-router-flux';

const TvDetail = ({ album }) => {
    const { image_url, title, average_rating, id } = album.book;
    // const account_rating = album.account_rating.value;
    //const { artist, thumbnail_image } = album.author;
    const author = album.book.authors.author.name;
    const lastField = (album.rating == 0 ? ((album.shelves.shelf).length > 0 ? album.shelves.shelf[0].name : (album.shelves.shelf.name == "to-read" ? "to-read" : "")) : album.rating + "(My Rating)");
    const date_read =
    (album.started_at == null) ? ("Date Added : "+ new Date(album.date_added).toDateString()) : (new Date(album.started_at).toDateString() + " - " + (album.read_at == null ? "" : new Date(album.read_at).toDateString()));
    const {
        thumbnailStyle,
        headerContentStyle,
        thumbnailContainerStyle,
        headerTextStyle,
        imageStyle
  } = styles;

    return (
        <Card>
            <TouchableWithoutFeedback onPress={() => onBookClick(id,title,lastField, date_read)}>
                <View >
                    <CardSection>
                        <View style={thumbnailContainerStyle}>
                            <Image
                                style={imageStyle}
                                source={{ uri: image_url }}
                            />
                        </View>
                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle} >{title}</Text>
                            <Text>{author}</Text>
                            {<Text>{average_rating}(Book rating)</Text>}
                            {<Text>{lastField}</Text>}
                        </View>
                    </CardSection>
                </View>
            </TouchableWithoutFeedback>
        </Card>
    );
};

function onBookClick(id, title, lastField, date_read) {
    Actions.book({id: id.content, title: title, lastField: lastField,date_read:date_read});
}

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18,
        width: 200
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

export default TvDetail;
