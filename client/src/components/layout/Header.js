import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser, logout } from "../../actions/auth";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
        loadUser: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.loadUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="">
                <span className="">
                    <strong>{user ? `Welcome ${user.username}` : ""}</strong>
                </span>
                <li className="">
                    <button onClick={this.props.logout} className="">Logout</button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="">
                <li className="">
                    <Link to="/register" className="">Register</Link>
                </li>
                <li className="">
                    <Link to="/login" className="">Login</Link>
                </li>
            </ul>
        );

        return (
                <AppBar position="static">
                    <Typography variant="h6">
                        <Link to="#">Bears Stock Game</Link>
                    </Typography>
                    {isAuthenticated ? authLinks : guestLinks}
                </AppBar>
            );
        }
    }

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { loadUser, logout })(Header);