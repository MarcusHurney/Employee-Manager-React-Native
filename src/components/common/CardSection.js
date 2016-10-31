import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children, style }) => {
  // in react-native, if you pass the style prop of a native component
  // such as View or Text an array, the right most element of that array
  // will overwrite the left most element(s)...
  // In this instance below, we can pass CardSection a custom style in the props
  // or leave it out and it will use styles.sectionStyle below that's predefined
  return (
    <View style={[styles.sectionStyle, style]}>
      {children}
    </View>
  );
};

const styles = {
  sectionStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
