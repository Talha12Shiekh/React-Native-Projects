import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View,KeyboardAvoidingView, Keyboard, Alert } from 'react-native'
import React, { Fragment } from 'react'
import { Formik } from 'formik'
import {StyledInput, StyledSwitch} from './StyledInput'
import * as Yup from "yup"

const ValidationSchema = Yup.object().shape({
  email:Yup.string().label("Email").email().required(),
  password:Yup.string().label("Password").required().min(2,"Seems a bit short").max(10,"Try a shorter password"),
  AgreeTerms:Yup.boolean().label("Terms").test("is-true","Must agree to terms to continue",value => {
    return value == true;
  }),
  confirmPassword:Yup.string().required().label("Confirm password").test("password-match","Passwod must match the original password",function(value) {
    return this.parent.password === value;
  })
})

const Signin = ({email}) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if(email == "tat@gmail.com"){
        return reject(new Error("Your email is not correct"))
      }
        resolve(true);
    }, 5000);
  })
}

const Form = () => {

  return (
    <KeyboardAvoidingView behavior="padding" style={{paddingVertical:"20%"}}>
    <View style={{paddingVertical:15,borderWidth:3,borderColor:'grey',borderRadius:10 ,margin:10}}>
      <Formik
        initialValues={{ password: '',email:'',AgreeTerms:false ,confirmPassword:'' }}
        onSubmit={(values, actions) => {
          Signin({email:values.email}).then(() => {
            Alert.alert(JSON.stringify(values));
          }).catch((err) => {
            actions.setFieldError("general",err.message)
          }).finally(() => {
            actions.setSubmitting(false);
          })
        }}
        validationSchema={ValidationSchema}
      >
        {formikProps => {
          return (
            <Fragment>
              <StyledInput
                  label="Email"
                  formikProps={formikProps}
                  formikUpdatingKey="email"
                  placeholder='talha@gmail.com'
                  autoFocus
              />
               <StyledInput
                  label="Password"
                  formikProps={formikProps}
                  formikUpdatingKey="password"
                  placeholder='talhashiekh_5'
                  secureTextEntry
              />
               <StyledInput
                  label="Confirm Password"
                  formikProps={formikProps}
                  formikUpdatingKey="confirmPassword"
                  placeholder='talhashiekh_5'
                  secureTextEntry
              />
                <StyledSwitch
                label="Agree to terms"
                formikUpdatingKey="AgreeTerms"
                formikProps={formikProps}
                />
              <View style={{width:"80%",marginLeft:30}}>
              {formikProps.isSubmitting ? <ActivityIndicator size={'large'} /> : (
                <React.Fragment>
              <Button title='Submit' onPress={formikProps.handleSubmit} />
              <Text style={{color:"red"}}>{formikProps.errors.general}</Text>
                </React.Fragment>
              )}
              </View> 
            </Fragment>
          )
        }}
      </Formik>
    </View>
    </KeyboardAvoidingView>
  )
}

export default Form

const styles = StyleSheet.create({})