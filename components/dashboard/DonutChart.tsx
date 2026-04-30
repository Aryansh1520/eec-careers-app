import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { Text } from '@/components/ui/text';
import { useColorScheme } from 'react-native';

interface DataPoint {
  status: string;
  count: number;
}

interface DonutChartProps {
  data: DataPoint[];
  size?: number;
  strokeWidth?: number;
}

const STATUS_COLORS: Record<'light' | 'dark', Record<string, string>> = {
  light: {
    'applied': '#4f46e5',     // primary
    'screening': '#0ea5e9',   // blue
    'interview': '#f59e0b',   // amber
    'accepted': '#10b981',    // green
    'rejected': '#ef4444',    // destructive
  },
  dark: {
    'applied': '#6366f1',     // primary
    'screening': '#38bdf8',   // blue
    'interview': '#fbbf24',   // amber
    'accepted': '#22c55e',    // green
    'rejected': '#7f1d1d',    // destructive
  }
};

export function DonutChart({ data, size = 220, strokeWidth = 30 }: DonutChartProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? 'dark' : 'light';
  const themeColors = STATUS_COLORS[theme];

  const total = data.reduce((sum, item) => sum + item.count, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  let cumulativeAngle = -90; // Start at 12 o'clock

  if (total === 0) {
    return (
      <View className="w-full h-full items-center justify-center">
        <Text className="text-muted-foreground">No Data</Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center justify-center gap-6">
      {/* Chart */}
      <View style={{ width: size, height: size }} className="relative items-center justify-center">
        <Svg width={size} height={size}>
          <G>
          {data.map((item, index) => {
            if (item.count === 0) return null;
            
            const pct = item.count / total;
            const strokeDasharray = `${pct * circumference} ${circumference}`;
            const rotation = cumulativeAngle;
            
            cumulativeAngle += (pct * 360);
            
            const statusKey = item.status.toLowerCase();
            const color = themeColors[statusKey] || (theme === 'dark' ? '#18181b' : '#f1f5f9'); // muted default

            return (
              <Circle
                key={item.status}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={0}
                transform={`rotate(${rotation}, ${size/2}, ${size/2})`}
                strokeLinecap="butt" // keep it flat to perfectly tile
              />
            );
          })}
        </G>
      </Svg>
      
        {/* Center Label */}
        <View className="absolute inset-0 items-center justify-center pointer-events-none">
          <Text className="text-3xl font-black text-foreground">{total}</Text>
          <Text className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1">Total</Text>
        </View>
      </View>

      {/* Legend */}
      <View className="flex-col gap-2.5">
        {data.map((item) => {
          if (item.count === 0) return null;
          const statusKey = item.status.toLowerCase();
          const color = themeColors[statusKey] || (theme === 'dark' ? '#18181b' : '#f1f5f9');
          
          return (
            <View key={item.status} className="flex-row items-center gap-2">
              <View 
                className="size-3.5 rounded-full" 
                style={{ backgroundColor: color }} 
              />
              <Text className="text-sm font-medium text-foreground capitalize tracking-wide">
                {statusKey}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
