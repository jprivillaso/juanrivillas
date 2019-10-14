import styled from 'styled-components';
import { Twitter, Github, LinkedinIn, StackOverflow, MediumM } from 'styled-icons/fa-brands';

import * as V from 'styles/variables';

const Icon = `
  display: block;
  height: 2.5rem;
  width: 2.5rem;
`;

export const Social = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const SocialItem = styled.a.attrs(props => ({
  href: props.href,
  title: props.title,
  target: '_blank',
  rel: 'noopener noreferrer',
}))`
  align-items: center;
  color: var(--primaryColor);
  display: inline-flex;
  height: ${ V.Height.footer };
  padding-left: ${ V.Space.sm };
  padding-right: ${ V.Space.sm };
  transition: color ${ V.Transition.default };
  will-change: color;

  &:focus,
  &:hover {
    color: var(--highlightColor);
  }
`;

export const SocialTwitter = styled(Twitter)`
  ${ Icon }
`;

export const SocialGithub = styled(Github)`
  ${ Icon }
`;

export const SocialLinkedin = styled(LinkedinIn)`
  ${ Icon }
`;

export const SocialMedium = styled(MediumM)`
  ${ Icon }
`;

export const SocialStackoverflow = styled(StackOverflow)`
  ${ Icon }
`;
