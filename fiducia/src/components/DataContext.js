// DataContext.js (updated version)
import React, { createContext, Component } from 'react';

const DataContext = createContext();

export class DataProvider extends Component {
  state = {
    voterNames: Array.from({ length: 0 }, () => ''),
  };

  handleVoterNameChange = (event, index) => {
    const { voterNames } = this.state;
    voterNames[index] = event.target.value;
    this.setState({ voterNames });
  };

  render() {
    return (
      <DataContext.Provider
        value={{
          voterNames: this.state.voterNames,
          handleVoterNameChange: this.handleVoterNameChange,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataContext;
