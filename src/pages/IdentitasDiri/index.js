import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Gap, Header, Select, TextInput} from '../../components';
// import {API_HOST} from '../../config';
import {API_HOST} from '@env';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import {getData, showMessage, storeData, useForm} from '../../utils';

const IdentitasDiri = ({navigation}) => {
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
  const [userProfile, setUserProfile] = useState({});

  const [form, setForm] = useState({
    nama: '',
    user_id: '',
    no_ktp: '',
    tempat_lahir: '',
    tanggal_lahir: date,
    jenis_kelamin: '',
    alamat_lengkap: '',
    no_hp: '',
  });
  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
      //   console.log('profile 1:', userProfile);
      // });
      getData('token').then(resToken => {
        Axios.get(`http://192.168.100.29:8000/api/nurses/${res.id}`, {
          headers: {
            Authorization: resToken.value,
            'Content-Type': 'multipart/form-data',
          },
        }).then(res => {
          // console.log('data pr:', res);
          // console.log('data pr:', res.data.data);
          setForm(res.data.data);
        });
      });
    });
  }, []);
  const onSubmit = () => {
    let resultObj = {};
    form.user_id = userProfile.id;
    form.tanggal_lahir = moment(date).utc().format('YYYY-MM-DD');
    Object.keys(form).map(obj => {
      if (form[obj]) {
        resultObj[obj] = form[obj];
      }
    });
    getData('token').then(resToken => {
      // console.log('token: ', resToken.value);
      console.log('resultObj: ', resultObj);
      Axios.post(`http://192.168.100.29:8000/api/nurses`, resultObj, {
        headers: {
          Authorization: resToken.value,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          console.log('response', res);
          showMessage('Update Success', 'success');
          navigation.goBack();
        })
        .catch(err => {
          // console.log('url: ', `${API_HOST}/api/user`);
          console.log('res err:', err);
          showMessage(
            `${err?.response?.data?.message} on Nurse API` ||
              'Terjadi kesalahan di API Nurse',
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
          title="Identitas Pribadi"
          subTitle="Data Identitas Pribadi"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Nama Lengkap"
            value={form.nama}
            onChangeText={value => changeText('nama', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Nomor KTP"
            value={form.no_ktp}
            onChangeText={value => changeText('no_ktp', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Tempat Lahir"
            value={form.tempat_lahir}
            onChangeText={value => changeText('tempat_lahir', value)}
          />
          <Gap height={16} />
          <TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
            <TextInput
              label="Tanggal"
              value={moment(date).utc().format('YYYY-MM-DD')}
              onChange={value => changeText('tanggal_lahir', value)}
              editable={false}
            />
          </TouchableOpacity>
          <Gap height={16} />
          <TextInput
            label="Alamat Lengkap"
            value={form.alamat_lengkap}
            onChangeText={value => changeText('alamat_lengkap', value)}
          />
          <Gap height={16} />
          <TextInput
            label="No. Handphone"
            value={form.no_hp}
            onChangeText={value => changeText('no_hp', value)}
          />
          <Gap height={16} />
          <Select
            label="Jenis Kelamin"
            value={form.jenis_kelamin}
            onSelectChange={value => changeText('jenis_kelamin', value)}
          />
          <Gap height={24} />
          <Button text="Simpan" onPress={onSubmit} />
        </View>
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
    </ScrollView>
  );
};

export default IdentitasDiri;

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
