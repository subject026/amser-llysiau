import styled, { css } from 'styled-components';

type TWrapper = {
  sm?: string;
  md?: string;
};

export default styled.div<TWrapper>`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  ${(props) => css`
    padding: 0 ${props.sm ? props.sm : 0};
    @media (min-width: 699px) {
      padding: 0 ${props.md ? props.md : 0};
    }
  `}
`;
