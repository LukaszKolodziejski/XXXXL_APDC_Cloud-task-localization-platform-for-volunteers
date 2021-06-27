import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import WrapperAuth from "./WrapperAuth";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

// >>> each e-mail: && each password <<<
// only change 4 > 5 > 6 > ...
/*
student.5@pt.unl
FctAPDC-user_5
*/
class Auth extends Component {
  state = {
    controls: {
      publicUserId: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "User ID",
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
        },
        valid: false,
        signInOption: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "E-mail Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        signInOption: true,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        signInOption: true,
      },
      password2: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        signInOption: false,
      },
    },
    isSignup: true,
    formIsValid: false,
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isEmail) {
      const pattern =
        /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-z0-9-]*[a-zA-Z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  inputHandler = (e, key) => {
    const { controls, isSignup } = this.state;
    const updatedControls = {
      ...controls,
      [key]: {
        ...controls[key],
        value: e.target.value,
        valid: this.checkValidity(e.target.value, controls[key].validation),
      },
    };

    let formIsValid = true;
    for (const key in updatedControls) {
      if (updatedControls[key].signInOption) {
        formIsValid = updatedControls[key].valid && formIsValid;
      }
    }
    if (updatedControls.password.value && isSignup) {
      formIsValid =
        updatedControls.password.value === updatedControls.password2.value;
    }

    this.setState({ controls: updatedControls, formIsValid });
  };

  formHandler = (e) => {
    e.preventDefault();
    const { email, password, publicUserId } = this.state.controls;
    const { isSignup } = this.state;
    this.props.onAuth(
      email.value,
      password.value,
      isSignup,
      publicUserId.value
    );
  };

  switchAuthModeHandler = () =>
    this.setState((prevState) => ({ isSignup: !prevState.isSignup }));

  render() {
    const allInputs = [];
    const { isSignup } = this.state;
    for (const key in this.state.controls) {
      const {
        elementType,
        elementConfig,
        value,
        valid,
        validation,
        signInOption,
      } = this.state.controls[key];

      if (isSignup || signInOption) {
        allInputs.push(
          <Input
            key={key}
            elementType={elementType}
            elementConfig={elementConfig}
            value={value}
            valid={!valid}
            shouldValidate={validation}
            changed={(e) => this.inputHandler(e, key)}
          />
        );
      }
    }
    let authForm, errorMessage;
    this.props.loading
      ? (authForm = <Spinner />)
      : (authForm = (
          <div className={styles.Auth}>
            <h4>
              Enter your data to{" "}
              {this.state.isSignup ? "registration" : "login"}
            </h4>
            {errorMessage}
            <form onSubmit={this.formHandler}>
              {allInputs}
              <WrapperAuth x="40">
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                  Submit
                </Button>
              </WrapperAuth>
            </form>
            <WrapperAuth x="-50">
              <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                Switch: {this.state.isSignup ? "Sign up" : "Sign in"}
              </Button>
            </WrapperAuth>
            {this.props.idToken && !isSignup ? (
              <Redirect to="/accounts" />
            ) : this.props.idToken ? (
              <Redirect to="/user" />
            ) : null}
          </div>
        ));
    this.props.error
      ? (errorMessage = (
          <p style={{ color: "red" }}>{this.props.error.message}</p>
        ))
      : (errorMessage = null);

    return authForm;
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
  idToken: auth.idToken !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup, publicUserId) =>
    dispatch(actionCreators.auth(email, password, isSignup, publicUserId)),
  onLogout: () => dispatch(actionCreators.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
