import React, { forwardRef } from 'react';
import { View } from 'react-native';

const PagerView = forwardRef(({ children, ...props }: any, ref) => {
  return <View style={{ flex: 1 }}>{children}</View>;
});

export default PagerView;
