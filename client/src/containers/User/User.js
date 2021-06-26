import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import styles from "./User.module.css";
import axios from "../../axios-data";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";

class User extends Component {
  state = {
    userForm: {
      kindOfProfile: {
        elementType: "select",
        elementConfig: {
          options: [{ value: "Public" }, { value: "Private" }],
        },
        value: "Public",
        validation: {
          required: true,
        },
        valid: true,
      },
      landlinePhone: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Landline Phone",
        },
        value: "",
        validation: {
          required: true,
          landline: true,
        },
        valid: false,
      },
      mobilePhone: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Mobile Phone",
        },
        value: "",
        validation: {
          required: true,
          mobile: true,
        },
        valid: false,
      },
      adress: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Adress",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
      },
      supplementaryAddress: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Supplementary Address",
        },
        value: "",
        validation: {
          required: false,
        },
        valid: true,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          zipCode: true,
        },
        valid: false,
      },
      location: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Location: (e.g. Caparica)",
        },
        value: "",
        validation: {
          required: true,
          minLength: 3,
        },
        valid: false,
      },
    },
    formIsValid: false,
    loading: false,
  };

  changeLoadingTo = (e) => this.setState({ loading: e });

  formHandler = (e) => {
    e.preventDefault();

    const {
      kindOfProfile,
      landlinePhone,
      mobilePhone,
      adress,
      supplementaryAddress,
      zipCode,
      location,
    } = this.state.userForm;

    const account = {
      role: "USER",
      state: "ENABLED",
      userId: this.props.userId ? this.props.userId : "Wrong user ID",
      email: this.props.email,
      publicUserId: this.props.publicUserId,
      kindOfProfile: kindOfProfile.value,
      userData: {
        phone: {
          landlinePhone: landlinePhone.value,
          mobilePhone: mobilePhone.value,
        },
        fullAddress: {
          adress: adress.value,
          supplementaryAddress: supplementaryAddress.value,
          zipCode: zipCode.value,
          location: location.value,
        },
      },
    };

    this.changeLoadingTo(true);
    axios
      .post("/accounts.json", account)
      .then((res) => {
        this.changeLoadingTo(false);
        this.props.history.push("/accounts");
      })
      .catch((err) => this.changeLoadingTo(false));

    // --- Advanced version with Redux Thunk & Token from Firebase --- \\
    // this.props.onOrderBurger(order, this.props.idToken);
  };

  /*
+351 913456789
+351 913456789
Rua dos alunos de APDC20-21, 100, Piso 20
APDC Project Innovation Center for Fresh Ideas
1300-089
Lisbon
    */

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

    if (rules.landline) {
      const pattern = /^\+351 (?:[0-9] ?){8}[0-9]$/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.mobile) {
      const pattern = /^\+351 9(?:[136]{1}[0-9]{7}$)/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.zipCode) {
      const pattern = /^[0-9]{4}-([0-9]{3}$)/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  inputHandler = (e, id) => {
    const userForm = { ...this.state.userForm };
    if (e.target.elementType !== "select") {
      userForm[id].value = e.target.value;
      userForm[id].valid = this.checkValidity(
        userForm[id].value,
        userForm[id].validation
      );
    }
    let formIsValid = true;
    for (const key in userForm) {
      formIsValid = userForm[key].valid && formIsValid;
    }
    this.setState({ userForm, formIsValid });
  };

  render() {
    const allInputs = [];
    for (const key in this.state.userForm) {
      const {
        elementType,
        elementConfig,
        value,
        valid,
        validation,
      } = this.state.userForm[key];
      allInputs.push(
        <Input
          key={key}
          elementType={elementType}
          elementConfig={elementConfig}
          value={value}
          changed={(e) => this.inputHandler(e, key)}
          valid={!valid}
          shouldValidate={validation}
        />
      );
    }
    let form = (
      <form onSubmit={this.formHandler}>
        {allInputs}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          CONFIRM
        </Button>
      </form>
    );

    this.state.loading && (form = <Spinner />);

    return (
      <div className={styles.UserData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, order }) => ({
  //   loading: order.loading,
  idToken: auth.idToken,
  userId: auth.userId,
  email: auth.email,
  publicUserId: auth.publicUserId,
});

const mapDispatchToProps = (dispatch) => ({
  //   onOrderBurger: (orderData, token) =>
  //     dispatch(actionCreators.purchaseBurger(orderData, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
