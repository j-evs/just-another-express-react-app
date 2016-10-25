import React from 'react';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import TextFieldGroup from '../common/TextFieldGroup';


class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
      invalid: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'There is a user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.context.router.push('/');
        },
        ({ data }) => this.setState({ errors: data, isLoading: false })
      );
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join us!</h1>

        <TextFieldGroup
          value={this.state.value}
          onChange={this.onChange}
          error={errors.username}
          checkUserExists={this.checkUserExists}
          label="Username"
          field="username"
        />
        <TextFieldGroup
          value={this.state.value}
          onChange={this.onChange}
          error={errors.email}
          checkUserExists={this.checkUserExists}
          label="Email"
          field="email"
        />
        <TextFieldGroup
          value={this.state.value}
          onChange={this.onChange}
          error={errors.password}
          label="Password"
          field="password"
          type="password"
        />
        <TextFieldGroup
          value={this.state.value}
          onChange={this.onChange}
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          field="passwordConfirmation"
          type="password"
        />

        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-large">
            Sign up!
          </button>
        </div>
      </form>
    );
  }
};

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired,
  isUserExists: React.PropTypes.func

};

SignupForm.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default SignupForm;
