import React from 'react';
import styled, { css } from 'styled-components';

type TTextButton = {
  theme: any;
  size?: string;
  buttonStyle: string;
};

export const TextButtonStyled = styled.button`
  ${(props: TTextButton) => {
    const { theme, buttonStyle, size } = props;
    console.log('size? ', size);
    return css`
      color: ${theme.button[buttonStyle].default.color};
      background-color: ${theme.button[buttonStyle].default.bgColor};
      border: ${theme.button[buttonStyle].default.border};
      border-radius: ${theme.button[buttonStyle].default.borderRadius};
      padding: ${size ? theme.button.padding[size] : theme.button.padding.medium};
      font-size: ${theme.button.primary.default.fontSize};

      font-weight: 600;
      border-radius: 2px;
      transition: transform 0.1s ease-out;
      &:hover {
        cursor: pointer;
        /* color: ${theme.button[buttonStyle].hover.color};
        background-color: ${theme.button[buttonStyle].hover.bgColor}; */
        transform: scale(1.05);
      }
      &:focus {
        /* color: ${theme.button[buttonStyle].hover.color};
        background-color: ${theme.button[buttonStyle].hover.bgColor}; */
        transform: scale(1.05);
      }
    `;
  }}
`;

export type TButtonElProps = {
  isStar: boolean;
};

export const ButtonEl = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  path {
    fill: ${(props: TButtonElProps) => (props.isStar ? 'blue' : 'midnightblue')};
  }
`;

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

enum ButtonVariants {
  Text = 'text',
  Icon = 'icon',
}

enum IconVariants {
  Star = 'star',
  Github = 'github',
}

type TButtonProps = {
  variant?: ButtonVariants;
  buttonStyle?: 'primary' | 'outline';
  size?: 'small';
  onClick: () => void;
  disabled?: boolean;
  icon?: IconVariants;
};

const Button: React.FC<TButtonProps> = (props): React.ReactElement => {
  const variant = props.variant ? props.variant : ButtonVariants.Text;
  const buttonStyle = props.buttonStyle ? props.buttonStyle : 'primary';
  const size = props.size ? props.size : false;
  switch (variant) {
    case ButtonVariants.Text:
      return (
        <TextButtonStyled type="button" {...props} size={size ? size : undefined} buttonStyle={buttonStyle}>
          {props.children}
        </TextButtonStyled>
      );
    default:
      throw new Error('no variant provided!');
  }
};

export default Button;
