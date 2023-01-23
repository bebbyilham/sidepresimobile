import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header, Select, TextInput} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {API_HOST} from '../../config';
import {API_HOST} from '@env';

import {getData, showMessage, storeData, useForm} from '../../utils';

const ChangePassword = ({navigation}) => {
  const [form, setForm] = useState({
    password: '',
  });

  // const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getData('userProfile').then(res => {
      setForm(res);
    });
  }, []);

  console.log('name:', setForm?.name);

  //   if (form.password.length > 0) {
  //     if (form.password.length < 6) {
  //       showMessage('Password kurang dari 6 karater');
  //     } else {
  //       signOut();
  //       onSubmit();
  //     }
  //   } else {
  //     onSubmit();
  //   }

  const onSubmit = () => {
    if (form.password.length < 6) {
      showMessage('Password kurang dari 6 karater');
    } else {
      let resultObj = {};
      Object.keys(form).map(obj => {
        if (form[obj]) {
          resultObj[obj] = form[obj];
        }
      });
      getData('token').then(resToken => {
        console.log('token: ', resToken.value);
        console.log('resultObj: ', resultObj);
        Axios.post(
          `http://192.168.100.29:8000/api/user/changepassword`,
          resultObj,
          {
            headers: {
              Authorization: resToken.value,
              'Content-Type': 'multipart/form-data',
            },
          },
        )
          .then(res => {
            console.log(res);
            showMessage('Update Success', 'success');
            storeData('userProfile', res.data.data).then(() => {
              navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
            });
            signOut();
          })
          .catch(err => {
            console.log('url: ', `${API_HOST}/api/user`);
            console.log(err);
            showMessage(
              `${err?.response?.data?.message} on Update Profile API` ||
                'Terjadi kesalahan di API Update Profile',
            );
          });
      });
    }
  };

  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile', 'token']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
    });
  };

  const changeText = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.page}>
        <Header
          title="Change Password"
          subTitle="Change your password"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Password"
            placeholder="Type your password"
            value={form.password}
            onChangeText={value => changeText('password', value)}
            secureTextEntry
          />
          <Gap height={24} />
          <Button text="Submit" onPress={onSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  scroll: {flexGrow: 1},
  page: {flex: 1},
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
