import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {Grid, GridColumn, GridRow} from "semantic-ui-react";
import PostCard from "../components/PostCard";


const Home = () => {
    const {loading, data: {getPosts: posts}} = useQuery(FETCH_POST_QUERY);

    return (
        <Grid columns={3}>
            <GridRow>
                <h1>Posts</h1>

            </GridRow>
            <GridRow>
                {
                    loading ?
                        (<p>Loading posts</p>)
                    :
                        posts && posts.map(item=>(
                            <GridColumn key={item.id}>
                                <PostCard item={item} />
                            </GridColumn>
                        ))
                }
            </GridRow>
        </Grid>
    )
};
const FETCH_POST_QUERY = gql`
    {
        getPosts{
            id body createdAt username likeCount
            likes{
                username
            }
            commentCount
            comments{
                id username createdAt body
            }
        }
    }
`;
export default Home;