import React from 'react';
import {Text, TextProps} from 'react-native';

const TText: React.FC<TextProps> = props => {
  let defaultProps: any = {...props};
  defaultProps.style = [{color: '#333333'}, props.style];
  return (
    <Text {...defaultProps} allowFontScaling={false}>
      {props.children}
    </Text>
  );
};

export default TText;
