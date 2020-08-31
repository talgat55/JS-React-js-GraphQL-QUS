import React, {useState} from 'react';
import {Button, Form} from "semantic-ui-react";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {FETCH_POST_QUERY} from "../utils/graphql";


const PostForm = () => {
    const [values, setValues] = useState({
        body: '',
    });
    const onChange = e => {
        setValues({
            ...values, [e.target.name]: e.target.value
        })
    }
    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
        update(proxy,result) {
            const data = proxy.readQuery({
                query: FETCH_POST_QUERY
            });

            data.getPosts = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({ query: FETCH_POST_QUERY, data });
            values.body = '';
        },

        variables: values
    });
    const onSubmit = e => {
        e.preventDefault();
        createPost();
    }


    return (
        <Form  onSubmit={onSubmit}>
            <h1>Create new post</h1>
            <Form.Field>
                <Form.Input
                    label="Username"
                    placeholder="Body"
                    name="body"
                    type="text"
                    value={values.body}
                    onChange={onChange}
                />
                <Button type="submit" color="teal">
                    Submit
                </Button>
            </Form.Field>
        </Form>
    )
}
const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
        }
        
    }
`;

export default PostForm;

