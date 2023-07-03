import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Input from './Input';
import {Formik} from "formik";
import * as Yup from "yup";



const api = (user) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if(user.email == "tk@gmail.com"){
        reject({email:"The email already exists"})
      }else{
        resolve()
      }
    }, 15000);
  })
}  

const FormikForm = () => {
  const handleSubmit = async (values,formikBags) => {
    try {
      await api(values);
      formikBags.resetForm();
    } catch (error) {
      formikBags.setSubmitting(false);
      formikBags.setErrors(error)
    }
  }

  const validation =  Yup.object().shape({
    email:Yup.string().email().required().label("Email"),
    password:Yup.string().min(8).max(20).required().label("Password"),
    confirmPassword:Yup.string().oneOf([Yup.ref("password")],"Confirm password should match the password").required().label("Confirm password")
   })
  return (
    <View style={styles.container}>
      <Formik
      initialValues={{email:'',password:'',confirmPassword:''}}
      onSubmit={handleSubmit}
      validationSchema={validation}
      >
        {({values,handleSubmit,setFieldValue,errors,setFieldTouched,touched,isValid,isSubmitting}) => {
          return (
            <React.Fragment>
                  <Input 
                      label="Email"
                      autoCapitalize="none"
                      value={values.email}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="email"
                      error={ touched.email && errors.email }
                  />
                  <Input 
                      label="Pasword"
                      autoCapitalize="none"
                      value={values.password}
                      secureTextEntry 
                      onTouch={setFieldTouched}
                      onChange={setFieldValue}
                      name="password"
                      error={ touched.password && errors.password}
                  />
                  <Input 
                      label="Confirm password"
                      autoCapitalize="none" 
                      value={values.confirmPassword} 
                      secureTextEntry
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="confirmPassword"
                      error={touched.confirmPassword && errors.confirmPassword}
                   />
                  <View style={styles.button}>
                      <Button title='Submit' onPress={handleSubmit} disabled={!isValid || isSubmitting}
                      loading={isSubmitting}
                      />
                  </View>
            </React.Fragment>
          )
        }}
            
      </Formik>
    </View>
  )
}

export default FormikForm

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    width: "80%"
  }
})