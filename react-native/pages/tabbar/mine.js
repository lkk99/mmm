import {background} from 'native-base/lib/typescript/theme/styled-system';
import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Modal,
  StyleSheet,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import {Box, Input, Text, Button, Pressable, Center} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import storage from '../storage';

const Mine = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [changTag, setChangeTag] = useState(true);
  const [loginTag, setlogintag] = useState(true);
  const [userName, setUserName] = useState();
  const [error, serError] = useState();

  const styles = StyleSheet.create({
    titletext: {
      fontFamily: 'Microsoft YaHei',
      fontSize: 16,
      textAlign: 'center',
      color: 'black',
    },
    context: {
      fontFamily: 'Microsoft YaHei',
      fontSize: 10,
      textAlign: 'center',
    },
    bulidtext: {
      fontFamily: 'Microsoft YaHei',
      fontSize: 10,
      textAlign: 'center',
    },
    textbox: {
      marginTop: 21,
      marginLeft: 10,
      height: 30,
      marginBottom: 10,
    },
    textbox1: {
      marginTop: 21,
      marginLeft: 10,
      height: 30,
    },
    text: {
      fontFamily: 'Microsoft YaHei',
      fontSize: 14,
    },
    icon: {
      position: 'relative',
      top: -18,
      left: 325,
    },
    name: {
      position: 'absolute',
      top: 42,
      left: 120,
      fontSize: 20,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 60,
    },
  });

  //注册模态框
  const Register = () => {
    const [email, setEmail] = useState();
    const [value, onChangeText] = React.useState();
    const [pwd, onChangePwd] = React.useState();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    // 提交注册
    const submit = () => {
      const url = 'http://121.4.139.72:8888/register';
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          nickname: value,
          password: pwd,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.code === 2000) {
            setEmail('');
            onChangeText('');
            onChangePwd('');
            setChangeTag(false);
          } else {
            serError(data.err);
            setTimeout(() => {
              serError('');
            }, 3000);
          }
        });
    };

    return (
      <>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
          }}>
          注册
        </Text>
        <Text style={{fontSize: 12, color: 'red', textAlign: 'center'}}>
          {error}
        </Text>
        <Box flexDirection="row" p="5" paddingLeft="10">
          <Text style={{lineHeight: 40}}>
            <Entypo name="email" size={20} color="#d5a3c9" /> :
          </Text>
          <Input
            variant="underlined"
            placeholder="请输入邮箱"
            w="180"
            size="sm"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </Box>
        <Box flexDirection="row" paddingLeft="10">
          <Text style={{lineHeight: 40}}>
            <Entypo name="emoji-flirt" size={20} color="#8076a3" /> :
          </Text>
          <Input
            variant="underlined"
            placeholder="请输入昵称"
            w="180"
            size="sm"
            onChangeText={text => onChangeText(text)}
            value={value}
          />
        </Box>
        <Box flexDirection="row" p="5" paddingLeft="10">
          <Text style={{lineHeight: 40}}>
            <Entypo name="progress-two" size={20} color="#93b5cf" /> :
          </Text>
          <Input
            type={show ? 'text' : 'password'}
            w={{
              base: '75%',
              md: '25%',
            }}
            variant="underlined"
            InputRightElement={
              <Entypo
                name={show == true ? 'eye' : 'eye-with-line'}
                size={20}
                onPress={() => setShow(!show)}
              />
            }
            placeholder="请输入密码"
            onChangeText={text => onChangePwd(text)}
            value={pwd}
          />
        </Box>
        <Button
          onPress={submit}
          style={{width: 100, marginLeft: 100, marginTop: -5}}>
          注册
        </Button>
        <Text
          style={{fontSize: 14, color: '#aaa', textAlign: 'center'}}
          onPress={() => setChangeTag(false)}>
          已有账号？去登录
        </Text>
      </>
    );
  };

  //登录模态框
  const Login = () => {
    const [email, setEmail] = useState();
    const [pwd, onChangePwd] = React.useState();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const userLogin = () => {
      const url = 'http://121.4.139.72:8888/login';
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: pwd,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.code === 2000) {
            setEmail('');
            onChangePwd('');
            setModalVisible(false);
            setlogintag(false);
            setUserName(data.userName);
            // changeLogin(true);
            storage.save({key: 'loginTag', data: true});
          }
        });
    };
    return (
      <>
        <Text style={{fontSize: 20, textAlign: 'center'}}>登录</Text>
        <Text style={{fontSize: 12, color: 'red', textAlign: 'center'}}>
          {error}
        </Text>
        <Box flexDirection="row" p="5" paddingLeft="10">
          <Text style={{lineHeight: 40}}>
            <Entypo name="email" size={20} color="#d5a3c9" /> :
          </Text>
          <Input
            variant="underlined"
            placeholder="请输入邮箱"
            w="180"
            size="sm"
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </Box>
        <Box flexDirection="row" p="5" paddingLeft="10">
          <Text style={{lineHeight: 40}}>
            <Entypo name="progress-two" size={20} color="#93b5cf" /> :
          </Text>
          <Input
            type={show ? 'text' : 'password'}
            w={{
              base: '75%',
              md: '25%',
            }}
            variant="underlined"
            InputRightElement={
              <Entypo
                name={show == true ? 'eye' : 'eye-with-line'}
                size={20}
                onPress={handleClick}
              />
            }
            placeholder="请输入密码"
            onChangeText={text => onChangePwd(text)}
            value={pwd}
          />
        </Box>
        <Button
          onPress={userLogin}
          style={{width: 100, marginLeft: 100, marginTop: 40}}>
          登录
        </Button>
        <Text
          style={{fontSize: 14, color: '#aaa', textAlign: 'center'}}
          onPress={() => setChangeTag(true)}>
          还未创建账号？去注册
        </Text>
      </>
    );
  };

  //   未登录组件
  const NotLogin = () => {
    return (
      <Box bg="fuchsia.50" w="100%" h="100%">
        <Box h="50%" bg="coolGray.50" mt="5">
          <Box
            h="50%"
            w="90%"
            mx="5%"
            mt="10px"
            pt="10px"
            borderRadius={20}
            borderWidth={3}
            borderColor={'fuchsia.100'}>
            <Text style={styles.titletext}>请先登录</Text>
            <Text style={styles.context}>阅读进度、帐号信息跨设备同步</Text>
            <Button
              bg="secondary.300"
              mt="2"
              mb="2"
              h="10"
              w="80%"
              ml="10%"
              borderRadius="full">
              <Text
                style={{color: 'white', fontSize: 18}}
                onPress={() => {
                  setModalVisible(true);
                  setChangeTag(false);
                }}>
                马上登录
              </Text>
            </Button>
            <Text
              style={styles.bulidtext}
              onPress={() => {
                setModalVisible(true);
                setChangeTag(true);
              }}>
              还未创建账号？立即创建！
            </Text>
          </Box>

          <Box style={styles.textbox}>
            <Text style={styles.text}>帮助中心</Text>
            <Box style={styles.icon}>
              <AntDesign name="right" size={14} color="black" />
            </Box>
          </Box>
          <Box style={styles.textbox}>
            <Text style={styles.text}>问题反馈</Text>
            <Box style={styles.icon}>
              <AntDesign name="right" size={14} color="black" />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  //已登录组件
  const IsLogin = () => {
    return (
      <Box bg="fuchsia.50" w="100%" h="100%">
        <Box h="60%" bg="coolGray.50" mt="5">
          <Box
            h="32%"
            w="90%"
            mx="5%"
            mt="10px"
            pt="18px"
            pl="22.5px"
            borderRadius={20}
            borderWidth={3}
            borderColor={'fuchsia.100'}
            style={styles.head}>
            <Image
              source={require('./images/hi.jpg')}
              style={styles.image}></Image>
          </Box>
          <Text style={styles.name}>用户：{userName}</Text>
          <Box style={styles.textbox}>
            <Text style={styles.text}>帮助中心</Text>
            <Box style={styles.icon}>
              <AntDesign name="right" size={14} color="black" />
            </Box>
          </Box>
          <Box style={styles.textbox}>
            <Text style={styles.text}>浏览记录</Text>
            <Box style={styles.icon}>
              <AntDesign name="right" size={14} color="black" />
            </Box>
          </Box>
          <Box style={styles.textbox}>
            <Text style={styles.text}>问题反馈</Text>
            <Box style={styles.icon}>
              <AntDesign name="right" size={14} color="black" />
            </Box>
          </Box>
          <Box>
            <Button bg="secondary.300" mt="20" h="10" w="80%" ml="10%">
              <Text
                style={{color: 'white', fontSize: 18}}
                onPress={() => {
                  setlogintag(true);
                  storage.save({key: 'loginTag', data: false});
                }}>
                退出登录
              </Text>
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <View>
      <Box
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: '#93b5cf',
          borderBottomWidth: 2,
          borderBottomColor: 'pink',
          borderBottomStyle: 'solid',
        }}>
        {loginTag == true ? <NotLogin /> : <IsLogin />}
      </Box>

      {/* 模态框 */}
      <Modal
        animationType="slide" // 从底部滑入
        transparent={true}
        visible={modalVisible} // 根据isModal决定是否显示
      >
        <Box
          style={{
            height: 350,
            width: 300,
            backgroundColor: '#fff',
            marginTop: 130,
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 10,
            borderStyle: 'solid',
            borderColor: '#aaa',
            borderWidth: 1,
          }}>
          {/* 关闭页面 */}
          <Box>
            <Text
              style={{
                fontSize: 24,
                color: '#aaa',
                marginLeft: 270,
                marginTop: 10,
              }}
              onPress={() => {
                setModalVisible(false);
              }}>
              ×
            </Text>
            {changTag == true ? <Register /> : <Login />}
          </Box>
        </Box>
      </Modal>
    </View>
  );
};

export default Mine;
