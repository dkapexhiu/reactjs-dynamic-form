import React from "react";
import "./form.css";

export default class DynamicForm extends React.Component {
  state = {};

  isNameValid() {
    return (
      this.state.name &&
      this.state.name.length >= 3 &&
      this.state.name.length <= 64
    );
  }

  isCountryValid(){
  	return (
      this.state.country &&
      this.state.country.length >= 2 &&
      this.state.country.length <= 64
    );
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.props.onSubmit) this.props.onSubmit(this.state);
    alert("Form submitted successfully");
  };

  onChange = (e, key, type = "single") => {
    console.log(`${key} changed ${e.target.value} type ${type}`);
    if (type === "single") {
      this.setState({
        [key]: e.target.value
      });
    } else {
      // Array of values (e.g. checkbox): TODO: Optimization needed.
      let found = this.state[key]
        ? this.state[key].find(d => d === e.target.value)
        : false;

      if (found) {
        let data = this.state[key].filter(d => {
          return d !== found;
        });
        this.setState({
          [key]: data
        });
      } else {
        this.setState({
          [key]: [e.target.value, ...this.state[key]]
        });
      }
    }
  };

  renderForm = () => {
    let model = this.props.model;
    //let defaultValues = this.props.defaultValues;

    let formUI = model.map(m => {
      let key = m.key;
      let type = m.type || "text";
      let props = m.props || {};
      let name = m.name;
      let value = m.value;

      let target = key;
      value = this.state[target];

      let input = (
        <input
          {...props}
          className="form-input"
          type={type}
          key={key}
          name={name}
          value={value}
          onChange={e => {
            this.onChange(e, target);
          }}
          placeholder="Enter name"
        />
      );

      if (type === "radio") {
        input = m.options.map(o => {
          let checked = o.value === value;
          return (
            <React.Fragment key={"fr" + o.key}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                checked={checked}
                value={o.value}
                onChange={e => {
                  this.onChange(e, o.name);
                }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });
        input = <div className="form-group-radio">{input}</div>;
      }

      if (type === "select") {
        input = m.options.map(o => {
          //let checked = o.value === value;
          console.log("select: ", o.value, value);
          return (
            <option
              {...props}
              className="form-input"
              key={o.key}
              value={o.value}
            >
              {o.value}
            </option>
          );
        });

        console.log("Select default: ", value);
        input = (
          <select
            value={value}
            onChange={e => {
              this.onChange(e, m.key);
            }}
          >
            {input}
          </select>
        );
      }

      if (type === "checkbox") {
        input = m.options.map(o => {
          //let checked = o.value == value;
          let checked = false;
          if (value && value.length > 0) {
            checked = value.indexOf(o.value) > -1 ? true : false;
          }
          console.log("Checkbox: ", checked);
          return (
            <React.Fragment key={"cfr" + o.key}>
              <input
                {...props}
                className="form-input"
                type={type}
                key={o.key}
                name={o.name}
                checked={checked}
                value={o.value}
                onChange={e => {
                  this.onChange(e, m.key, "multiple");
                }}
              />
              <label key={"ll" + o.key}>{o.label}</label>
            </React.Fragment>
          );
        });

        input = <div className="form-group-checkbox">{input}</div>;
      }

      return (
        <div key={"g" + key} className="form-group">
          <label className="form-label" key={"l" + key} htmlFor={key}>
            {m.label}
          </label>
          {input}
          <label className="form-error">
            {key === "name" &&
              !this.isNameValid() &&
              "Should not be empty & between 3 and 64 characters"}
            {key === "country" &&
              !this.isCountryValid() &&
              "Should not be empty & between 2 and 64 characters"}
          </label>
        </div>
      );
    });
    return formUI;
  };

  render() {
    let title = this.props.title || "Dynamic Form";

    return (
      <div className={this.props.className}>
        <h3 className="form-title">{title}</h3>
        <form
          className="dynamic-form"
          onSubmit={e => {
            this.onSubmit(e);
          }}
        >
          {this.renderForm()}
          <div className="form-actions">
            <button
              className="sbtBtn"
              type="submit"
              disabled={!this.isNameValid && !this.isCountryValid}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
