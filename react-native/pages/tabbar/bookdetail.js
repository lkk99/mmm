import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {
  Text,
  NativeBaseProvider,
  Center,
  Box,
  Heading,
  AspectRatio,
  HStack,
  Pressable,
  Stack,
  ScrollView,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Home({navigation, route}) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setCards(route.params.list);
  }, []);

  return (
    <NativeBaseProvider >
      <ScrollView mt={3}>
        <Center flex={1} px="3">
          <Box w="100%">
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
              {cards.map((item, index) => (
                <Box h="150" mb={10} key={index}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('BookInfo', {id: item.bookId})
                    }>
                    <HStack>
                      <AspectRatio w="26%" ratio={3 / 5} flex={1}>
                        <Image
                          source={{
                            uri: item.cover,
                          }}
                          alt="image"
                        />
                      </AspectRatio>
                      <Stack flex={3} p={1} mt={2}>
                        <Stack space={3}>
                          <Heading size="md">{item.name}</Heading>
                          <Box w={250}>
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
                              {item.introduce}
                            </Text>
                          </Box>
                        </Stack>

                        <HStack
                          alignItems="center"
                          justifyContent="space-between"
                          mt={6}>
                          <HStack alignItems="center">
                            <FontAwesome name="user" size={18} color="gray" />
                            <Box flex={5}>
                              <Text
                                color="coolGray.500"
                                _dark={{
                                  color: 'warmGray.200',
                                }}
                                ml={2}
                                fontWeight="400">
                                {item.author}
                              </Text>
                            </Box>
                            <Box flex={3}>
                              <Text
                                fontSize="xs"
                                color="coolGray.400"
                                _dark={{
                                  color: 'warmGray.200',
                                }}
                                fontWeight="400">
                                {item.readNumText}人气
                                <Entypo name='air' size={16} color="#bc84a8"/>
                              </Text>
                            </Box>
                          </HStack>
                        </HStack>
                      </Stack>
                    </HStack>
                  </Pressable>{' '}
                </Box>
              ))}
            </Box>
          </Box>
        </Center>
      </ScrollView>
    </NativeBaseProvider>
  );
}
