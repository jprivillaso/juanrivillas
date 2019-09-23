import styled from 'styled-components';

export const PostWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 5rem;

  p, li {
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    text-align: justify;
  }

  h1 {
    font-size: 4rem;
    font-weight: 700;
    margin: 1rem auto;
  }

  h2 {
    font-size: 2rem;
    font-weight: 200;
  }

  @media (max-width: 1024px) {
    width: 85%;

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }
`;
