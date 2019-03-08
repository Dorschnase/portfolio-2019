import React, {Component, Fragment} from "react";
import { Container, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row, Col } from "reactstrap";
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Layout from "../components/Layout";
import Pagination from "../components/pagination";
import Loading from "../components/loading";


export const allProjectsQuery = gql`
    query($slug: String){
        projects(where: {slug: $slug}){
            id
            title
            slug
            subheading
            description
            year
            skills
            technologies
            links

            cover{
                id
                handle
            }
        }
    }
`

export const PaginationQuery = gql`
    query($projectId: String){
        previousProject: projects(last:1, before: $projectId ){
            title
            slug
            id
        }
        nextProject: projects(first:1, after: $projectId){
            title
            slug
            id
        }
    }
`


class Project extends Component {
    static getInitialProps({query}) {
        const isServer = typeof window === "undefined";
        return {isServer, query};
    }
    render(){
    const {query} = this.props    
    
    return(
        <Layout>
            <Query query={allProjectsQuery} variables={{slug: query.slug}} >
            {({ loading, error, data:{projects} }) => {
            if (loading) return <div className="container">
                                    <Loading/>
                                </div>;
            if (error) return <div className="container">
                                    <Error/>
                                </div>;
    
            return (
            <Fragment> 
                <Container>
                    <Row>
                        <Col className="mx-auto mb-4 text-center">
                            <Query query={PaginationQuery} variables={{projectId: projects[0].id}}>
                                {({loading, data: {previousProject, nextProject}}) => {
                                    if (loading) return <Loading/>
                                    if (error) return <Error/>
                                    return (
                                        <Pagination previous={previousProject[0]} next={nextProject[0]}/> 
                                    )
                                }}
                            </Query>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="11" className="mx-auto text-right">
                            <h1 className="text-primary mx-auto font-weight-light">{projects[0].title}</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="11" className="mx-auto mb-4 text-right">
                            <span className="text-secondary mx-auto">{projects[0].subheading}</span>
                        </Col>
                    </Row>                   
                    <Row>
                        <Col xs="11" className="mx-auto">
                    <img src= {`https://media.graphcms.com/resize=width:400/${projects[0].cover.handle}`} className="img-fluid"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="11" className="mx-auto my-3">
                        <p>{projects[0].description}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="6">
                                <h5>Technologies</h5>
                                <p className="text-primary">{projects[0].technologies.map((technology, index) => (
                                    <ul>
                                        <li key={index}>{technology}</li>
                                    </ul>
                                ))}</p>
                        </Col>
                        <Col xs="6">
                        
                        </Col>
                    </Row>
                </Container>
            </Fragment>
            )}}
        </Query>
      </Layout>
    ) 
  } 
}

export default Project;