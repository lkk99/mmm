import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  Modal,
  StyleSheet,
  FlatList,
  View,
  Center,
} from 'react-native';
import {Box, Button, Text, Pressable} from 'native-base';
import HTMLView from 'react-native-htmlview';

export default function Bookpage({route}) {
  const textRef = useRef(null);
  const textContainerRef = useRef(null);
  const [measure, setMeasure] = useState(null);
  const [content, setcontent] = useState();
  const [nextChapterId, setnextChapterId] = useState();
  const [chaptList, setChaptList] = useState([]);
  const [pageIndex, setPageIndex] = useState({page: 1});
  const [pageSize, setPageSiza] = useState(20);
  const [chapterid, setchapterid] = useState(route.params.chapterid);
  const [prevChapterId, setprevChapterId] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const url = `https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?sid=1211e0fbc6fdc938a715ff6b68aaf9a7&chl=small_xiaoan&guid=obzfs0K9HrrxhPC_O0GG5oQfuwPI&isSmall=1&platform=1&device=microsoft&sysreleasever=Windows%2010%20x64&gender=0&nonce=46d13766-adc4-eaaa-d010-bd58a2a6f2ae&timestamp=1635840800535&mt=12&over=355&ver=355&appver=3.5.7&x=4&actionid=9007&IsPreload=0&bookId=${route.params.id}&chapterId=${chapterid}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setcontent(data.ResponseObject[0].module.txt);
        setnextChapterId(data.ResponseObject[0].module.nextChapterId);
        setprevChapterId(data.ResponseObject[0].module.prevChapterId);
      });
  }, [chapterid]);

  useEffect(() => {
    getList();
  }, [pageIndex.page]);

  const getList = () => {
    const url = `https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9005&bookid=${route.params.id}&pageIndex=${pageIndex.page}&pageSize=${pageSize}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setChaptList([...chaptList, ...data.ResponseObject[0].module.ascList]);
      });
  };

  const getXY = evt => {
    const x = evt.nativeEvent.locationX;
    if (x >= 110 && x <= 260) {
      setModalVisible(true);
    }
  };
  return (
    <Box style={{position: 'relative'}}>
      <Pressable
        ref={textContainerRef}
        onPress={evt => getXY(evt)}
        style={{paddingLeft: 10, paddingRight: 10}}>
        <HTMLView value={content} ref={textRef} />
      </Pressable>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Box
          p={2}
          style={{
            backgroundColor: '#fff',
            height: 445,
            marginTop: 200,
            marginRight: 20,
            marginLeft: 20,
            borderRadius: 20,
          }}>
          <Box>
            <Box flexDirection="row">
              <Text style={{marginLeft: 130, fontSize: 20, padding: 10}}>
                目录
              </Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <Box
                  _text={{
                    color: '#aaa',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginLeft: 110,
                    marginTop: -1,
                  }}>
                  ×
                </Box>
              </Pressable>
            </Box>

            <FlatList
              //   指定data数据源
              data={chaptList}
              style={{height: 395}}
              //渲染每个数据
              renderItem={({item}) => (
                <Text
                  style={{lineHeight: 40, marginLeft: 20, color: '#444'}}
                  onPress={() => {
                    setchapterid(item.chapterId);
                    setModalVisible(false);
                  }}>
                  {item.name}
                </Text>
              )}
              // 每一行分割样式
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#aaa',
                  }}></View>
              )}
              // 列数
              numColumns={1}
              //当行高固定的时候可以使用这个属性来优化性能
              getItemLayout={(data, index) => ({
                length: 100,
                offset: (100 + 2) * index,
                index,
              })}
              refreshing={false} //当前是否正在刷新
              onEndReachedThreshold={0.5} //到距离底部0的时候触发onEndReached方法
              onEndReached={() => {
                setPageIndex({...pageIndex, page: pageIndex.page + 1});
                pageIndex.page = 2;
              }}
            />
          </Box>
        </Box>
      </Modal>

      <Box flexDirection="row" style={{position: 'absolute', top: 500}}>
        <Button
          style={{
            backgroundColor: '#d5a3c9',
            width: 120,
            margin: 30,
            borderRadius: 10,
          }}
          onPress={() => setchapterid(prevChapterId)}>
          上一章
        </Button>
        <Button
          style={{
            backgroundColor: '#d5a3c9',
            width: 120,
            margin: 30,
            borderRadius: 10,
          }}
          onPress={() => setchapterid(nextChapterId)}>
          下一章
        </Button>
      </Box>
    </Box>
  );
}
