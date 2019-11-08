import React, { Component } from "react";
import { View,Text,StyleSheet,TouchableOpacity, TextInput, Button  } from "react-native";
import Firebase from '../config/firebaseConfig';
import * as Google from 'expo-google-app-auth';
class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleLogin = () => {
        const { email, password } = this.state

        Firebase.auth()
            .signInWithEmailAndPassword(email,password)
            .then(() => this.props.navigation.navigate('Profile'))
            .catch(error => console.log(error))
    }

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === Firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }
      onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = Firebase.auth().onAuthStateChanged(function(firebaseUser) {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = Firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
                );
            // Sign in with credential from the Google user.
            Firebase
            .auth()
            .signInWithCredential(credential)
            .then(() => this.props.navigation.navigate('Profile'))
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      }
    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                //androidClientId: "YOUR_CLIENT_ID_HERE",
                iosClientId: "1052881175304-390qapid19bugq6ee1t926o7ilniorru.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
                behavior: 'web'
            })
      
            if (result.type === 'success') {
                this.props.navigation.navigate('Profile');
            } else {
                console.log("cancelled");
                }
            } catch (e) {
                console.log("error",e)
            }
        }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome to the best awesome app!</Text>
                <TextInput
                    value={this.state.email}
                    onChangeText={ email => this.setState({email})}
                    placeholder='email'
                    autoCapitalize='none'
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={this.handleLogin}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.signInWithGoogleAsync}>
                    <Text>Login With Google</Text>
                </TouchableOpacity>
                <Button title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp') }></Button>
            </View>
        );
    }
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});