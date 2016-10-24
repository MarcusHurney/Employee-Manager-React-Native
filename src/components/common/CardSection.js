import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children }) => {
  return (
    <View style={styles.sectionStyle}>
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
