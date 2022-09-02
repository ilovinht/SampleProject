import React from 'react';
import type { ViewStyle } from 'react-native';
import Animated, {
    AnimatedStyleProp,
    runOnJS,
    useAnimatedReaction,
    useAnimatedStyle,
    useDerivedValue,
} from 'react-native-reanimated';


export type TAnimationStyle = (value: number) => AnimatedStyleProp<ViewStyle>;

