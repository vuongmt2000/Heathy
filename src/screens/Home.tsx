import React, { useEffect, useCallback, useState } from 'react'
import { FlatList, StyleSheet, View, Image, TextInput, Text, TouchableOpacity, Modal, Pressable, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select';

import { RootReducerModel } from '../reducers'
import { homeActions } from '../reducers/HomeReducer'
import { Product } from '../type'


const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(homeActions.requestColor());
    dispatch(homeActions.requestProduct());
  }, [])

  const { products, updateProducts, colors, loading } = useSelector((state: RootReducerModel) => state.homeReducer)
  const [page, setPage] = useState(1)
  const [data, setData] = useState<Product[]>([])
  const [dataChange, setDataChange] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorName, setErrorName] = useState<Number[]>([])
  const [errorSku, setErrorSku] = useState<Number[]>([])
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    let cloneData = JSON.parse(JSON.stringify(products))
    if (products.length < page + 10) {
      setData(data.concat(cloneData.slice((page - 1) * 10, products.length)))
    } else {
      setData(data.concat(cloneData.slice((page - 1) * 10, 10 * page)))
    }
  }, [products, page])


  const filterColor = (index: number) => {
    const colorDefault = { 'id': 3, "name": 'red' }
    const colorProduct = colors.find(x => x.id === index) || colorDefault
    return colorProduct
  }


  const onChangeTextName = (text: String, index: number) => {
    if (text) {
      let cloneErr = [...errorName]
      let indexErr = cloneErr.indexOf(index)
      if (indexErr > -1) {
        cloneErr.splice(indexErr, 1)
        setErrorName(cloneErr)
      }
    } else {
      let cloneErr = [...errorName]
      cloneErr.push(index)
      setErrorName(cloneErr)
    }
    let cloneData = JSON.parse(JSON.stringify(data))
    cloneData[index].name = text;
    setData(cloneData)
  }

  const onChangeTextSku = (text: String, index: number) => {
    if (text) {
      let cloneErr = [...errorSku]
      let indexErr = cloneErr.indexOf(index)
      if (indexErr > -1) {
        cloneErr.splice(indexErr, 1)
        setErrorSku(cloneErr)
      }
    } else {
      let cloneErr = [...errorSku]
      cloneErr.push(index)
      setErrorSku(cloneErr)
    }
    let cloneData = JSON.parse(JSON.stringify(data))
    cloneData[index].sku = text;
    setData(cloneData)
  }

  const onChangeColor = (index: any) => {

  }

  const handleLoadMore = () => {
    setPage(page + 1)
    setIsLoading(true)
  }

  const renderFooter = () => {
    return (
      <View>

      </View>
    )
  }

  const onChangeColors = (value: any, index : any) =>{
    let cloneData = JSON.parse(JSON.stringify(data))
    cloneData[index].color = value;
    setData(cloneData)
  }

  const Item = ({ item, index }: any) => {
    // const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(index - 1));
    return (
      <View style={styles.containerItem}>
        <View style={styles.viewItem}>
          <Image style={styles.photo} source={{ uri: item.image || 'https://sieupet.com/sites/default/files/gia-cho-shiba-inu-02-768x768_0.jpg' }} />
          <View style={styles.textView}>
            <TextInput value={item.name} style={styles.inputName} onChangeText={(text: String) => onChangeTextName(text, index)} maxLength={50} />
            {errorName.includes(index) ? <Text style={styles.textError}>!!!Require name product</Text> : <View />}
            <Text>{item.errorDescription}</Text>
            <TextInput value={item.sku} style={styles.inputSku} onChangeText={(text: String) => onChangeTextSku(text, index)} keyboardType="numeric" maxLength={20} />
            {errorSku.includes(index) ? <Text style={styles.textError}>!!!Require sku product</Text> : <View />}
            <RNPickerSelect
            placeholder={{ label: "null", value: null }}
            onValueChange={(value) => onChangeColors(value, index)}
            value = { filterColor(item.color).id }
            items={[
                { label: 'White', value: 1 },
                { label: 'Black', value: 2 },
                { label: 'Red', value:3 },
                { label: 'Green', value:4 },
                { label: 'Blue', value:5 },
                { label: 'Yellow', value:6 },
            ]}
        />
          </View>
          <Image source={require('../assets/image/icons8-edit-64.png')} style={styles.icon} />
        </View>
      </View>
    )
  }


  const onSubmit = () => {
    if (errorName.length || errorSku.length) return;
    setModalVisible(true)
    let arrayChange = []
    for (let i = 0; i < data.length; i++) {
      if (JSON.stringify(products[i]) !== JSON.stringify(data[i])) {
        arrayChange.push(data[i])
      }
    }
    setDataChange(arrayChange)
  }

  const changeProducts = () =>{
    setModalVisible(false)
    const update = data.concat(products.slice((data.length - 1), products.length - 1))
    dispatch(homeActions.requestUpdateProduct(update))
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={Item}
        keyExtractor={(item, index) => `Product-${index}`}
        ListFooterComponent={renderFooter()}
        onEndReached={() => handleLoadMore()}
        onEndReachedThreshold={0}
      />
      <View style={styles.viewBtn}>
        <TouchableOpacity style={styles.btn} onPress={() => onSubmit()}>
          <Text style={styles.txtbtn}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(230, 230, 230, 0.5)' }}>
          <View style={{ height: "60%", width: "100%", marginHorizontal: 16, shadowOpacity: 0.25, shadowColor: "#000", }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", paddingHorizontal: 16 }}>Submit Change</Text>
            <FlatList
              data={dataChange}
              renderItem={Item}
              keyExtractor={(item, index) => `Product-${index}`}
              ListFooterComponent={renderFooter()}
              onEndReached={() => handleLoadMore()}
              onEndReachedThreshold={0}
              ListEmptyComponent={() => (
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color: 'black', fontSize: 18 }} >no submit change</Text>
                </View>
              )}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 16 }}>
              <Pressable
                style={{
                  borderRadius: 20,
                  height: 50,
                  width: 120,
                  padding: 10,
                  elevation: 2,
                  backgroundColor: "#F194FF",
                  justifyContent: "center",
                  alignContent: 'center'
                }}
                onPress={() =>{
                  setModalVisible(!modalVisible)
                  setData([])
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={{
                  borderRadius: 20,
                  padding: 10,
                  height: 50,
                  width: 120,
                  elevation: 2,
                  backgroundColor: "#2196F3",
                  justifyContent: "center",
                  alignContent: 'center',
                  marginLeft: 32
                }}
                onPress={() => changeProducts()}
              >
                <Text style={styles.textStyle} >Ok</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerItem: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "#fafafa",
    marginHorizontal: 16,
    marginVertical: 8,
    shadowOpacity: 0.25,

  },
  viewItem: {
    flexDirection: "row",
    alignItems: 'center',
    marginVertical: 16,

  },
  photo: {
    height: 70,
    width: "25%",
    borderRadius: 10,
    marginLeft: 8
  },
  inputName: {
    height: 36,
    width: '100%',
    fontWeight: "bold"
  },
  inputSku: {
    height: 36,
    width: '100%',
  },
  textView: {
    width: '50%',
    marginHorizontal: 8
  },
  styleColor: {
    flexDirection: 'row'
  },
  icon: {
    height: 26,
    width: 26
  },
  btn: {
    height: 60,
    width: "100%",
    backgroundColor: 'blue',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewBtn: {
    // position: 'absolute',
    // bottom: 0,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 16
  },
  txtbtn: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  textError: {
    color: 'red',
    fontWeight: "bold",
    fontSize: 14
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
})

export default Home