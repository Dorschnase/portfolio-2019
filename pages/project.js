
import React from 'react';
import Layout from "../components/layout";
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloClient } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';


/* import ReactMarkdown from 'react-markdown' */
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri:"https://api-euwest.graphcms.com/v1/cjsdfr8va10zq01ckz2l4mqku/master",
        fetch: fetch
    })
  });

export const allPostsQuery = gql`
    query($slug: String){
        projects(where: {slug: $slug}){
            id
            title
            slug
        }
    }
`

export const PaginationQuery = gql`
    query($postId: String){
        previousProject: projects(last:1, before: $postId ){
            title
            slug
            id
        }
        nextProject: projects(first:1, after: $postId){
            title
            slug
            id
        }
    }
`
/*
const Projects = () => (
    <Query query={allPostsQuery} >
     {({ loading, error, data}) => {
        if (loading) return <div className="container">
                                <p>Loading...</p>
                            </div>;
        if (error) return <div className="container">
                                <p>Error :(</p>
                            </div>;
                            
        return <h1>{data.projects.slug}</h1>
    }}
    </Query>
); */

class Project extends React.Component {
    static getInitialProps({query}) {
        console.log({query})
        
        return {query};
 }
    render() {
    console.log(this.props.slug)
    const query = this.props.query
      return (
        
       <Query query={allPostsQuery} variables={{slug: query}}>
            {({ loading, error, data:{projects}}) => {
                if (loading) return <div className="container">
                                        <p>Loading...</p>
                                    </div>;
                if (error) return <div className="container">
                                        <p>Error :(</p>
                                    </div>;
                            
        return <React.Fragment> 
            {console.log(projects)}
       {/*  <h1>{projects[0].title}</h1>
                <span>{projects[0].description}</span> */}
                </React.Fragment>
    }}
    </Query>

      
      ) 
    } 
  }


 const Rendered = () => {
      return(
          <Layout>
              <ApolloProvider client={client}>
                <Project/>
              </ApolloProvider>
          </Layout>
      )
  }

export default Rendered
