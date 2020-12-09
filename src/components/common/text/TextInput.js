import React from "react";
import PropTypes from "prop-types";

const TextInput = ({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  disabled = false,
  button,
}) => {
  return (
    <div className="form-group row">
      <label
        className="font-weight-bold col-4 col-form-label"
        htmlFor={name}
        style={{ textAlign: "left" }}
      >
        {label}
      </label>

      <div className="col">
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
          type={type}
          disabled={disabled}
        />
        {error && (
          <div role="alert" className="text-danger">
            {error}
          </div>
        )}
      </div>
      {button && (
        <div className="col-2">
          <button className="btn btn-secondary mb-4" onClick={button.onClick}>
            {button.text}
          </button>
        </div>
      )}
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TextInput;
