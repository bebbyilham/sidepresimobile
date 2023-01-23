import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcBackWhite} from '../../assets';
import {Button, Rating} from '../../components';
import {getData} from '../../utils';

const ItemDetail = ({navigation, route}) => {
  const {id, name, thumbnail, description, created_at, creator, category} =
    route.params;

  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  }, []);

  return (
    <View style={styles.page}>
      <ImageBackground source={{uri: thumbnail}} style={styles.cover}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}>
          <IcBackWhite />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.mainContent}>
          <View style={styles.blogContainer}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.category}>{category}</Text>
            </View>
            {/* <Counter onValueChange={onCounterChange} /> */}
          </View>
          {/* <Text style={styles.desc}>{category}</Text> */}
          <ScrollView>
            {/* <Text style={styles.label}>Ingredients:</Text> */}
            <Text style={styles.desc}>{description}</Text>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <View style={styles.creditContainer}>
            <Text style={styles.createdAt}>{created_at}</Text>
            <Text style={styles.creator}>{creator}</Text>
            {/* <Number number={totalItem * category} style={styles.priceTotal} /> */}
          </View>
          {/* <View style={styles.button}>
            <Button text="Order Now" onPress={onOrder} />
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  page: {flex: 1},
  cover: {height: 330, paddingTop: 26, paddingLeft: 22},
  back: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: -40,
    paddingTop: 26,
    paddingHorizontal: 16,
    flex: 1,
  },
  mainContent: {flex: 1},
  blogContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {fontSize: 16, fontFamily: 'Poppins-Regular', color: '#020202'},
  desc: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 16,
    alignItems: 'stretch',
    textAlign: 'justify',
  },
  category: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    marginBottom: 4,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 4,
    alignItems: 'center',
  },
  footer: {flexDirection: 'row', paddingVertical: 16, alignItems: 'center'},
  creditContainer: {flex: 1},
  button: {width: 163},
  createdAt: {fontSize: 13, fontFamily: 'Poppins-Regular', color: '#8D92A3'},
  creator: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#8D92A3',
    alignItems: 'flex-end',
  },
  priceTotal: {fontSize: 18, fontFamily: 'Poppins-Regular', color: '#020202'},
});
