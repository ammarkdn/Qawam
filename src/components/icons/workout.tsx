import React from 'react';
import { Svg, Path, G } from 'react-native-svg'; // If using in React Native
// import { Svg, Path, G } from 'react-native-svg'; for React Native

const WorkoutIcon: React.FC = () => {
    return (
        <Svg
            width={64}
            height={64}
            viewBox="0 0 64 64"
            fill="none"
        >
            <G fill="#000000">
                {/* Flexing arm */}
                <Path d="M32 40c-4 0-8-2-10-6 4-2 6-5 6-9 0-4-2-8-6-9 2-4 6-6 10-6 6 0 12 6 12 12 0 6-4 10-10 10s-10-4-10-10 4-10 10-10c2 0 4 1 6 3 2 2 3 5 3 8 0 3-1 6-3 8s-5 4-8 4zm0-22c-4 0-8 3-8 8s4 8 8 8 8-4 8-8-4-8-8-8zm0 0z" />

                {/* Dumbbell */}
                <Path d="M16 24h-4v-4h4v4zm32 0h-4v-4h4v4zm-16 0h-8v-4h8v4zm-12 0h-4v-4h4v4zm20 0h-4v-4h4v4z" />
            </G>
        </Svg>
    );
};

export default WorkoutIcon;