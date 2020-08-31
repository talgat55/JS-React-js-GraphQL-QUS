import React, {useContext} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {Grid, GridColumn, GridRow} from "semantic-ui-react";
import PostCard from "../components/PostCard";
import {AuthContext} from "../context/auth";
import {FETCH_POST_QUERY} from "../utils/graphql";
import PostForm from "../components/PostForm";


const Home = () => {
    const {loading, data: {getPosts: posts}} = useQuery(FETCH_POST_QUERY);
    const {user} = useContext(AuthContext);

    return (
        <Grid columns={3}>
            <GridRow>
                <h1>Posts</h1>

            </GridRow>
            {
                user &&(
                    <GridRow>
                        <PostForm/>
                    </GridRow>
            )}
            <GridRow>
                {
                    loading ?
                        (<p>Loading posts</p>)
                        :
                        posts && posts.map(item => (
                            <GridColumn key={item.id}>
                                <PostCard item={item}/>
                            </GridColumn>
                        ))
                }
            </GridRow>
        </Grid>
    )
};

export default Home;