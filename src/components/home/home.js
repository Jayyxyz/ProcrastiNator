import {  Text, View, SafeAreaView, } from 'react-native';
import style from './home.styles';
import TaskScheduler from '../taskScheduler/taskScheduler';


export default function Home(){
    return (
    <SafeAreaView>
        <View style={style.container}>
          <TaskScheduler></TaskScheduler>   
        </View>
    </SafeAreaView>
    )
}