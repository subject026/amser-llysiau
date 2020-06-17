import styled, { css } from 'styled-components';

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

export const TextButton = styled.button`
  ${({ theme }) => css`
    color: #eee;
    background-color: #202020;
    padding: 1rem;
    font-size: ${theme.button.default.fontSize};
    &:hover {
      cursor: pointer;
    }
  `}
`;
