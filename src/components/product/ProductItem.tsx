import { useNavigation } from '@react-navigation/core'
import moment from 'moment'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import TText from '../Text'

const ProductItem = (props: any) => {
    let navigation = useNavigation<any>()
    const data = props.item
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('ProductInfo', { code: data.barCode })}
            activeOpacity={1}
            style={styles.wrapItem}>
            <FastImage
                resizeMode='contain'
                style={styles.thumbnai}
                source={{ uri: data.image }}
            />
            <View style={styles.rightView}>
                <TText style={styles.title}>{data.name}</TText>
                <TText >Mã: {data.barCode}</TText>
                <TText ><TText>Ngày quét</TText>: {moment(data.scanDate).format('MM-DD-YYYY')}</TText>
                <TouchableOpacity
                    onPress={() => props.onDelete(data.barCode)}
                    style={styles.btnDelete}>
                    <TText>Xóa</TText>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

export default ProductItem

const styles = StyleSheet.create({
    wrapItem: {
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        marginTop: 3
    },
    thumbnai: {
        width: 80,
        aspectRatio: 1,
    },
    rightView: {
        flex: 1,
        paddingLeft: 15,

    },
    title: {
        fontWeight: '600',
        fontSize: 15
    },
    btnDelete: {
        borderWidth: 1,
        borderRadius: 10,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: 70

    }
})
