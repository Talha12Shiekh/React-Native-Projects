import {Text,View,StyleSheet} from "react-native" 

interface ScreenProps {
    text:String
}

const EmptyScreen = ({text}:ScreenProps) => {
    return <View style={styles.container}>
        <Text>{text}</Text>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default EmptyScreen