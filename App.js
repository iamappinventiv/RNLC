import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showUsersData: true,
      hasError: false,
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => this.setState({users: data}))
      .catch(error => {
        console.error(error);
        this.setState({hasError: true});
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.showUsersData !== this.state.showUsersData;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      console.log(this.state.users);
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log('This is error', error, errorInfo);
    this.setState({hasError: true});
  }

  buttonPress = () => {
    this.setState(prevState => ({showUsersData: !prevState.showUsersData}));
  };

  render() {
    const {users, showUsersData, hasError} = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.buttonPress}>
          <Text style={styles.buttonText}>
            {showUsersData ? 'Show Users' : 'Hide Users'}
          </Text>
        </TouchableOpacity>
        {hasError ? (
          <Text style={styles.userContainer}>Error occurred!</Text>
        ) : !showUsersData ? (
          <FlatList
            data={users}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View style={styles.userContainer}>
                <Text style={styles.userName}>Name: {item.name}</Text>
                <Text style={styles.userName}>--------</Text>
                <Text style={styles.userEmail}>Email: {item.email}</Text>
                <Text style={styles.userEmail}>Phone: {item.phone}</Text>
                <Text style={styles.userEmail}>
                  Address: {item.address.city}
                </Text>
                <Text style={styles.userEmail}>Website: {item.website}</Text>
                <Text style={styles.userName}>--------</Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.userContainer}>Welcome to the App</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 19,
    backgroundColor: '#F5F5F5',
    flexDirection: 'column-reverse',
  },
  userContainer: {
    marginVertical: 10,
    padding: 11,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    textAlign: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    height: '8%',
    width: '50%',
    backgroundColor: '#5783db',
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default App;
