import { Card, Text } from "react-native-paper";
import { View, StyleSheet, ScrollView,ImageSourcePropType,ViewStyle } from "react-native";
import {
  useFonts,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_400Regular
} from '@expo-google-fonts/nunito-sans';

interface CardProps {
    image:ImageSourcePropType,
    title:string,
    description:string,
    showDescription:boolean,
    width:string 
}

export const CARD_TITLE_COLOR = "#3B3F49"

const SingleCard = ({image,title,description,showDescription,width}:CardProps) => {
  let [fontsLoaded] = useFonts({
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_400Regular
  });
    return <Card style={[styles.card,{width}]}>
    <Card.Cover style={styles.cardImage} source={image} />
    <View>
      <View style={styles.cardContent}>
        <Text variant="titleMedium" style={styles.cardTitle}>{title}</Text>
        {showDescription && <Text variant="titleMedium" style={styles.cardDescription}>{description}</Text>}
      </View>
    </View>
  </Card>
}

const styles = StyleSheet.create({
    cardImage: {
        borderRadius: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      },
      card: {
        borderRadius: 15,
        marginRight: 10,
      },
      cardsContainer: {
        marginVertical: 15,
        flexDirection:"row"
      },
      cardContent: {
        padding: 15,
      },
      cardDescription:{
        fontFamily:"NunitoSans_400Regular",
        color:"grey"
      },
      cardTitle:{fontFamily:"NunitoSans_700Bold",color:CARD_TITLE_COLOR}
})

export default SingleCard;