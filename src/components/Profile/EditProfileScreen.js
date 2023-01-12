import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, View } from "react-native";
import AppLoading from "expo-app-loading";
import Auth from "@aws-amplify/auth";
import { showMessage } from "react-native-flash-message";
import { Styles as styles } from "../../constants/Styles";
import ButtonOutlined from "../../components/UI/ButtonOutlined";
import InputWrapper from "../../components/UI/InputWrapper";
import DynamicPickerUpsert from "../../components/UI/DynamicPickerUpsert"; 
import * as helpers from "../../helpers";
const initialStateCognitoUser = {};
const EditProfileScreen = ({route,navigation}) => {
  const [cognitoUser, setCognitoUser] = useState(initialStateCognitoUser);
  const [userProfile, setUserProfile] = useState(initialStateCognitoUser);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    await Auth.currentAuthenticatedUser({
      bypassCache: true,
    }).then((user) => {
      setCognitoUser(user);
      setUserProfile(user["attributes"]);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);


  function userProfileChangeHandler(key,val) {
    let userProfileTemp = { ...userProfile };
    userProfileTemp[key] = val;
    setUserProfile(userProfileTemp);
  }

  const formatMobileNumber = (text) => {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "",
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      return number;
    }
    return text;
  };
  function userProfilePhoneNumberChangeHandler(val) {
    let userProfileTemp = { ...userProfile };
    userProfileTemp.phone_number = formatMobileNumber(val);
    setUserProfile(userProfileTemp);
  }
  async function userSubmitHandler() {
    try {
      let phone_number = formatMobileNumber(userProfile.phone_number).replace(
        /[^+\d]+/g,
        ""
      );
      console.log(phone_number);
      await Auth.updateUserAttributes(cognitoUser, {
        ...userProfile,
        phone_number: phone_number,
      });
      showMessage({
        // message could be different based on the call made
        message: `User profile updated successfully`,
        type: "success",
      });
      navigation.navigate('View',{});
    } catch (err) {
      console.log(JSON.stringify(err));
      showMessage({
        // message could be different based on the call made
        message: `User profile update failure`,
        type: "failure",
      });
    }
  }

  const [genderOverlayVisible, setGenderOverlayVisible] = useState(false);
  const genderToggleOverlayHandler = () => {
    setGenderOverlayVisible(!genderOverlayVisible);
  };
  const [genderDataSource, setGenderDataSource] = useState();
  useEffect(() => {
    setGenderDataSource(helpers.getEnumDataSource(helpers.ENUM_GENDER));
    
  }, []);
  const genderPicker = (
    <DynamicPickerUpsert
      selectedValue={userProfile.gender}
      onPickerChanged={(val) =>
        userProfileChangeHandler("gender", val)}
      pickerTitle="Gender"
      dataSource={genderDataSource}
      toggleOverlayHandler={genderToggleOverlayHandler}
      overlayVisible={genderOverlayVisible}
    />
  );

  if (loading) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ ...styles.container, height: "90%" }}>
        <ScrollView>
          <InputWrapper
            key="first_name"
            placeholder="First Name"
            leftIcon={{ name: "id-badge" }}
            value={userProfile.given_name}
            keyboardType="name-phone-pad"
            autoComplete="name-given"
            onChangeText={(val) => userProfileChangeHandler("given_name", val)}
          />

          <InputWrapper
            key="middle_name"
            placeholder="Middle Name"
            leftIcon={{
              name: "id-badge",
            }}
            autoComplete="name-middle"
            autoCapitalize="words"
            value={userProfile.middle_name}
            onChangeText={(val) => userProfileChangeHandler("middle_name", val)}
          />

          <InputWrapper
            key="last_name"
            placeholder="Last Name"
            leftIcon={{
              name: "user-circle",
            }}
            value={userProfile.family_name}
            autoCapitalize="sentences"
            autoComplete="name-family"
            textContentType="familyName"
            onChangeText={(val) => userProfileChangeHandler("family_name", val)}
          />

          {genderPicker}

          <InputWrapper
            key="preferred_username"
            placeholder="Preferred User Name"
            leftIcon={{
              name: "user-md",
            }}
            value={userProfile.preferred_username}
            onChangeText={(val) =>
              userProfileChangeHandler("preferred_username", val)
            }
          />

          <InputWrapper
            key="Phone"
            placeholder="Phone number"
            leftIcon={{
              name: "phone",
            }}
            value={userProfile.phone_number}
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
            onChangeText={userProfilePhoneNumberChangeHandler}
          />
          <InputWrapper
            key="Email"
            placeholder="Email"
            leftIcon={{
              name: "at",
            }}
            value={userProfile.email}
            keyboardType="email-address"
            textContentType="emailAddress"
            onChangeText={(val) => userProfileChangeHandler("email", val)}
          />

          <InputWrapper
            key="Address"
            placeholder="Address"
            leftIcon={{
              name: "map-marker",
            }}
            style={styles.input}
            value={userProfile.address}
            onChangeText={(val) => userProfileChangeHandler("email", val)}
          />
        </ScrollView>
        <View style={styles.buttonContainer}>
          <ButtonOutlined
            title="Update User"
            buttonContainerStyle={
              styles.buttonEditContainerStyle
            }
            onPress={userSubmitHandler}
          />
        </View>
      </View>
    );
  }
};

export default EditProfileScreen;
