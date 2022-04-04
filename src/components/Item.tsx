import React, {useState} from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text, TextInput } from 'react-native'
import { Product } from '../type'

const Item = ({image, name, id, errorDescription, sku, color}: Product) => {
    const [nameProduct, setNameProduct] = useState(name || "")
    const [skuProduct, setSkuProduct] = useState(sku || "")
    const [colorProduct, setColorProduct] = useState(color || "")
 return (
     <View style = {styles.container}>
     <View style = {styles.viewItem}>
        <Image style = {styles.photo} source = {{uri : image || 'https://sieupet.com/sites/default/files/gia-cho-shiba-inu-02-768x768_0.jpg'}}/>
        <View >
            <TextInput value={nameProduct} style = {styles.input} onChangeText={setNameProduct} />
            <Text>{errorDescription}</Text>
            <TextInput value={skuProduct} style = {styles.input} onChangeText={setSkuProduct} />
            <TextInput value={colorProduct} style = {styles.input} onChangeText={setColorProduct} />
        </View>
     </View>
     </View>
 )
}

const styles = StyleSheet.create({
    container: {
        flex :1
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

export default Item