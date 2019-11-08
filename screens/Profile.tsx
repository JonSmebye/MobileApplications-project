import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class compo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>compo</Text>
            </View>
        );
    }
}
export default compo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});