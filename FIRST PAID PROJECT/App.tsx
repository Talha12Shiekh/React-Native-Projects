import { StyleSheet, Text, View, ScrollView } from "react-native";
import Home from "./Screens/Home";
import Loader from "./Components/Loader";
import Cards from "./Components/Cards";
import Questions from "./Components/QuestionButton";
import EmergencyResponse from "./Components/EmergencyResponse";
import FeaturedCourses from "./Components/FeaturedCourses";
import Calculators from "./Components/Calculators";
import Events from "./Components/Events";
import { PaperProvider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { ORANGE_COLOR } from "./Constants";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EmptyScreen from "./Screens/EmptyScreen";
import { FontAwesome6,AntDesign,SimpleLineIcons,Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import {
  useFonts,
  NunitoSans_400Regular,
} from '@expo-google-fonts/nunito-sans';


const Tab = createBottomTabNavigator();

const TAB_BAR_ICONS_SIZE = 20;


export default function App() {
  let [fontsLoaded] = useFonts({
    NunitoSans_400Regular,
  });
  return (
    <NavigationContainer>
      <PaperProvider>
        <Tab.Navigator screenOptions={{ headerShown: false,tabBarActiveTintColor: ORANGE_COLOR,tabBarLabelStyle:{
          fontFamily:"NunitoSans_400Regular"
        } }}>
          <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={TAB_BAR_ICONS_SIZE} color={color} />
            ),
          }}
           name="Home">
            {(props) => {
              return (
                <ScrollView>
                  <LinearGradient
                    colors={[ORANGE_COLOR, "transparent"]}
                    style={styles.background}
                  />
                  <Home />
                  <Loader />
                  <Cards />
                  <Calculators />
                  <EmergencyResponse/> 
                  <FeaturedCourses/> 
                  <Events/>
                  <Questions/>
                </ScrollView>
              );
            }}
          </Tab.Screen>
          <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome6 name="arrows-turn-right" size={TAB_BAR_ICONS_SIZE} color={color} />
            )
          }}
          name="Just Donate">
            {(props) => {
              return <EmptyScreen {...props} text="Just Donate" />;
            }}
          </Tab.Screen>
          <Tab.Screen 
            options={{
              tabBarIcon: ({ color, size }) => (
                <SimpleLineIcons name="wallet" size={TAB_BAR_ICONS_SIZE} color={color} />
              )
            }}
          name="Round Up">
            {(props) => {
              return <EmptyScreen {...props} text="Round Up" />;
            }}
          </Tab.Screen>
          <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="piechart" size={TAB_BAR_ICONS_SIZE} color={color} />
            )
          }}
          name="Portfolio">
            {(props) => {
              return <EmptyScreen {...props} text="Portfolio" />;
            }}
          </Tab.Screen>
          <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" size={TAB_BAR_ICONS_SIZE} color={color}/>
            )
          }}
          name="Profile">
            {(props) => {
              return <EmptyScreen {...props} text="Profile" />;
            }}
          </Tab.Screen>
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 800,
  },
});
