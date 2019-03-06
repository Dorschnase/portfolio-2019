import Link from 'next/link';
import React, { Component } from "react";
import { graphql, Query } from 'react-apollo';
import { Container, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col } from "reactstrap";

import Layout from "../components/layout";
import gql from 'graphql-tag';
import withData from "../lib/withData";
import Loading from '../components/Loading';
import Grid from '../components/Grid'

import ApolloClient from "apollo-client";
import { render } from "react-dom";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-fetch';



const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri:"https://api-euwest.graphcms.com/v1/cjsdfr8va10zq01ckz2l4mqku/master",
        fetch: fetch
    })
  });

const allProjects = gql`
  query{
      projects{
          id
          title
          slug
          description
          
          cover{
              id
              handle
          }
      }
  }
`

  const Projects = () => (
      
    <Query query={allProjects}>
      {({ loading, error, data:{projects} }) => {
        if (loading) return <div className="container">
                                <p>Loading...</p>
                            </div>;
        if (error) return <div className="container">
                                <p>Error :(</p>
                            </div>;

        return  (

        <React.Fragment>
            <Row>  
            {projects.map((project, index) => (
                <Col xs="10" md="6" lg="4" xl="3" className="mx-auto" key={index}>
                        <Card className="mb-4">
                            <CardImg top width="100%" height="250px" src= {`https://media.graphcms.com/resize=width:400/${project.cover.handle}`} alt="Card image cap" />
                            <CardBody>
                                <CardTitle>
                                    <h5>
                                        {project.title}
                                    </h5>
                                </CardTitle>
                                
                                <CardText>{project.description}</CardText>
                               <Link prefetch href={`/project?name=${project.slug}`} as={`/project/${project.slug}`} 
                               title={project.title}
                                description={project.description}>
                                    <Button className="text-light">
                                        Button
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                        </Col>
                        ))}
                    </Row>
        </React.Fragment>


        );
      }}
    </Query>
  );



const AllProjects = (/* {  url: { pathname }, data: { allProjects } } */) => {
   
    return (
      <Layout>
          <ApolloProvider client={client}>
            <div className="row">
            <Projects />
            </div>
            
        
          </ApolloProvider>
        {/* <Nav pathname={pathname} /> */}
        {
        
            <div>
{/*               <Header
                title='Vinylbase'
                subLine='The best music reviews on the interwebs'
                isIcon
              /> */}
              <section>
               {/*  <Grid entries={allProjects} type='reviews' /> */}
              </section>
            </div>
          
         }
      </Layout>
    )
  }

/* export default withData(graphql(allProjects)(AllProjects)) */
export default AllProjects
/* export default class extends Component{
    static getInitialProps() {
        const isServer = typeof window === "undefined";
        return {isServer};
    }
    render(){
        return(
        <Layout {...this.props}>
            <Container>
            <Query query={allPostsQuery}>
                    {({loading, error, data: {projects}}) => {
                        if (loading) return <div>Loading</div>
                        return (
                            <Row>
                                {projects.map((project, index) => (
                                    <Col xs={4} key={index}>
                                            <Card
                                                
                                                title={project.title}
                                                description={project.description}
                                                cover={project.cover.handle}
                                                
                                            />
                                    </Col>
                                ))}
                            </Row>
                        )
                    }}
                </Query>
                <p>
                    Dis my stuff
                </p>
            </Container>

            
        </Layout>
        
        )
    }
} */

