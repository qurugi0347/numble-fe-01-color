import React, { useMemo } from "react";
import styled from "styled-components";

interface ColorButtonProps {
  r: number;
  g: number;
  b: number;
  isMutant: boolean;
  colorDiffValue: number;
}

interface ButtonStyleProps {
  rgb: string;
}

const ColorButton: React.FC<ColorButtonProps> = ({
  r,
  g,
  b,
  isMutant,
  colorDiffValue,
}) => {
  const mutantedRgb = useMemo(() => {
    if (isMutant) {
      let newR = r;
      let newG = g;
      let newB = b;
      let diff = colorDiffValue;
      // 색깔 다르게 출력해주는거 해야됨

      return [newR, newG, newB].join(",");
    }
    return [r, g, b].join(",");
  }, [r, g, b, isMutant, colorDiffValue]);
  return <ColoredButton rgb={mutantedRgb} />;
};

const ColoredButton = styled.div<ButtonStyleProps>`
  width: 100%;
  padding-top: 100%;
  background: ${(props) => `rgb(${props.rgb})`};
`;

export default ColorButton;
