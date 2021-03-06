import React from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

class StreamForm extends React.Component {
  renderError = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Field
          name="title"
          type="text"
          component={this.renderInput}
          label="Enter Title"
        />
        <Field
          name="description"
          type="text"
          component={this.renderInput}
          label="Enter Description"
        />
        <Link className="ui button" to={"/"}>
          Cancel
        </Link>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = ({ title, description }) => {
  const errors = {};

  if (!title) {
    errors.title = "You must enter a title";
  }
  if (!description) {
    errors.description = "You must enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
