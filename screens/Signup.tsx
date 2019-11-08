import React, { Component } from "react";
import { View,Text,StyleSheet,TouchableOpacity, TextInput, Button  } from "react-native";
import Firebase from '../config/firebaseConfig';
class Signup extends Component {
    state = {
        name:'',
        email:'',
        password:''
    }

    handleSignUp = () => {
        const {email, password } = this.state
        Firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => this.props.navigation.navigate('Profile'))
            .catch(error => console.log(error))
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    placeholder='Full name'
                />
                <TextInput
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                    placeholder='Email'
                    autoCapitalize='none'
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={this.handleSignUp}>
                    <Text styles={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Signup with Google</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Signup;
