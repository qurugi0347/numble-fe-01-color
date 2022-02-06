import React, { useMemo, MouseEventHandler } from "react";
import styled from "styled-components";

interface ColorButtonProps {
  hue: number;
  saturation: number;
  brightness: number;
  isMutant: boolean;
  colorDiffValue: number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

interface ButtonStyleProps {
  rgb: string;
}

const makeRGB: any = (h: number, s: number, v: number) => {
  let r: number, g: number, b: number;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }

  return [
    Math.floor(r * 255),
    Math.floor(g * 255),
    Math.floor(b * 255),
  ].toString();
};

const ColorButton: React.FC<ColorButtonProps> = ({
  hue,
  saturation,
  brightness,
  isMutant,
  colorDiffValue,
  onClick,
}) => {
  const mutantedRgb: string = useMemo(() => {
    let rgbResult;
    if (isMutant) {
      let mutantedHue = hue;
      if (Math.floor(Math.random() - 0.5) > 0) {
        mutantedHue += colorDiffValue;
      } else {
        mutantedHue -= colorDiffValue;
      }
      if (mutantedHue < 0) {
        mutantedHue += 360;
      }
      rgbResult = makeRGB(
        mutantedHue / 360,
        saturation * 0.9,
        brightness * 0.9
      );
    } else {
      rgbResult = makeRGB(hue / 360, saturation, brightness);
    }
    return rgbResult;
  }, [hue, saturation, brightness, isMutant, colorDiffValue]);
  return <ColoredButton rgb={mutantedRgb} onClick={onClick} />;
};

const ColoredButton = styled.div<ButtonStyleProps>`
  width: 100%;
  padding-top: 100%;
  background: ${(props) => `rgb(${props.rgb})`};
`;

export default ColorButton;
