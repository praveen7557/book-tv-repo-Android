import React from 'react';
import { View, Text } from 'react-native';

const Header = (props) => {
    const { headerViewStyle, textStyle } = styles;
    return (
        <View style={headerViewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
}

const styles = {
    headerViewStyle: {
        backgroundColor: 'green',
        justifyContent: 'center',
        height: 60,
        alignItems: 'center',
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
};

export default Header;