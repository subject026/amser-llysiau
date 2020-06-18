import React from 'react';
import styled, { css } from 'styled-components';

export const TextButtonStyled = styled.button`
  ${({ theme }) => css`
    color: #eee;
    background-color: ${theme.button.primary.default.bgColor};
    background-color: #202020;
    border: 0;
    padding: 0.8rem 1.2rem;
    font-size: ${theme.button.primary.default.fontSize};
    font-weight: 600;
    border-radius: 4px;
    &:hover {
      cursor: pointer;
    }
  `}
`;

enum ButtonVariants {
  Text = 'text',
  Icon = 'icon',
}

type TButtonProps = {
  variant?: ButtonVariants;
  onClick: () => void;
  disabled?: boolean;
};

const Button: React.FC<TButtonProps> = (props): React.ReactElement => {
  const variant = props.variant ? props.variant : ButtonVariants.Text;

  switch (variant) {
    case ButtonVariants.Text:
      return (
        <TextButtonStyled type="button" {...props}>
          {props.children}
        </TextButtonStyled>
      );
    default:
      throw new Error('no variant provided!');
  }
};

export default Button;
