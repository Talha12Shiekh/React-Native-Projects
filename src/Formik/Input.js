import {StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Input = ({ label ,error,...rest }) => {
    const handleChange = (values) => {
        rest.onChange(rest.name,values)
    }

    const handleTouch  =()=> {
        rest.onTouch(rest.name)
    }
    return (
        <View style={{ width: "80%" }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={label}
                {...rest}
                onChangeText={handleChange}
                onBlur={handleTouch}
            />
            {error && <Text style={styles.erormessage}>{error}</Text>}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        textAlign: "left",
        marginBottom: 5
    },
    input: {
        borderWidth: 2,
        borderColor: "grey",
        padding: 10,
        borderRadius: 10,
        fontSize: 20
    },
    erormessage: {
        color: "red",
        fontSize: 15,
        textAlign: "right"
    }
})