import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Gap, Header, Select, TextInput} from '../../components';
// import {API_HOST} from '../../config';
import {API_HOST} from '@env';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import {getData, showMessage, storeData, useForm} from '../../utils';

const IdentitasProfesi = ({navigation}) => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(
    new Date(moment(Date.now()).format('YYYY-MM-DD')),
  );
  const [datePickertgldaftar, setDatePickertgldaftar] = useState(false);
  const [tgldaftar, setTgldaftar] = useState(
    new Date(moment(Date.now()).format('YYYY-MM-DD')),
  );
  const [datePickerstrberlaku, setDatePickerstrberlaku] = useState(false);
  const [strberlaku, setStrberlaku] = useState(
    new Date(moment(Date.now()).format('YYYY-MM-DD')),
  );
  const [datePickersikpberlaku, setDatePickersikpberlaku] = useState(false);
  const [sikpberlaku, setSikpberlaku] = useState(
    new Date(moment(Date.now()).format('YYYY-MM-DD')),
  );
  const [datePickerpenugasanberlaku, setDatePickerpenugasanberlaku] =
    useState(false);
  const [penugasanberlaku, setPenugasanberlaku] = useState(
    new Date(moment(Date.now()).format('YYYY-MM-DD')),
  );

  const [timePicker, setTimePicker] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));

  function showDatePicker() {
    setDatePicker(true);
  }
  function showDatePickertgldaftar() {
    setDatePickertgldaftar(true);
  }

  function onDateSelectedtgldaftar(event, value) {
    setTgldaftar(value);
    setDatePickertgldaftar(false);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  function showDatePickerstrberlaku() {
    setDatePickerstrberlaku(true);
  }

  function onDateSelectedstrberlaku(event, value) {
    setStrberlaku(value);
    setDatePickerstrberlaku(false);
  }

  function showDatePickersikpberlaku() {
    setDatePickersikpberlaku(true);
  }

  function onDateSelectedsikpberlaku(event, value) {
    setSikpberlaku(value);
    setDatePickersikpberlaku(false);
  }
  function showDatePickerpenugasanberlaku() {
    setDatePickerpenugasanberlaku(true);
  }

  function onDateSelectedpenugasanberlaku(event, value) {
    setPenugasanberlaku(value);
    setDatePickerpenugasanberlaku(false);
  }

  function showTimePicker() {
    setTimePicker(true);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }
  const [userProfile, setUserProfile] = useState({});

  const [form, setForm] = useState({
    user_id: '',
    ijazah_terakhir: '',
    no_ijazah_terakhir: '',
    tahun_ijazah_terakhir: '',
    nama_institusi: '',
    jenis_profesi: '',
    jenjang_profesi: '',
    no_kta: '',
    tgl_daftar_anggota: tgldaftar,
    no_str: '',
    str_berlaku: strberlaku,
    no_sikp: '',
    sikp_berlaku: sikpberlaku,
    no_penugasan: '',
    no_penugasan_berlaku: penugasanberlaku,
  });
  //   useEffect(() => {
  //     getData('userProfile').then(res => {
  //       setUserProfile(res);
  //       console.log('profile 1:', userProfile);
  //     });
  //   }, []);
  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
      //   console.log('profile 0:', res);
      //   console.log('profile 1:', res.id);
      // });
      getData('token').then(resToken => {
        Axios.get(
          `http://192.168.100.29:8000/api/nurses/showidentitasprofesi/${res.id}`,
          {
            headers: {
              Authorization: resToken.value,
              'Content-Type': 'multipart/form-data',
            },
          },
        ).then(res => {
          //   console.log(res);
          //   console.log('data pr:', res.data.data);
          setForm(res.data.data);
        });
      });
    });
  }, []);
  const onSubmit = () => {
    let resultObj = {};
    form.user_id = userProfile.id;
    form.tgl_daftar_anggota = moment(tgldaftar).utc().format('YYYY-MM-DD');
    form.str_berlaku = moment(strberlaku).utc().format('YYYY-MM-DD');
    form.sikp_berlaku = moment(sikpberlaku).utc().format('YYYY-MM-DD');
    form.no_penugasan_berlaku = moment(penugasanberlaku)
      .utc()
      .format('YYYY-MM-DD');
    Object.keys(form).map(obj => {
      if (form[obj]) {
        resultObj[obj] = form[obj];
      }
    });
    getData('token').then(resToken => {
      // console.log('token: ', resToken.value);
      console.log('resultObj: ', resultObj);
      Axios.post(
        `http://192.168.100.29:8000/api/nurses/createidentitasprofesi`,
        resultObj,
        {
          headers: {
            Authorization: resToken.value,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
        .then(res => {
          console.log('response', res);
          showMessage('Update Success', 'success');
          navigation.goBack();
        })
        .catch(err => {
          // console.log('url: ', `${API_HOST}/api/user`);
          console.log('res err:', err);
          showMessage(
            `${err?.response?.data?.status} on Nurse API` ||
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
          title="Identitas Profesi"
          subTitle="Data Identitas Profesi"
          onBack={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <TextInput
            label="Ijazah Terakhir"
            value={form.ijazah_terakhir}
            onChangeText={value => changeText('ijazah_terakhir', value)}
          />
          <Gap height={16} />
          <TextInput
            label="No. Ijazah Terakhir"
            value={form.no_ijazah_terakhir}
            onChangeText={value => changeText('no_ijazah_terakhir', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Tahun Ijazah Terakhir"
            value={form.tahun_ijazah_terakhir}
            onChangeText={value => changeText('tahun_ijazah_terakhir', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Nama Institusi"
            value={form.nama_institusi}
            onChangeText={value => changeText('nama_institusi', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Jenis Profesi"
            value={form.jenis_profesi}
            onChangeText={value => changeText('jenis_profesi', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Jenjang Profesi"
            value={form.jenjang_profesi}
            onChangeText={value => changeText('jenjang_profesi', value)}
          />
          <Gap height={16} />
          <TextInput
            label="No. KTA"
            value={form.no_kta}
            onChangeText={value => changeText('no_kta', value)}
          />
          <Gap height={16} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={showDatePickertgldaftar}>
            <TextInput
              label="Tanggal Daftar Anggota"
              value={moment(tgldaftar).utc().format('YYYY-MM-DD')}
              onChange={value => changeText('tgl_daftar_anggota', value)}
              editable={false}
            />
          </TouchableOpacity>
          <Gap height={16} />
          <TextInput
            label="No. STR"
            value={form.no_str}
            onChangeText={value => changeText('no_str', value)}
          />
          <Gap height={16} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={showDatePickerstrberlaku}>
            <TextInput
              label="Tanggal Berlaku STR"
              value={moment(strberlaku).utc().format('YYYY-MM-DD')}
              onChange={value => changeText('str_berlaku', value)}
              editable={false}
            />
          </TouchableOpacity>
          <Gap height={16} />
          <TextInput
            label="No. SIKP"
            value={form.no_sikp}
            onChangeText={value => changeText('no_sikp', value)}
          />
          <Gap height={16} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={showDatePickersikpberlaku}>
            <TextInput
              label="Tanggal Berlaku SIKP"
              value={moment(sikpberlaku).utc().format('YYYY-MM-DD')}
              onChange={value => changeText('sikp_berlaku', value)}
              editable={false}
            />
          </TouchableOpacity>
          <Gap height={16} />
          <TextInput
            label="No. Penugasan"
            value={form.no_penugasan}
            onChangeText={value => changeText('no_penugasan', value)}
          />
          <Gap height={16} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={showDatePickerpenugasanberlaku}>
            <TextInput
              label="Tanggal Berlaku Penugasan"
              value={moment(penugasanberlaku).utc().format('YYYY-MM-DD')}
              onChange={value => changeText('no_penugasan_berlaku', value)}
              editable={false}
            />
          </TouchableOpacity>
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
      {datePickertgldaftar && (
        <DateTimePicker
          style={styles.datePickerStyle}
          value={tgldaftar}
          mode={'date'}
          display={'default'}
          is24Hour={true}
          onChange={onDateSelectedtgldaftar}
        />
      )}
      {datePickerstrberlaku && (
        <DateTimePicker
          style={styles.datePickerStyle}
          value={strberlaku}
          mode={'date'}
          display={'default'}
          is24Hour={true}
          onChange={onDateSelectedstrberlaku}
        />
      )}
      {datePickersikpberlaku && (
        <DateTimePicker
          style={styles.datePickerStyle}
          value={sikpberlaku}
          mode={'date'}
          display={'default'}
          is24Hour={true}
          onChange={onDateSelectedsikpberlaku}
        />
      )}
      {datePickerpenugasanberlaku && (
        <DateTimePicker
          style={styles.datePickerStyle}
          value={penugasanberlaku}
          mode={'date'}
          display={'default'}
          is24Hour={true}
          onChange={onDateSelectedpenugasanberlaku}
        />
      )}
    </ScrollView>
  );
};

export default IdentitasProfesi;

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
