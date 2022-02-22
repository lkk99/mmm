import React, {useState, useEffect} from 'react';
import {
  Checkbox,
  Box,
  Text,
  FlatList,
  Divider,
  Pressable,
  View,
  Flex,
  Center,
  Actionsheet,
  useDisclose,
} from 'native-base';
import {Image, StyleSheet, DeviceEventEmitter} from 'react-native';
import storage from '../storage';
import {list, delList} from '../global';

export default function BookRack({navigation}) {
  const [bookRacks, setBookRacks] = useState([]);
  const [control, setControl] = useState(true);
  const [checkboxShow, setCheckBoxShow] = useState('none');
  const [groupValues, setGroupValue] = useState([]);
  const {isOpen, onOpen, onClose} = useDisclose();
  const [delIdList, setdelIdList] = useState([]);
  const [showCheckTag, setshowCheckTag] = useState(false);
  const [readTime, settime] = useState();
  const [nowBook, setNowBook] = useState();

  useEffect(() => {
    DeviceEventEmitter.addListener('add', a => {
      setBookRacks(list);
    });
    DeviceEventEmitter.addListener('time', a => {
    
      settime(a.time);
      setNowBook(a.bookname);
    });
  }, []);

  //删除方法
  const delbook = id => {
    delList(id);
    setBookRacks(list);
  };

  //点击管理
  const changeControl = () => {
    setControl(false);
    setshowCheckTag(true);
    setCheckBoxShow('flex');
  };

  //    点击确定按钮
  const onDelete = () => {
    delIdList.map(item => {
     
      delbook(item);
    });
    onClose();
    setshowCheckTag(false);
    setControl(true);
  };

  const styles = StyleSheet.create({
    Text: {
      width: 20,
      height: 10,
      backgroundColor: '#DDA0DD',
      borderRadius: 5,
      fontSize: 13,
    },
  });

  //渲染列表每一项数据
  // useEffect(() => {}, [isAll]);
  // const renderItem = item => {
  //   return (
  //     <Pressable onPress={() => navigation.navigate('BookInfo', {id: item.id})}>
  //       <Box flexDirection="row" p="10px">
  //         <Image
  //           source={{
  //             uri: `${item.cover}`,
  //           }}
  //           alt="2"
  //           style={{width: 60, height: 80, marginRight: 20, borderRadius: 5}}
  //         />

  //         <Box justifyContent="space-around" flex={4}>
  //           <Text bold>{item.name}</Text>
  //           <Text style={{fontSize: 12}}>
  //             <Text style={styles.Text}>作者：</Text>
  //             {item.author}
  //           </Text>
  //           <Text style={{fontSize: 12}}>
  //             <Text style={{fontSize: 13}}>
  //               最近阅读：{nowBook == item.name ? readTime : '无'}
  //             </Text>
  //           </Text>
  //         </Box>
  //         <Center flex={1}>
  //           {showCheckTag == true ? (
  //             // <Checkbox.Group
  //             //   onChange={setGroupValues}
  //             //   value={groupValues}
  //             //   accessibilityLabel="choose numbers">
  //             isAll == true ? (
  //               <Checkbox
  //                 value={item.id}
  //                 colorScheme="purple"
  //                 defaultIsChecked={true}
  //                 onPress={() => {
  //                   singleChlik(item.id);
  //                 }}
  //                 accessibilityLabel="pick an item"
  //               />
  //             ) : (
  //               <Checkbox
  //                 value={item.id}
  //                 colorScheme="purple"
  //                 onPress={() => {
  //                   singleChlik(item.id);
  //                 }}
  //                 accessibilityLabel="pick an item"
  //               />
  //             )
  //           ) : (
  //             // </Checkbox.Group>
  //             <></>
  //           )}
  //         </Center>
  //       </Box>
  //     </Pressable>
  //   );
  // };

  return (
    <Box>
      <Flex
        direction="row"
        mt="1.5"
        mx="2"
        style={{
          lineHeight: 38,
          height: 38,
          borderBottomColor: '#c08eaf',
          borderBottomWidth: 2,
          borderBottomStyle: 'solid',
        }}>
        <Text flex="7" fontSize="20">
          我的书架
        </Text>
        {/* <Text flex="6"></Text> */}
        {control ? (
          <Center>
            <Text flex="1" color="#DDA0DD" onPress={changeControl} pt={1}>
              管理
            </Text>
          </Center>
        ) : (
          <Text>
            <Text p={2} flex="1" color="#DDA0DD" onPress={onOpen}>
              删除
            </Text>
            |
            <Text
              flex="1"
              color="#DDA0DD"
              onPress={() => {
                setControl(true);
                setshowCheckTag(false);
              }}>
              取消
            </Text>
          </Text>
        )}
      </Flex>
      <FlatList
        data={bookRacks}
        keyExtractor={(item, i) => i} // 解决 key 问题
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate('BookInfo', {id: item.id})}>
            <Box flexDirection="row" p="10px">
              <Image
                source={{
                  uri: `${item.cover}`,
                }}
                alt="2"
                style={{
                  width: 60,
                  height: 80,
                  marginRight: 20,
                  borderRadius: 5,
                }}
              />

              <Box justifyContent="space-around" flex={4}>
                <Text bold>{item.name}</Text>
                <Text style={{fontSize: 12}}>
                  <Text style={styles.Text}>作者：</Text>
                  {item.author}
                </Text>
                <Text style={{fontSize: 12}}>
                  <Text style={{fontSize: 13}}>
                    最近阅读：{nowBook == item.name ? readTime : '无'}
                  </Text>
                </Text>
              </Box>
              <Center flex={1}>
                {showCheckTag == true ? (
                  // <Checkbox.Group
                  //   onChange={values => {
                  //     setGroupValue(values || []);
                  //   }}
                  //   value={groupValues}
                  //   accessibilityLabel="choose numbers">
                  <Checkbox
                    value={item.id}
                    colorScheme="purple"
                    onPress={() => {
                      setdelIdList([...delIdList, item.id]);
                    }}
                    accessibilityLabel="pick an item"
                  />
                ) : (
                  <></>
                )}
              </Center>
            </Box>
          </Pressable>
        )} // 调用方法，去渲染每一项
        ItemSeparatorComponent={() => <Divider my="2" />} //渲染分割线的属性方法
      ></FlatList>
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
        <Actionsheet.Content borderTopRadius="10">
          <Actionsheet.Item onPress={onDelete}>确定</Actionsheet.Item>
          <Actionsheet.Item onPress={onClose}>取消</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
}
