import * as React from 'react'
import Link from 'gatsby-link'

// Please note that you can use https://github.com/dotansimha/graphql-code-generator
// to generate all types from graphQL schema
interface IndexPageProps {
  data: any;
}

const IndexPage: React.FC<IndexPageProps> = ({ pageContext: { data } } : any) => {
  return (
      <h1>Hi people</h1>
  );
};

export default IndexPage;