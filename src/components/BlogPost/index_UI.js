import styled from 'styled-components';

export const PostWrapper = styled.div`
  width: 50%;
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

  img {
    margin-bottom: 0px;
  }

  img ~ em {
    font-size: 0.7rem;

    a {
      color: #187888;
    }
  }

  blockquote {
    color: rgba(15, 15, 15, 0.95);
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: -0.04px;
    line-height: 1.5em;
    border-left: .2rem solid #187888;
    font-style: italic;
    overflow-wrap: break-word;
    padding-bottom: 1.6rem;
    padding-left: 1.6rem;
    padding-top: 1.6rem;
    margin-left: 0px;
  }

  hr {
    margin: 3rem auto;
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
