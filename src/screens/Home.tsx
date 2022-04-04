import React, { useEffect , useState} from 'react'
import { FlatList, StyleSheet, View, Image, TextInput, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
// import Item from '../components/Item'
import { RootReducerModel } from '../reducers'
import { homeActions } from '../reducers/HomeReducer'
import { Product } from '../type'

const Home = () => {
  const dispatch = useDispatch()
  const { product, updateProduct, color, loading } = useSelector((state: RootReducerModel) => state.homeReducer)

  useEffect(() => {
    dispatch(homeActions.requestColor());
    dispatch(homeActions.requestProduct());
  }, [])
  const Item = ({item, index}: any) => {
    // const [nameProduct, setNameProduct] = useState(name || "")
    // const [skuProduct, setSkuProduct] = useState(sku || "")
    // const [colorProduct, setColorProduct] = useState(color || "")
 return (
     <View style = {styles.container}>
     <View style = {styles.viewItem}>
        <Image style = {styles.photo} source = {{uri : item.image || 'https://sieupet.com/sites/default/files/gia-cho-shiba-inu-02-768x768_0.jpg'}}/>
        <View >
            <TextInput value={item.name} style = {styles.input} onChangeText={()=>{}} />
            <Text>{item.errorDescription}</Text>
            <TextInput value={item.sku} style = {styles.input} onChangeText={()=>{}} />
            <TextInput value={item.color} style = {styles.input} onChangeText={()=>{}} />
        </View>
     </View>
     </View>
 )
}

  return (
    <View style = {styles.container}>
    <FlatList
    data = {product}
    renderItem = {Item}
    keyExtractor= {(item, index) => `sPicker-${index}`}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  },
  viewItem :{
    flexDirection: "row"
},
photo: {
    height: 60,
     width: 80,
     borderRadius: 10
},
input: {
    height: 40, 
    width: '60%'
}
})

export default Home