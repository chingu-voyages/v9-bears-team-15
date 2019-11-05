import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser, logout } from "../../actions/auth";
import './header.scss'


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
            <ul className="user-nav">
                <span className="user-nav__link">
                    <strong>{user ? `Welcome ${user.username}` : ""}</strong>
                </span>
                <li className="user-nav__link">
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
                <div className="navbar__wrapper">
                    <div className="container">
                        <div className="navbar">
                            <h1>
                                <Link to="#" className="navbar__logo">Bears Stock Game</Link>
                            </h1>
                            {isAuthenticated ? authLinks : guestLinks}
                        </div>
                    </div>
                </div>
            );
        }
    }

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { loadUser, logout })(Header);