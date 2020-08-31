import React, {useState} from 'react';
import {Button, Form} from 'semantic-ui-react';
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";

const Login = (props) => {
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const onChange = e => {
        setValues({
            ...values, [e.target.name]: e.target.value
        })
    }
    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(_, {  data: { login: userData }  }) {
            console.log(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    const onSubmit = e => {
        e.preventDefault();
        loginUser();
    }


    return (
        <>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />

                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Login
                </Button>
            </Form>
            {
                Object.keys(errors).length > 0 && (
                    <div>
                        {
                            Object.values(errors).map(value =>(
                                <div key={value}>{value}</div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
};

const LOGIN_USER = gql`
    mutation login(
        $username: String! 
        $password: String! 
    ){
        login(
            username: $username,
            password: $password
        ){
            id email username createdAt token
        }
    }
`;


export default  Login;