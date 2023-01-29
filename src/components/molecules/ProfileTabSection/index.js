import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ItemListA from '../ItemListA';
import {
  ImageDummy1,
  ImageDummy2,
  ImageDummy3,
  ImageDummy4,
} from '../../../assets';
import ItemListMenu from '../ItemListMenu';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 3,
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1,
    }}
    tabStyle={{width: 'auto'}}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
        }}>
        {route.title}
      </Text>
    )}
  />
);

const Account = () => {
  const navigation = useNavigation();
  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile', 'token']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
    });
  };
  return (
    <ScrollView>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        <ItemListMenu
          text="Edit Profile"
          onPress={() => navigation.navigate('EditProfile')}
        />
        <ItemListMenu
          text="Change Password"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <ItemListMenu text="Sign Out" onPress={signOut} />
      </View>
    </ScrollView>
  );
};

const Data = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        <ItemListMenu
          text="Identitas Diri"
          onPress={() => navigation.navigate('IdentitasDiri')}
        />
        <ItemListMenu
          text="Identitas Profesi"
          onPress={() => navigation.navigate('IdentitasProfesi')}
        />
        <ItemListMenu text="Pekerjaan" />
        <ItemListMenu text="Pengembangan" />
        <ItemListMenu text="Penilaian" />
      </View>
    </ScrollView>
  );
};

const renderScene = SceneMap({
  1: Account,
  2: Data,
});
const ProfileTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Account'},
    {key: '2', title: 'Data'},
  ]);
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default ProfileTabSection;

const styles = StyleSheet.create({});
