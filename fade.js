import * as React from 'react';
import { View, Dimensions } from 'react-native';
import { interpolate } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import type { TAnimationStyle } from './BaseLayout';


const PAGE_WIDTH = window.width;

function fade() {
    const colors = ['#fda282', '#fdba4e', '#800015'];
    const PAGE_WIDTH = Dimensions.get("window").width;
    const PAGE_HEIGHT = Dimensions.get("window").height;
    const animationStyle: TAnimationStyle = React.useCallback(
        (value) => {
            'worklet';

            const zIndex = interpolate(value, [-1,-0.9, 0, 1], [10,30, 30, 20]);

            const opacity = interpolate(value, [-0.9, 0, 1], [0, 1, 0]);

            return {

                zIndex,
                opacity,
            };
        },
        []
    );

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                autoPlay
                autoPlayInterval={1500}
                scrollAnimationDuration={3000}
                style={{
                    width: PAGE_WIDTH,
                    height: 240,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                width={PAGE_WIDTH * 0.7}
                height={240 * 0.7}
                data={colors}
                renderItem={({ index }) => {
                    return <View key={index} index={index} 
                    style={{ backgroundColor: colors[index],
                    height:240,
                width:PAGE_WIDTH, }} />;
                }}
                customAnimation={animationStyle}
            />
        </View>
    );
}

export default fade;