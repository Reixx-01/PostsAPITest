import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';

function App() {
  const [titleData, setTitleData] = useState('');
  const [bodyData, setBodyData] = useState('');
  const [userData, setUserData] = useState();

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  const submitHandle = () => {
    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        title: titleData,
        body: bodyData,
        userId: userData,
      })
      .then(response => console.warn(response.data, 'SUCCESS'))
      .catch(error => console.log(error));
    setTitleData('');
    setBodyData('');
    setUserData('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter title"
          placeholderTextColor={'black'}
          value={titleData}
          style={styles.input}
          onChangeText={input => setTitleData(input)}
        />
        <TextInput
          placeholder="Enter body"
          style={styles.input}
          value={bodyData}
          placeholderTextColor={'black'}
          onChangeText={input => setBodyData(input)}
        />
        <TextInput
          placeholder="Enter User ID"
          style={styles.input}
          value={userData}
          placeholderTextColor={'black'}
          onChangeText={input => setUserData(input)}
        />
        <TouchableOpacity style={styles.button} onPress={submitHandle}>
          <Text styles={{color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        scrollEnabled
        data={data}
        keyExtractor={post => post.id}
        renderItem={({item}) => (
          <View style={styles.postContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
    padding: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'column',
    gap: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    height: 50,
    color: 'black',
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 2,
  },
  title: {
    color: 'black',
    fontSize: 17,
    fontWeight: '900',
  },
  body: {
    color: 'black',
    fontSize: 15,
    fontWeight: '400',
  },
});

export default App;
