import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'

const Notifications = () => {
    const [value, setvalue] = useState("");
    const [notification, setnotifications] = useState("");
    const opacity = useRef(new Animated.Value(0)).current;
    const offset = useRef(new Animated.Value(0)).current;
    const notificationreference = useRef(null);
    function handlePress() {
        setnotifications(value);
        setvalue("")
        notificationreference.current.measure((width) => {
            offset.setValue(width * -1)
            Animated.sequence([

                Animated.parallel([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 1000,
                    }),
                    Animated.timing(offset, {
                        toValue: width,
                        duration: 1000,
                    }),
                ]),

                Animated.delay(1500),

                Animated.parallel([
                    Animated.timing(opacity, {
                        toValue: 0,
                        duration: 1000,
                    }),
                    Animated.timing(offset, {
                        toValue: width * -1,
                        duration: 1000,
                    }),
                ]),

            ]).start()
        })
    }
    const notificationsStyle = {
        opacity: opacity,
      transform: [
        {
          translateY: offset,
        },
      ],
          right:0,
          left:0,
          bottom:0
    }
    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.notification, notificationsStyle]}
                ref={notificationreference}
            >
                <Text style={styles.notificationText}>{notification}</Text>
            </Animated.View>
            <View >
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={(val) => setvalue(val)}
                />
                <TouchableOpacity onPress={handlePress}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Show Notification</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "tomato",
        padding: 15,
        marginTop: 10,
    },
    buttonText: {
        color: "#FFF",
        textAlign: "center",
    },
    input: {
        width: 250,
        height: 40,
        padding: 5,
        borderWidth: 1,
        borderColor: "#CCC",
    },
    notification: {
        position: "absolute",
        paddingHorizontal: 7,
        paddingVertical: 15,

        backgroundColor: "tomato",
    },
    notificationText: {
        color: "#FFF",
    },
});