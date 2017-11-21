import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import TvList from './components/tvShows';
import BooksList from './components/BooksList';
import TVSeries from './components/TVSeries';
import BookData from './components/BookData';

const RouterComponent = () => {
    return (
        <Router sceneStyle={{ paddingTop: 5 }}>
            <Scene key="root">
                <Scene key="tvShows" onRight={() => Actions.booksList()}
                    rightTitle="Books" component={TvList} title="TV Shows" />
                <Scene key="series" component={TVSeries} title="Show" />
                <Scene key="booksList" component={BooksList} title="Books" />
                <Scene key="book" component={BookData} title="Book" />
            </Scene>
        </Router>
    );
};

export default RouterComponent;
