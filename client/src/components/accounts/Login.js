import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

export class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.email, this.state.password);
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        if(this.props.isAuthenticated) {
            return <Redirect to='/' />;
        }
        const { email, password } = this.state;
        return (
            <div className="">
                <h2>Login</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="">
                        <label>Email</label>
                        <input className="" type="text" name="email" onChange={this.onChange} value={email}/> 
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input className="" type="password" name="password" onChange={this.onChange} value={password}/> 
                    </div>
                    <div className="">
                    <button className="" type="submit">Login</button>
                    </div>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </form>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login)