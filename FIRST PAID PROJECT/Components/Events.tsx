import { Card, Text } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { EVENTS_DATA } from "../Constants";
import SingleCard from "./SingleCard";
import { useFonts, NunitoSans_700Bold,NunitoSans_400Regular } from "@expo-google-fonts/nunito-sans";

const Events = () => {
  let [fontsLoaded] = useFonts({
    NunitoSans_700Bold,
    NunitoSans_400Regular
  });
  return (
    <View style={styles.EmergencyContainer}>
      <Text variant="titleLarge" style={{ color: "black", fontFamily:"NunitoSans_700Bold",marginBottom:20 }}>
        Events
      </Text>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {EVENTS_DATA.map(({image,text}) => {
            return <SingleCard  image={image} title={text} description={""} showDescription={false} width="13%"/>
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  EmergencyContainer: {
    flex: 3.5,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

export default Events;
