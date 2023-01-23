const Axios = require('axios').default;
import {API_HOST} from '@env';
import {showMessage, storeData} from '../../utils';
import {setLoading} from './global';

export const signUpAction =
  (dataRegister, photoReducer, navigation) => dispatch => {
    Axios.post(`${API_HOST}/api/register`, dataRegister)
      .then(res => {
        console.log('data success :', res.data);
        // console.log('data appi host :'`${API_HOST}`);
        //data user
        const profile = res.data.data.user;

        //data token
        const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
        storeData('token', {
          value: token,
        });
        if (photoReducer.isUploadPhoto) {
          const photoForUpload = new FormData();
          photoForUpload.append('file', photoReducer);
          Axios.post(`${API_HOST}/api/user/photo`, photoForUpload, {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(resUpload => {
              // console.log('success upload:', resUpload);
              profile.profile_photo_url = `${API_HOST}/storage/${resUpload.data.data[0]}`;
              storeData('userProfile', profile);
              navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
            })
            .catch(err => {
              showMessage('Upload photo tidak berhasil');
              navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
            });
        } else {
          storeData('userProfile', profile);
          navigation.reset({index: 0, routes: [{name: 'SuccessSignUp'}]});
        }
        dispatch(setLoading(false));
        // showMessage('Register Success', 'success');
      })
      .catch(err => {
        // console.log('error:', err.response.data.message);
        dispatch(setLoading(false));
        showMessage(err?.response?.data?.message);
      });
  };

export const signInAction = (form, navigation) => dispatch => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST}/api/login`, form)
    .then(res => {
      // console.log('data api host :'`${API_HOST}`);
      const token = `${res.data.data.token_type} ${res.data.data.access_token}`;
      const profile = res.data.data.user;
      dispatch(setLoading(false));
      storeData('token', {
        value: token,
      });
      storeData('userProfile', profile);
      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    })
    .catch(err => {
      // console.log('data appi host :'`${API_HOST}`);
      console.log(err?.response?.data?.data?.message);
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.data?.message);
    });
};
