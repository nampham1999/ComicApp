import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import TText from '../Text'
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../constant/Colors'
import RankItem from '../Item/RankItem'
import dataService from '../../network/dataService'

const RankComic = () => {
    const rank = useSelector((state: any) => state.home.rank)
    const navigation: any = useNavigation();
    const dispatch = useDispatch()
    React.useEffect(() => {
        getRank()
    }, [])

    const getRank = async () => {
        let rs: any = await dataService.getRank()
        if (!rs) return
        if ((typeof rs.list) != "object") return
        dispatch({
            type: 'SET_RANK',
            data: rs.list
        })

    }

    return (
        <View style={{
            paddingVertical: 15
        }}>
            <View style={styles.headerCard}>
                <TText style={[styles.titleCard]}>
                    BẢNG XẾP HẠNG
                </TText>

            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={{
                    height: 210,
                    flexWrap: 'wrap'
                }}>

                    {rank.map((item: any, index: number) => <RankItem index={index} key={index} item={item} />)}

                </View>

            </ScrollView>
        </View>
    )
}

export default RankComic

const styles = StyleSheet.create({
    headerCard: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
    },
    titleCard: {
        fontWeight: 'bold',
    },
    wrapRightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreText: {
        fontSize: 13,
    },
})
