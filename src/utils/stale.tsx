import { PixelRatio, Platform, useWindowDimensions } from "react-native";

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const useS = () => {
  const { width, height, fontScale } = useWindowDimensions();
  const ws = width / BASE_WIDTH;
  const hs = height / BASE_HEIGHT;

  const s = (n: number) => Math.round(n * ws);
  const vs = (n: number) => Math.round(n * hs);
  const fs = (n: number) => {
    const scaled = n * ws;
    const adjusted = Platform.OS === "android" ? scaled / fontScale : scaled;
    return Math.round(PixelRatio.roundToNearestPixel(adjusted));
  };

  return { s, vs, fs, width, height };
};
