import * as React from 'react';
import { ViewProps } from 'react-native';

export interface PagerViewProps extends ViewProps {
  initialPage?: number;
  onPageSelected?: (e: any) => void;
  overScrollMode?: 'auto' | 'always' | 'never';
  offscreenPageLimit?: number;
  children: React.ReactNode;
}

declare const PagerView: React.ForwardRefExoticComponent<PagerViewProps & React.RefAttributes<any>>;
export default PagerView;
