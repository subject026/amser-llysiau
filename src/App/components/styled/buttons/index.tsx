import React from 'react';
import { ButtonEl } from './styled';

export type TStarToggleButtonProps = {
  children?: React.ReactElement[] | React.ReactElement;
  isStar: boolean;
  onClick: () => void;
};

export const StarToggleButton: React.FC<TStarToggleButtonProps> = (
  props: TStarToggleButtonProps,
): React.ReactElement => {
  const { onClick, isStar } = props;
  return (
    <ButtonEl type="button" onClick={onClick} isStar={isStar}>
      <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19 10 15.27z" />
      </svg>
    </ButtonEl>
  );
};
