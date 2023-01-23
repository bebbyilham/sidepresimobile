import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  DashboardCard,
  Gap,
  HomeProfile,
  HomeTabSection,
} from '../../components';
import {getFoodData, getBlogData} from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {blog} = useSelector(state => state.homeReducer);
  // console.log('====================================');
  // console.log('datablog:', blog);
  // console.log('====================================');
  useEffect(() => {
    dispatch(getBlogData());
  }, []);
  return (
    <View style={styles.page}>
      <HomeProfile />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.dashboarCardContainer}>
            <Gap width={24} />
            {blog.map(itemBlog => {
              return (
                <DashboardCard
                  key={itemBlog.id}
                  name={itemBlog.name}
                  image={{uri: itemBlog.thumbnail}}
                  category={itemBlog.category}
                  created={itemBlog.created_at}
                  // creator={itemBlog.creator.name}
                  onPress={() => navigation.navigate('ItemDetail', itemBlog)}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.tabContainer}>
        <HomeTabSection />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {flex: 1},
  dashboarCardContainer: {flexDirection: 'row', marginVertical: 24},
  tabContainer: {flex: 1},
});
