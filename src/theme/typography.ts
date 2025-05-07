import styled from 'styled-components';

export const Heading1 = styled.h1`
  font-size: 34px;
    width: 100%;
  font-weight: bold;
  margin-bottom: 1rem;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.magent};
`;

export const Heading2 = styled.h2`
  font-size:24px;
    width: 100%;
  font-weight: bold;
  margin-bottom: 1rem;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.lightBlue};
      margin:0px;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.lightBlue};
`;

export const LinkHref = styled.a`
  color: ${({ theme }) => theme.colors.magent};
`;


export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
`;

export const SmallText = styled.small`
  font-size: 0.8rem;
  color: gray;
`;