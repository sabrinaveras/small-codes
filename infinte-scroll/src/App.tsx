import styled from "styled-components";
import { faker } from "@faker-js/faker";
import { Card } from "./Card";
import { Loading } from "./Loading";
import { LegacyRef, useCallback, useEffect, useRef, useState } from "react";

function UpdateNames() {
  const list = [
    faker.name.firstName(),
    faker.name.firstName(),
    faker.name.firstName(),
    faker.name.firstName(),
    faker.name.firstName(),
    faker.name.firstName(),
  ];

  console.log("list: ", list);

  return list;
}

function App() {
  const [list, setList] = useState([
    faker.name.firstName(),
    faker.name.firstName(),
    faker.name.firstName(),
    faker.name.firstName(),
    faker.name.firstName(),
    faker.name.firstName(),
  ]);

  const loadingTopRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);
  const [loadingTopIsVisible, setLoadingTopIsVisible] = useState(false);

  const loadingBottomRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);
  const [loadingBottomIsVisible, setLoadingBottomIsVisible] = useState(false);

  const scrollCardRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);

  const positionScroll = useCallback(() => {
    const current = scrollCardRef?.current as HTMLDivElement;
    current.scrollTop = 120;
  }, []);

  useEffect(() => {
    positionScroll();
  }, [positionScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setLoadingTopIsVisible(entry.isIntersecting);
    });

    if (loadingTopRef.current === undefined) return;

    observer.observe(loadingTopRef.current as Element);
  }, []);

  useEffect(() => {
    const loadingTopInterval = setInterval(() => {
      if (loadingTopIsVisible) {
        setList(UpdateNames());
        positionScroll();
      }
    }, 3000);

    return () => clearInterval(loadingTopInterval);
  }, [loadingTopIsVisible, positionScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setLoadingBottomIsVisible(entry.isIntersecting);
    });

    if (loadingBottomRef.current === undefined) return;

    observer.observe(loadingBottomRef.current as Element);
  }, []);

  useEffect(() => {
    const loadingBottomInterval = setInterval(() => {
      if (loadingBottomIsVisible) {
        setList(UpdateNames());
        positionScroll();
      }
    }, 3000);

    return () => clearInterval(loadingBottomInterval);
  }, [loadingBottomIsVisible, positionScroll]);

  return (
    <AppWrapper>
      <CardList ref={scrollCardRef}>
        <Loading loadingRef={loadingTopRef} direction={"TOP"} />
        {list.map((item) => (
          <Card key={item} name={item} />
        ))}
        <Loading loadingRef={loadingBottomRef} direction={"BOTTOM"} />
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
