// components/StyledButton.tsx
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

export default StyledButton;