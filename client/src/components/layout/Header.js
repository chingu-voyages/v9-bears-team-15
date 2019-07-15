import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    };

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
            <nav className="">
                <div className="container">
                    <div id="">
                        <Link to="#">Bears Stock Game</Link>
                    </div>
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
            );
        }
    }

const mapStateToProps = state => ({
    auth: state.authReducer
});

export default connect(mapStateToProps, { logout })(Header);