import styled from "styled-components";
import { faker } from "@faker-js/faker";
import { Card } from "./Card";
import { Loading } from "./Loading";

const list = [
  faker.name.firstName(),
  faker.name.firstName(),
  faker.name.firstName(),
  faker.name.firstName(),
  faker.name.firstName(),
  faker.name.firstName(),
];

function App() {
  return (
    <AppWrapper>
      <CardList>
        <Loading direction={"TOP"} />
        {list.map((item) => (
          <Card key={item} name={item} />
        ))}
        <Loading direction={"BOTTOM"} />
      </CardList>
    </AppWrapper>
  );
}

const CardList = styled.div`
  width: 50%;
  height: 50vh;
  padding: 12px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

export default App;
