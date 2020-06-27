import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  * + * {
    margin-left: ${(props) => props.theme.layout.base};
  }
`;

export default ButtonGroup;
