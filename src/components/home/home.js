import {  Text, View, SafeAreaView, } from 'react-native';
import style from './home.styles';


export default function Home(){
    return (
    <SafeAreaView>
        <View style={style.container}>
             <Text>Procrastinator</Text>
        </View>
    </SafeAreaView>
    )
}