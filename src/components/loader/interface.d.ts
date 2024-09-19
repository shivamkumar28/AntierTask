import type { ColorValue } from "react-native";

export interface LoaderProps {
    size?: number | 'small' | 'large' | undefined;
    color?: ColorValue | undefined;
}