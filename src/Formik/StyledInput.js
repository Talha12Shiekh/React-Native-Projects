import { StyleSheet, Text, View, TextInput, Animated, Switch } from 'react-native'
import React, { useRef } from 'react'


export const StyledInput = ({ label, formikProps, formikUpdatingKey, ...rest }) => {
    const movingInput = useRef(new Animated.Value(0)).current;

    const InputInterpolate = movingInput.interpolate({
        inputRange: [0, .5, 1],
        outputRange: [0, -15, 15],
        extrapolate: "clamp",
    })

    const inputStyles = {
        borderWidth: 1, borderColor: "black", padding: 10, marginBottom: 3, marginHorizontal: 3,
    }

    const ViewStyles = {
        transform: [
            {
                translateX: InputInterpolate
            }
        ]
    }

    if (formikProps.touched[formikUpdatingKey] && formikProps.errors[formikUpdatingKey]) {
        inputStyles.borderColor = "red";
        Animated.sequence([
            Animated.timing(movingInput, {
                toValue: .5,
                duration: 100,
                useNativeDriver: true,
                bounciness: 0.5
            }),
            Animated.timing(movingInput, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
                bounciness: 0.5
            }),
            Animated.timing(movingInput, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
                bounciness: 0.5
            })
        ]).start()

    } else {
        inputStyles.borderColor = "black";
        movingInput.setValue(0)
    }

    return (
        <FieldWrapper formikProps={formikProps} formikUpdatingKey={formikUpdatingKey} label={label}>
            <Animated.View style={ViewStyles}>
                <TextInput
                    autoCapitalize={false}
                    style={inputStyles}
                    onChangeText={formikProps.handleChange(formikUpdatingKey)}
                    value={formikProps.values[formikUpdatingKey]}
                    onBlur={formikProps.handleBlur(formikUpdatingKey)}
                    {...rest}
                />
            </Animated.View>
         </FieldWrapper>
    )
}

export const StyledSwitch = ({ formikProps, formikUpdatingKey, label, ...rest }) => {
    return (
        <FieldWrapper formikProps={formikProps} formikUpdatingKey={formikUpdatingKey} label={label}>
            <Switch
                value={formikProps.values[formikUpdatingKey]}
                onValueChange={value => formikProps.setFieldValue(formikUpdatingKey, value)}
                {...rest}  
            />
        </FieldWrapper>
    )
}

export const FieldWrapper = ({ children,formikProps, formikUpdatingKey, label, }) => {
    return (
        <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
            <Text style={{ marginLeft: 8, marginBottom: 8 }}>{label}</Text>
            <Animated.View>
                {children}
            </Animated.View>
            <Text style={{ color: "red", marginLeft: 8, marginBottom: 8 }}>{formikProps.touched[formikUpdatingKey] && formikProps.errors[formikUpdatingKey]}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})