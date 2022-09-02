/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { ImageSourcePropType, View, Dimensions, StyleSheet, SafeAreaView, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  FlipInEasyY
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import type { TAnimationStyle } from './BaseLayout';
import { withAnchorPoint } from './anchor-point.ts';

import FlipPage, { FlipPagePage } from 'react-native-flip-page';

import Index from './page';



const App = () => {
  const colors = ['#fda282', '#fdba4e', '#800015'];
  const PAGE_WIDTH = Dimensions.get("window").width;
  const PAGE_HEIGHT = Dimensions.get("window").height;

  const animationStyle: TAnimationStyle = React.useCallback(
    (value) => {
      'worklet';

      const zIndex = interpolate(value, [-1, 0, 1], [-10, 10, -10]);
      const translateX = interpolate(value, [-1, 0, 1], [0, 0, 0]);

      return {
        transform: [{ translateX }],
        zIndex,
      };
    },
    []
  );



  const Card: React.FC<{
    index: number;
    animationValue: Animated.SharedValue<number>;
  }> = ({ index, animationValue }) => {
    const WIDTH = PAGE_WIDTH;
    const HEIGHT = PAGE_HEIGHT / 1.5;
    const leftStyle = useAnimatedStyle(() => {
   
      const transform = {
        transform: [
          { perspective: 800 },
          {
            rotateY: `${interpolate(
              animationValue.value,
              [-1, 0, 1],
              [0, 0, 180],
              Extrapolate.CLAMP
            )}deg`,
          },
        ],
      };
      
      return {
        ...withAnchorPoint(
          transform,
          { x: 0.75, y: 0.5 },
          { width: WIDTH, height: HEIGHT/2 }
        ),
        
      };
    }, [animationValue, WIDTH]);

    const rightStyle = useAnimatedStyle(() => {
    
      const transform = {
        transform: [
          { perspective: 800 },
          {
            rotateY: `${interpolate(
              animationValue.value,
              [-1, 0, 1],
              [-180, 0, 0],
              Extrapolate.CLAMP
            )}deg`,
          },
        ],
      };
      return {
        ...withAnchorPoint(
          transform,
          { x: 0.25, y: 0.5 },
          { width: WIDTH, height: HEIGHT }
        ),
      };
    }, [animationValue, WIDTH]);

    return (
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          
        }}
      >
        <Animated.View
          style={[
            {
              backgroundColor: colors[index],
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,

              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.44,
              shadowRadius: 10.32,

              elevation: 16,
              left: 0,
              position: 'absolute',
              width: WIDTH/2,
              height: HEIGHT,
              overflow: 'hidden',
            },
            leftStyle,
          ]}
        ><Text>L</Text></Animated.View>
        <Animated.View
          style={[
            {
              backgroundColor: colors[index],

              borderRadius: 20,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.44,
              shadowRadius: 10.32,

              elevation: 16,
              right: 0,
              position: 'absolute',
              width: WIDTH / 2,
              height: HEIGHT,
              overflow: 'hidden',
            },
            rightStyle,
          ]}
          ><Text>R</Text></Animated.View>

      </Animated.View>
    );
  };


  return (
    <SafeAreaView flex={1}>

      <Carousel
        loop={true}

        style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
        width={PAGE_WIDTH}
        data={colors}
        renderItem={({ index, item, animationValue }) => {
          return (
            <Card
              animationValue={animationValue}
              key={index}
              index={index}
            />

          );
        }}
        customAnimation={animationStyle}
        scrollAnimationDuration={1200}
      />
    </SafeAreaView>
  );
};



export default App;
