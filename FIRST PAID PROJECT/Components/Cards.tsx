import { Card, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import {CARDS_DATA} from "../Constants";
import {
  useFonts,
  NunitoSans_600SemiBold,
  NunitoSans_800ExtraBold,
} from '@expo-google-fonts/nunito-sans';


const SingleCard = () => {
  let [fontsLoaded] = useFonts({
    NunitoSans_600SemiBold,
    NunitoSans_800ExtraBold,
  });
  return (
    <View style={styles.cardsContainer}>
        {
            CARDS_DATA.map(({title,description,Icon,key}) => {
                return <Card key={key} style={styles.card}>
                <Card.Content style={styles.cardContent}>
                  <View style={{width:"100%"}}>
                    <Text variant="titleSmall" style={styles.title}>{title}</Text>
                    <Text variant="bodyMedium" style={styles.desc}>{description}</Text>
                  </View>
                  <View>
                    {Icon}
                  </View>
                </Card.Content>
              </Card>
            })
        }
      
    </View>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 2.5,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 5,
  },
  card: {
    width: "44%",
    margin: 12,
    padding: 0,
    backgroundColor:"white"
  },
  cardContent: {
    flexDirection: "row",
    justifyContent:"space-around",
  },
  title:{
    fontFamily:"NunitoSans_800ExtraBold"
  },
  desc:{
    fontFamily:"NunitoSans_600SemiBold"
  }
});

export default SingleCard;
