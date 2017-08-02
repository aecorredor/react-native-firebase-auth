import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { loggedIn: null };
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyABgMUy-j3uRLsKq-LA2hUC0CNRtgjrNW8',
      authDomain: 'reactnativeauth-f2ee9.firebaseapp.com',
      databaseURL: 'https://reactnativeauth-f2ee9.firebaseio.com',
      projectId: 'reactnativeauth-f2ee9',
      storageBucket: 'reactnativeauth-f2ee9.appspot.com',
      messagingSenderId: '877103226847',
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
            </CardSection>
          </Card>
        );
      case false:
        return <LoginForm />;

      default:
        return (
          <View style={{ marginTop: 100 }}>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
