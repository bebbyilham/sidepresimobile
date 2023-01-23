import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Button,
  DatePicker,
  Gap,
  Header,
  Select,
  TextInput,
} from '../../components';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
// import {API_HOST} from '../../config';
import {API_HOST} from '@env';

import {getData, showMessage, storeData, useForm} from '../../utils';

const EditProfile = ({navigation}) => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(
    new Date(moment(Date.now()).format('YYYY-MM-DD')),
  );

  const [timePicker, setTimePicker] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));

  function showDatePicker() {
    setDatePicker(true);
  }

  function showTimePicker() {
    setTimePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    houseNumber: '',
    phoneNumber: '',
    picturePath: date,
  });

  const [prof, setProf] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    houseNumber: '',
    phoneNumber: '',
    picturePath: date,
  });
  console.log('====================================');
  console.log('FO', form);
  console.log('date', date);
  console.log('====================================');
  // const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getData('userProfile').then(res => {
      setForm(res);
    });
  }, []);

  const onSubmit = () => {
    console.log('form: ', form);
    console.log('date:', date);
    console.log('prof:', prof);
    let resultObj = {};
    form.address = moment(date).utc().format('YYYY-MM-DD');
    Object.keys(form).map(obj => {
      if (form[obj]) {
        resultObj[obj] = form[obj];
      }
    });
    getData('token').then(resToken => {
      // console.log('token: ', resToken.value);
      console.log('resultObj: ', resultObj);
      Axios.post(`http://192.168.100.29:8000/api/user`, resultObj, {
        headers: {
          Authorization: resToken.value,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          // console.log(res);
          showMessage('Update Success', 'success');
          storeData('userProfile', res.data.data).then(() => {
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
          });
        })
        .catch(err => {
          // console.log('url: ', `${API_HOST}/api/user`);
          // console.log(err);
          showMessage(
            `${err?.response?.data?.message} on Update Profile API` ||
              'Terjadi kesalahan di API Update Profile',
          );
        });
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
          title="Edit Profile"
          subTitle="Update your profile"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Full Name"
            placeholder="Type your full name"
            value={form.name}
            onChangeText={value => changeText('name', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Email Address"
            placeholder="Type your email address"
            value={form.email}
            onChangeText={value => changeText('email', value)}
            disable
          />
          <Gap height={16} />
          <TextInput
            label="Address"
            placeholder="Type your address"
            value={form.address}
            onChangeText={value => changeText('address', value)}
          />
          <Gap height={16} />
          <TextInput
            label="House Number"
            placeholder="Type your house number"
            value={form.houseNumber}
            onChangeText={value => changeText('houseNumber', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Phone Number"
            placeholder="Type your phone number"
            value={form.phoneNumber}
            onChangeText={value => changeText('phoneNumber', value)}
          />
          <Gap height={16} />
          <Select
            label="City"
            value={form.city}
            onSelectChange={value => changeText('city', value)}
          />
          <Gap height={16} />
          <TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
            <TextInput
              label="Tanggal"
              placeholder="Type your phone number"
              value={moment(date).utc().format('YYYY-MM-DD')}
              onChange={value => changeText('picturePath', value)}
              editable={false}
            />
          </TouchableOpacity>
          <Gap height={24} />
          <Button text="Update" onPress={onSubmit} />
        </View>
        {datePicker && (
          <DateTimePicker
            style={styles.datePickerStyle}
            value={date}
            mode={'date'}
            display={'default'}
            is24Hour={true}
            onChange={onDateSelected}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default EditProfile;

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
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
