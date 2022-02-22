import React, {useState, useEffect} from 'react';
import {StyleSheet, Image} from 'react-native';
import {
  VStack,
  Input,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  Divider,
  Heading,
  AspectRatio,
  HStack,
  Pressable,
  Stack,
  ScrollView,
} from 'native-base';
import Swiper from 'react-native-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default function Home({navigation}) {
  const [lunbo, setLunbo] = useState([]);
  const [cardlike, setCardlike] = useState([]);
  const [cardhot, setCardhot] = useState([]);
  const [titlelike, setTitlelike] = useState([]);
  const [titlehot, setTitlehot] = useState([]);
  const [value, setValue] = useState('');
  useEffect(() => {
    const url = `https://b.zhuishushenqi.com/category/classifylist?node=bf0a65255a5b4c138052dca8ef065753`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setLunbo(data.data.spread[0].advs);
      });
    const url2 = `https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?gender=0&actionid=9062`;
    fetch(url2)
      .then(res => res.json())
      .then(data => {
        setCardlike(data.ResponseObject[0].Cards[1].Data);
        setTitlelike(data.ResponseObject[0].Cards[1].Title);
        setCardhot(data.ResponseObject[0].Cards[4].Data);
        setTitlehot(data.ResponseObject[0].Cards[4].Title);
      });
  }, []);
  // useEffect(() => {
  //     console.log(value,'aaaaaaaaaaaa')
  // }, [value])

  const handleChange = val => {
    setValue(val);
  };
  const handleMore = val => {
    const url2 = `https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9004&id=2&type=3&take=20&pageIndex=${val}`;
    fetch(url2)
      .then(res => res.json())
      .then(data => {
        const list = data.ResponseObject[0].module.itemList;
        navigation.navigate('Bookdetail', {list: list});
      });
  };
  const handleSunmit = () => {
    // console.log(value,'xxxxxxxxxx')
    const url2 = `https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9014&keyword=${value}`;
    fetch(url2)
      .then(res => res.json())
      .then(data => {
        const list = data.ResponseObject[0].module.bookList;
        navigation.navigate('Bookdetail', {list: list});
      });
    setValue('');
  };
  return (
    <NativeBaseProvider>
      <ScrollView>
        {/* 搜索框 */}
        <VStack width="100%" space={5}>
          <Input
            value={value}
            placeholder="请输入搜索关键词"
            borderRadius="1"
            py="3"
            px="1"
            fontSize="14"
            onChangeText={handleChange}
            onSubmitEditing={handleSunmit}
            _web={{
              _focus: {borderColor: 'muted.300', style: {boxShadow: 'none'}},
            }}
            InputLeftElement={
              <Icon
                m="2"
                ml="3"
                size="6"
                color="gray.400"
                as={<MaterialIcons name="search" />}
              />
            }
          />
        </VStack>

        {/* 轮播图 */}
        <Box w="100%" h="200">
          <Swiper showsButtons={true}>
            {lunbo.map(item => (
              <Box key={item.link}>
                <Image
                  source={{uri: item.bgImg}}
                  style={{width: '100%', height: 150}}
                />
              </Box>
            ))}
          </Swiper>
        </Box>

        {/* 分类 */}
        <HStack mb="3">
          <Box alignItems="center" justifyContent="space-between" flex={1}>
            <Pressable onPress={() => navigation.navigate('Classify')}>
              <AntDesign name="bars" size={30} color="#235788" />
            </Pressable>
            <Text
              fontSize="xs"
              _light={{
                color: 'coolGray.500',
              }}
              _dark={{
                color: 'coolGray.400',
              }}
              fontWeight="500">
              分类
            </Text>
          </Box>
          <Box alignItems="center" justifyContent="space-between" flex={1}>
            <Pressable onPress={() => navigation.navigate('Bookdetail')}>
              <Ionicons name="ios-trophy-outline" size={30} color="#6e40a3" />
            </Pressable>
            <Text
              fontSize="xs"
              _light={{
                color: 'coolGray.500',
              }}
              _dark={{
                color: 'coolGray.400',
              }}
              fontWeight="500">
              排行榜
            </Text>
          </Box>
          <Box alignItems="center" justifyContent="space-between" flex={1}>
            <Pressable onPress={() => navigation.navigate('Bookdetail')}>
              <MaterialCommunityIcons
                name="bookshelf"
                size={30}
                color="#3b3ba5"
              />
            </Pressable>
            <Text
              fontSize="xs"
              _light={{
                color: 'coolGray.500',
              }}
              _dark={{
                color: 'coolGray.400',
              }}
              fontWeight="500">
              书架
            </Text>
          </Box>
        </HStack>

        {/* 热门 */}
        <Center flex={1} px="3">
          <Box w="100%">
            {/* {cards.map((item) => */}
            <Box
              w="100%"
              mb="5"
              borderRadius="1"
              _dark={{
                borderColor: 'coolGray.600',
                backgroundColor: 'gray.700',
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: 'gray.50',
              }}>
              <Box p="2">
                <Pressable onPress={() => handleMore(1)}>
                  <HStack>
                    <FontAwesome5 name="hotjar" size={24} color="red" />
                    <Text
                      fontSize="xl"
                      ml={5}
                      color="coolGray.800"
                      _dark={{
                        color: 'warmGray.200',
                      }}
                      fontWeight="400">
                      {titlehot}
                    </Text>
                    <Text ml="40" color="coolGray.400" marginTop={1}>
                      更多
                      <AntDesign name="right" size={14} color="gray" />
                    </Text>
                  </HStack>
                </Pressable>
              </Box>
              <HStack p="2">
                {cardhot.map((item, index) => (
                  <Box w="50%" h="220" mb={10} key={index}>
                    <Pressable
                      onPress={() =>
                        navigation.navigate('BookInfo', {id: item.BookId})
                      }>
                      <Box>
                        <AspectRatio w="90%" ratio={3 / 4} ml={2}>
                          <Image
                            source={{
                              uri: item.Cover,
                            }}
                            alt="image"
                          />
                        </AspectRatio>
                        <Box alignItems="center" justifyContent="space-between">
                          <Heading size="md" ml="-1">
                            {item.Name}
                          </Heading>
                          <Text
                            color="coolGray.600"
                            _dark={{
                              color: 'warmGray.200',
                            }}
                            fontWeight="400">
                            {item.Author}
                          </Text>
                        </Box>
                      </Box>
                    </Pressable>{' '}
                  </Box>
                ))}
              </HStack>
            </Box>
            {/* )} */}
          </Box>
          <Box w="100%">
            {/* {cards.map((item) => */}
            <Box
              w="100%"
              mb="5"
              p="2"
              borderRadius="1"
              _dark={{
                borderColor: 'coolGray.600',
                backgroundColor: 'gray.700',
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: 'gray.50',
              }}>
              <Box p="1">
                <Pressable onPress={() => handleMore(2)}>
                  <HStack>
                    <AntDesign name="heart" size={24} color="pink" />
                    <Text
                      fontSize="xl"
                      ml={5}
                      color="coolGray.800"
                      _dark={{
                        color: 'warmGray.200',
                      }}
                      fontWeight="400">
                      {titlelike}
                    </Text>
                    <Text ml="40" color="coolGray.400">
                      更多
                      <AntDesign name="right" size={14} color="gray" />
                    </Text>
                  </HStack>
                </Pressable>
              </Box>
              {cardlike.map((item, index) => (
                <Box h="150" mb={8} key={index} p="2">
                  <Pressable
                    onPress={() =>
                      navigation.navigate('BookInfo', {id: item.BookId})
                    }>
                    <HStack>
                      <AspectRatio w="26%" ratio={3 / 5} flex={1}>
                        <Image
                          source={{
                            uri: item.Cover,
                          }}
                          alt="image"
                        />
                      </AspectRatio>
                      <Stack flex={3} p={1} paddingLeft={2} mt={2}>
                        <Stack space={3}>
                          <Heading size="md">{item.Name}</Heading>
                          <Box w="250">
                            <Text
                              isTruncated
                              numberOfLines={2}
                              fontSize="xs"
                              _light={{
                                color: 'coolGray.400',
                              }}
                              _dark={{
                                color: 'coolGray.400',
                              }}
                              fontWeight="500">
                              {item.Introduction}
                            </Text>
                          </Box>
                        </Stack>

                        <HStack
                          alignItems="center"
                          justifyContent="space-between"
                          mt={4}>
                          <HStack alignItems="center">
                            <FontAwesome name="user" size={18} color="gray" />
                            <Box flex={5}>
                              <Text
                                color="coolGray.500"
                                _dark={{
                                  color: 'warmGray.200',
                                }}
                                marginLeft={2}
                                fontWeight="400">
                                {item.Author}
                              </Text>
                            </Box>
                            <Box flex={3}>
                              <Text
                                pl={1}
                                
                                fontSize="xs"
                                color="#bc84a8"
                                fontWeight="400">
                                {item.ReadNumText}
                              </Text>
                            </Box>
                          </HStack>
                        </HStack>
                      </Stack>
                    </HStack>
                  </Pressable>
                </Box>
              ))}
            </Box>
          </Box>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}
