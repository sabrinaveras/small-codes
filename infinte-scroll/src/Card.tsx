import styled from "styled-components";

export interface CardProps {
  name: string;
}

export function Card({ name }: CardProps) {
  return <CardWrapper>{name}</CardWrapper>;
}

const CardWrapper = styled.div`
  width: 100%;
  height: 100px;

  border-radius: 8px;
  border: 2px solid black;
  margin-bottom: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
