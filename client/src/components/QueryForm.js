import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import validateEmails from '../utils/validateEmail';
import { queryFields } from './form_fields/formFields';
import TextField from './form_fields/TextField';
import TextareaField from './form_fields/TextareaField';
import * as actions from '../actions';

let QueryForm = ({formValues, submitQuery, submitting, history}) => {
  const renderFields = _.map(queryFields, ({ label, name, type }) => {
    if (type === 'textarea') {
      return (
        <Field
          key={name}
          component={TextareaField}
          type={type}
          label={label}
          name={name}
        />
      );
    } else {
      return (
        <Field
          key={name}
          component={TextField}
          type={type}
          label={label}
          name={name}
        />
      );
    }
  });

  return (
    <div style={{textAlign: 'center', paddingTop: '15px'}}>
      <h3>Contact Us</h3>
      <p style={{fontSize: 'smaller'}}>P.O. Box 28, Cedar Grove, NJ 07009 <br />Monday - Friday 9:00am to 5:00pm</p>
      <div>
        <form>{renderFields}</form>
        <button onClick={() => submitQuery(formValues, history)} disabled={submitting} className="btn btn-info">Send</button>
      </div>
    </div>
  );
};

function validate(values) {
  const errors = {};

  errors.email = validateEmails(values.email || '');

  _.each(queryFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return {
    formValues: state.form.queryForm.values
  };
}

QueryForm = connect(mapStateToProps, actions)(QueryForm);

QueryForm = reduxForm({
  validate,
  form: 'queryForm'
})(QueryForm);

export default QueryForm;
