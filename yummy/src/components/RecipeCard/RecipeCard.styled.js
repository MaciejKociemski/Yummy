import styled from "styled-components";

export const ImgBox = styled.div`
  display: flex;
  object-fit: cover;

  & img {
    border-radius: 8px;
    width: 124px;
    height: 124px;
    transition: ${(props) => props.theme.transitions.main};

    @media (max-width: ${(props) => props.theme.breakpoints.mobMax}) {
      :hover,
      :focus {
        scale: 1.05;
      }
    }
    @media (min-width: ${(props) => props.theme.breakpoints.tab}) {
      width: 228px;
      height: 232px;
    }
    @media (min-width: ${(props) => props.theme.breakpoints.desk}) {
      width: 318;
      height: 324;
    }
  }
`;

export const Text = styled.p`
  font-weight: 400;
  font-size: 8px;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.color.textFavorites};
  flex-grow: 1;

  @media (min-width: ${(props) => props.theme.breakpoints.tab}) {
    width: 85%;
    font-size: 14px;
    line-height: 1.29;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.desk}) {
    font-size: 18px;
    line-height: 1.33;
  }
`;

export const RecipeDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
export const Title = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  letter-spacing: -0.24px;
  color: ${(p) => p.theme.color.text};
  margin-bottom: 14px;

  @media (min-width: ${(props) => props.theme.breakpoints.tab}) {
    font-size: 24px;
    margin-bottom: 18px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.desk}) {
    font-size: 24px;
    margin-bottom: 30px;
  }
`;

export const ElementWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  @media (min-width: ${(props) => props.theme.breakpoints.tab}) {
    align-items: flex-end;
  }
`;
export const Time = styled.span`
  font-weight: 500;
  font-size: 10px;
  line-height: 1.4;
  letter-spacing: -0.24px;
  color: ${(p) => p.theme.color.text};

  @media (min-width: ${(props) => props.theme.breakpoints.tab}) {
    display: flex;
    font-size: 14px;
    line-height: 1.43;
  }
`;
export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) =>
    props.active
      ? props.theme.color.bgSubscribe
      : props.theme.color.bgPaginationActive};
  transition: ${(props) => props.theme.transitions.main};

  :hover,
  :focus {
    background-color: ${(props) =>
      props.active ? props.theme.color.accent : props.theme.color.accent};
    & svg {
      stroke: ${(props) =>
        props.active
          ? props.theme.color.btnColorSecondary
          : props.theme.color.socIconHover};
    }
  }

  & svg {
    stroke: ${(props) =>
      props.active
        ? props.theme.color.btnColor
        : props.theme.color.btnColorSecondary};
    fill: transparent;
    width: 14px;
    height: 14px;

    @media (min-width: ${(props) => props.theme.breakpoints.tab}) {
      width: 22px;
      height: 22px;
    }

    @media (min-width: ${(props) => props.theme.breakpoints.desk}) {
      width: 24px;
      height: 24px;
    }
  }
  @media (min-width: ${(props) => props.theme.breakpoints.tab}) {
    padding: 8px;
    width: 38px;
    height: 38px;
  }
  @media (min-width: ${(props) => props.theme.breakpoints.desk}) {
    padding: 10px;
    width: 44px;
    height: 44px;
  }
`;
export const ButtonSee = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: ${(props) => (props.active ? "87px" : "138px")};
  height: ${(props) => (props.active ? "27px" : "45px")};
  background-color: ${(props) =>
    props.active
      ? props.theme.color.accentStartPage
      : props.theme.color.bgSecondary};
  border-radius: 24px 44px;
  border: none;
  color: ${(props) => props.theme.color.btnColor};
  font-weight: 400;
  font-size: ${(props) => (props.active ? "10px" : "14px")};
  line-height: 1.5;

  transition: ${(props) => props.theme.transitions.main};

  &:hover,
  &:focus {
    background-color: ${(props) =>
      props.active
        ? props.theme.color.bgSecondary
        : props.theme.color.accentStartPage};
    color: ${(props) => props.theme.color.socIconHover};
  }

  @media screen and (min-width: ${(props) => props.theme.breakpoints.tab}) {
    width: 138px;
    height: 45px;
    font-size: 14px;
  }
  @media screen and (min-width: ${(props) => props.theme.breakpoints.desk}) {
    font-size: 16px;
    width: 160px;
    height: 54px;
  }
`;
