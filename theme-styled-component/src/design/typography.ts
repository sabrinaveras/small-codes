import styled, { StyledComponent } from "styled-components";

export interface Typography {
  name: string;
  component: StyledComponent<any, any, {}, never>;
}

type TypographyObject = { [key: string]: Typography };

export const typographies: TypographyObject = {
  title: {
    name: "Title",
    component: styled.span`
      ${(props) => props.theme.typography.title};
    `,
  },
  subTitle: {
    name: "Sub Title",
    component: styled.span`
      ${(props) => props.theme.typography.subTitle};
    `,
  },
  button: {
    name: "Button",
    component: styled.span`
      ${(props) => props.theme.typography.button};
    `,
  },
  link: {
    name: "Link",
    component: styled.span`
      ${(props) => props.theme.typography.link}
    `,
  },
};
