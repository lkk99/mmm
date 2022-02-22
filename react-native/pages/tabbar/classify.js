
import React, { useEffect, useState } from 'react';
import { Box, ScrollView, Text, NativeBaseProvider, Flex, Pressable, Center } from 'native-base'
import {
  Image
} from 'react-native';
const Classify = ({navigation}) => {
  const [classfication, setClassfication] = useState([]);
 
  const [id, setID] = useState(0)
 const [list,setList]=useState([])
  useEffect(() => {
    const url = `https://ccdn.andreader.com/sharp/H5BookStore/act.ashx?actionid=9009`
    getClassify(url)
   
  }, [])
  const getClassify = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setClassfication(data.ResponseObject[0].module);   
        setList(data.ResponseObject[0].module[id])    
      })
  } 
  // const onPress = (item) => {
  //   setID(item.id - 1)
  //   setList(classfication[id]) 
  //   // console.log(id)
  // }
  return <NativeBaseProvider>
    <ScrollView>
      <Flex
        direction="row"
        mb="2.5"
        mt="1.5"
        _text={{
          color: "coolGray.800",
        }} >
        <Box w="20%" h="120" mt="13">
          {classfication.map((item) =>
            <Pressable key={item.id} onPress={() => {
              setID(item.id - 1)
              setList(classfication[id]) 
              // console.log(id)
            }} width={"100%"} height={"50"} style={{backgroundColor:id===item.id-1?"#e5e5e5":"white"}}><Text style={{color:id===item.id-1?"red":"black"}} textAlign="center" marginTop="3" fontSize="18">{item.name}</Text></Pressable>
          )}
        </Box>
        <Box w="80%" h="100%" mt="13" bg="muted.200" flexDirection={"row"} flexWrap={"wrap"} flex={1}>
          {
             list.itemList&&list.itemList.map((item) =>

              <Box w="45%" h="74" mt="2" mb="2" bg="info.50" ml="3" key={item.name} flexDirection={"row"} borderRadius="16" shadow="5">
                <Pressable onPress={() => navigation.navigate("ClassifyList",{name:item.name,moreId:item.moreId})}>
                  <Center flexDirection={"row"}>
                    <Text m="2"> {item.name}</Text>
                    <Image source={{ uri: item.cover }} alt="" style={{ width: 48, height: 64,marginTop:4 }} />
                  </Center>
                </Pressable>

              </Box>
            )}
        </Box>
      </Flex>
    </ScrollView>
  </NativeBaseProvider>
};

export default Classify