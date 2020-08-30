import React, {useState} from 'react';
import {Menu, Segment} from 'semantic-ui-react';
import {Link}  from 'react-router-dom';

const MenuBar = () => {

    const pathName = window.location.pathname;
    const path = pathName === '/' ? 'home' : pathName.substr(1);
    const [activeItem, setActiveItem] = useState(path);
    const handleClick = (e, {name}) => {
        setActiveItem(name);
    }

    return (
        <>
            <Menu pointing secondary>

                <Menu.Item
                    name="home"
                    active={activeItem === 'home'}
                    onClick={handleClick}
                    as={Link}
                    to="/"
                />

                <Menu.Item
                    name="login"
                    active={activeItem === 'login'}
                    onClick={handleClick}
                    as={Link}
                    to="/login"
                />

                <Menu.Item
                    name="register"
                    active={activeItem === 'register'}
                    onClick={handleClick}
                    as={Link}
                    to="/register"
                />

                <Menu.Menu  position="right">
                    <Menu.Item
                        name="logout"
                        active={activeItem === 'logout'}
                        onClick={handleClick}
                        as={Link}
                        to="/logout"
                    />
                </Menu.Menu>

            </Menu>
        </>
    )
}

export default MenuBar;