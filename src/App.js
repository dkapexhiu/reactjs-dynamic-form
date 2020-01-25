import React, { Component } from "react";
import DynamicForm from "./components/DynamicForm";
import "./App.css";

class App extends Component {
  state = {
    data: [
      { id: 1, name: "a", country: "Albania" },
      { id: 2, name: "b", country: "Italy" }
    ],
    current: {}
  };

  onSubmit = model => {
    let data = [];
    if (model.id) {
      data = this.state.data.filter(d => {
        return d.id != model.id;
      });
    } else {
      model.id = +new Date();
      data = this.state.data.slice();
    }

    this.setState({
      data: [model, ...data]
    });
  };

  onEdit = id => {
    let record = this.state.data.find(d => {
      return d.id == id;
    });
    alert(JSON.stringify(record));
    this.setState({
      current: record
    });
  };

  render() {
    let data = this.state.data.map(d => {
      return (
        <tr key={d.id}>
          <td>{d.name}</td>
          <td>{d.country}</td>
        </tr>
      );
    });

    return (
      <div className="App">
        <DynamicForm
          className="form"
          title="Dynamic Form"
          defaultValues={this.state.current}
          model={[
            { key: "name", label: "Name", props: { required: true } },
            {
              key: "country",
              label: "City",
              type: "select",
              value: "select",
              options: [
                { key: "select", label: "Select", value: "Select" },
                { key: "albania", label: "Albania", value: "Albania" },
                { key: "italy", label: "Italy", value: "Italy" }
              ],
              props: { required: true }
            }
          ]}
          onSubmit={model => {
            this.onSubmit(model);
          }}
        />

        <table border="1">
          <tbody>{data}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
