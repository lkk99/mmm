import React, {Component, useState, useEffect} from 'react';

import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {NativeBaseProvider, Box, Pressable, Center} from 'native-base';

// 给小说简介设置省略模式
const styles = StyleSheet.create({
  box: {
    width: 375,
    height: 107,
  },
  box1: {
    width: 375,
    height: 100,
    display: 'flex',
    flexDirection: 'row',
  },
  left: {
    width: 55,
    height: 80,
    marginTop: 12,
    marginLeft: 10,
    marginRight: 5,
  },
  right: {
    width: 295,
    marginTop: 15,
  },
  title: {
    color: '#515151',
    fontSize: 15,
    lineHeight: 18,
    marginBottom: 3,
  },
  content: {
    color: '#8a8a8a',
    fontSize: 12,
    lineHeight: 18,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 3,
  },
  icon: {
    width: 16,
    height: 16,
    margin: 5,
  },
  author: {
    width: 16,
    height: 16,
    margin: 5,
  },
});

const ClassifyList = ({navigation, route}) => {
  const [list, setList] = useState([]);

  // 发送请求获取小说数据;
  useEffect(() => {
    getIntroductory();
  });

  const getIntroductory = () => {
    const url = `https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9004&type=2&id=${route.params.moreId}&name=${route.params.name}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let getId = data.ResponseObject[0].module.id;
        let getdata = data.ResponseObject[0].module.itemList;
        setList(getdata);
      });
  };

  return (
    // FlatList是列表标签

    <FlatList
      // data指定列表数据源
      data={list}
      // renderItem是渲染每一个列表项
      renderItem={({item}) => (
        <ScrollView>
          <View style={styles.box}>
            <Pressable
              onPress={() =>
                navigation.navigate('BookInfo', {id: item.bookId})
              }>
              <View style={styles.box1}>
                <Image source={{uri: item.cover}} style={styles.left}></Image>
                <View style={styles.right}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.content} numberOfLines={2}>
                    {item.introduce}
                  </Text>
                  <View style={styles.bottom}>
                    <Text>
                      <Image
                        source={require('./images/people.png')}
                        style={styles.icon}></Image>
                      <Text style={styles.author}>{item.author}</Text>
                    </Text>
                    <Text>
                      <NativeBaseProvider>
                        <Box
                          bg="primary.500"
                          rounded="xl"
                          width={20}
                          height={6}
                          borderColor="coolGray.200"
                          borderWidth="1"
                          fontSize={12}
                          lineHeight={6}>
                          <Text style={{marginLeft: 6, color: '#fff'}}>
                            {' '}
                            {item.category}
                          </Text>
                        </Box>
                      </NativeBaseProvider>
                      &nbsp; &nbsp;
                      <NativeBaseProvider>
                        <Box
                          bg="primary.500"
                          rounded="xl"
                          width={16}
                          height={6}
                          borderColor="coolGray.200"
                          borderWidth="1"
                          fontSize={12}>
                          <Text style={{marginLeft: 10, color: '#fff'}}>
                            {' '}
                            {item.score}
                            {'分'}
                          </Text>
                        </Box>
                      </NativeBaseProvider>
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      )}
      // ItemSeparatorComponent是分割容器，列表项和列表项之间的分割
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            width: 360,
            backgroundColor: '#eee',
            marginLeft: 10,
          }}></View>
      )}
      // ListHeaderComponent是列表头
      ListHeaderComponent={() => (
        <View style={{position: 'relative', backgroundColor: '#ededed'}}>
          <Image
            source={require('./images/left.png')}
            style={{
              width: 16,
              height: 16,
              margin: 10,
              position: 'absolute',
            }}></Image>
          <Text style={{textAlign: 'center', marginTop: 10, marginBottom: 10}}>
            <Text style={{color: '#515151', fontSize: 16}}>
              {route.params.name}
            </Text>
          </Text>
        </View>
      )}
      // ListFooterComponent是列表尾巴
      // ListFooterComponent={() => (
      //   <View>
      //     <Text style={{textAlign: 'center', marginTop: 10, marginBottom: 10}}>
      //       <Text>---没有了---</Text>
      //     </Text>
      //   </View>
      // )}
      // numColumns列表有多少列
      numColumns={1}
      refreshing={false} //当前是否正在刷新
      onEndReachedThreshold={0} //到列表距离底部0的时候触发onEndReached方法
      onEndReached={() => {
        console.log('拉到底部了');
      }}
    />
  );
};

export default ClassifyList;
