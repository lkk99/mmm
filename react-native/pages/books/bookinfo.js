import React, {useState, useEffect, memo, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  DeviceEventEmitter,
  View,
} from 'react-native';
import {Box, Text, Button} from 'native-base';
import {background} from 'native-base/lib/typescript/theme/styled-system';
import {inlineStyles} from 'react-native-svg';
import {list, addList} from '../global';
import storage from '../storage';
import getDateDiff from '../../public/Date/formatTime01.js';
import getNowDate from '../../public/Date/formatTime02.js';

function BookInfo({route, navigation}) {
  const [tag, settag] = useState(false);
  const [bookinfo, setBookinfo] = useState({}); //书籍详情信息
  const [newcomments, setNewcomments] = useState({}); //评论列表信息
  const [hobitlist, setHobitlist] = useState({}); //相似推荐列表
  const [id, setId] = useState(route.params.id);
  const [login, setLogin] = useState(false);
  const [bookracklist, setBookRackList] = useState([]);
  const [time, setTime] = useState(0);

  const styles = StyleSheet.create({
    container: {
      height: 580,
      backgroundColor: '#fff',
    },
    scroll: {
      height: 520,
    },
    book: {
      flexDirection: 'row',
      backgroundColor: '#fff',
    },
    bookmsg: {
      marginLeft: 10,
      marginTop: 10,
    },
    booktitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    bookauthor: {
      marginTop: 15,
    },
    score: {
      marginTop: 15,
    },
    count: {
      marginTop: 15,
    },
    grid: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      height: 60,
    },
    item: {
      flex: 1,
      paddingTop: 10,
    },
    text: {
      textAlign: 'center',
    },
    name: {
      fontSize: 12,
      textAlign: 'center',
      color: '#aaa',
    },
    info: {
      marginLeft: 10,
      marginRight: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
    },
    longIntro: {
      fontSize: 12,
      // lineHeight: 20
    },
    newcomment: {
      backgroundColor: '#fff',
    },
    btn: {
      flexDirection: 'row',
    },
  });

  useEffect(() => {
    list.map(item => {
      if (route.params.id == item.id) {
        settag(true);
      }
    });

    const url = `https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?gender=0&actionid=9002&bookId=${id}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        //   console.log(data)
        setBookinfo(data.ResponseObject[0].module.book);
        setNewcomments(data.ResponseObject[0].module.commentList);
        setHobitlist(data.ResponseObject[0].module.book.hobitList.Data);
      });
  }, []);
  //加入书架
  const join = (id, name, author, cover) => {
    settag(true);
    let lists = {
      id,
      name,
      cover,
      author,
    };
    addList(lists);
    DeviceEventEmitter.emit('add', lists);
  };

  const getComlist = () => {
    var commdata = [];
    for (let i = 0; i < newcomments.length; i++) {
      commdata.push(
        <View key={i} style={{flexDirection: 'row', marginTop: 10}}>
          <Image
            source={{uri: newcomments[i].HeadUrl}}
            style={{width: 60, height: 60, marginLeft: 10}}></Image>
          <View style={{marginLeft: 10, marginRight: 80}}>
            <Text style={{fontSize: 12}}>{newcomments[i].SenderName}</Text>
            <Text style={{fontSize: 10}}>{newcomments[i].SendTime}</Text>
            <Text style={{fontSize: 12}}>{newcomments[i].Content}</Text>
          </View>
        </View>,
      );
    }
    return commdata;
  };

  const gethoblist = () => {
    var hobdata = [];
    for (let i = 0; i < hobitlist.length; i++) {
      hobdata.push(
        <View
          key={i}
          style={{paddingTop: 10, flex: 1, backgroundColor: '#fff'}}>
          <Pressable onPress={() => setId(hobitlist[i].BookId)}>
            <Image
              source={{uri: hobitlist[i].Cover}}
              style={{
                width: 80,
                height: 100,
                marginLeft: 5,
                marginBottom: 5,
              }}></Image>
            <Text style={{fontSize: 10, textAlign: 'center'}}>
              {hobitlist[i].Name}
            </Text>
          </Pressable>
        </View>,
      );
    }
    return hobdata;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View style={styles.book}>
          <Image
            style={{
              width: 120,
              height: 150,
              marginTop: 10,
              marginLeft: 10,
              flexDirection: 'row',
            }}
            source={{uri: bookinfo.cover}}></Image>
          <View style={styles.bookmsg}>
            <View>
              <Text style={styles.booktitle}>{bookinfo.name}</Text>
            </View>
            <View style={styles.bookauthor}>
              <Text>{bookinfo.author}</Text>
            </View>
            <View>
              <Text style={styles.score}>评分：{bookinfo.score}分</Text>
            </View>
            <View>
              <Text style={styles.count}>{bookinfo.peopleRate}</Text>
            </View>
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.item}>
            <Text style={styles.text}>{bookinfo.wordCount}</Text>
            <Text style={styles.name}>总字数</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>{bookinfo.star}</Text>
            <Text style={styles.name}>好评率</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.text}>{bookinfo.update}</Text>
            <Text style={styles.name}>最新状态</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View>
            <Text style={styles.title}>简介</Text>
          </View>
          <View>
            <Text style={styles.longIntro}>{bookinfo.introduce}</Text>
          </View>
        </View>

        <View style={styles.newcomment}>
          <View>
            <Text style={styles.title}>最新评论</Text>
            <View>{getComlist()}</View>
          </View>
        </View>
        <View style={styles.hobitList}>
          <View>
            <Text style={styles.title}>相似推荐</Text>
            <View style={{flexDirection: 'row'}}>{gethoblist()}</View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btn}>
        <Button
          style={
            tag == true
              ? {backgroundColor: '#dddcdce7', width: 120, margin: 30}
              : {backgroundColor: '#d5a3c9', width: 120, margin: 30}
          }
          onPress={() => {
            storage.load({key: 'loginTag'}).then(a => {
              if (a == true) {
                join(
                  bookinfo.bookId,
                  bookinfo.name,
                  bookinfo.author,
                  bookinfo.cover,
                );
              } else {
                navigation.navigate('Mine');
              }
            });
          }}>
          {tag == true ? (
            <Text style={{color: '#aaa'}}>已加入书架</Text>
          ) : (
            <Text style={{color: '#fff'}}>加入书架</Text>
          )}
        </Button>
        <Button
          onPress={() => {
            navigation.navigate('Bookpage', {
              id: bookinfo.bookId,
              chapterid: bookinfo.chapterId,
            });

            DeviceEventEmitter.emit('time', {
              time: getDateDiff(new Date()),
              bookname: bookinfo.name,
            });
          }}
          style={{width: 120, margin: 30, backgroundColor: '#d5a3c9'}}>
          立即阅读
        </Button>
      </View>
    </View>
  );
}

export default memo(BookInfo);
