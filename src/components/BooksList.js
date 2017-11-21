import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons'

import BookDetail from './BookDetail';
import { fetchBooks } from '../actions/actions';
import Spinner from './Spinner';

class BooksList extends Component {

    constructor() {
        super();
        this.state = { type: "", activeTab: 0 };
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillMount() {
        this.props.fetchBooks();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {

        this.createDataSource(nextProps);
    }

    createDataSource({ books }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(books);
    }

    renderRow(books) {
        return <BookDetail album={books} />;
    }

    changeView(i) {
        if (i == 0) {
            this.setState({ type: "", activeTab: 0 });
            this.props.fetchBooks();
        } else if (i == 1) {
            this.setState({ type: "to-read", activeTab: 1 });
            this.props.fetchBooks("to-read");
        } else if (i == 2) {
            this.setState({ type: "read", activeTab: 2 });
            this.props.fetchBooks("read");
        }
    }

    render() {
        return (
            this.props.books.length > 0 ?
                <View>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
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
                            icon={<Icon size={24} color="white" name="book" />}
                        />
                        <Tab
                            barBackgroundColor="#00796B"
                            label="To-Read"
                            icon={<Icon size={24} color="white" name="collections-bookmark" />}
                        />
                        <Tab
                            barBackgroundColor="#5D4037"
                            label="Read"
                            icon={<Icon size={24} color="white" name="library-books" />}
                        />
                    </BottomNavigation>
                </View>
                :
                <View style={styles.spinnerView}>
                    <Spinner />
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
    return { books: state.books };
}


export default connect(mapStateToProps, {
    fetchBooks
})(BooksList);
