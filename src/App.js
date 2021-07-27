import './App.css';
import React, { Component } from 'react';
import getItunesEntitiesData from './itunes-api';
import Table from './components/Table';

class App extends Component {
  state = {
    hasError: false,
    isLoading: false,
    searchQuery: '',
    searchValue: '',
    iTunesData: [],
  };

  handleSearhcQueryInputChange = e => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  handleSearchValueInputChange = e => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  handleItunesData = ({ results }) => {
    this.setState({
      iTunesData: results,
    });
    console.log(results);
  }

  handleButtonClick = e => {
    const { searchQuery, searchTerm } = this.state;
    console.log('Printing from button click event handler', searchQuery,  searchTerm);

    getItunesEntitiesData(searchQuery, searchTerm)
      .then(this.handleItunesData)
      .catch(error => {
          this.setState({
            hasError: true,
            isLoading: false,
        });
      });
    this.setState({
      isLoading: true,
    });
  }

  getItunesDataColumns() {
    return [
      { label: 'Artist Id', renderVal: itune => itune.artistId },
      { label: 'Artist Name', renderVal: itune => itune.artistName },
      { label: 'Collection Name', renderVal: itune => itune.collectionName },
      { label: 'Collection Price', renderVal: itune => itune.collectionPrice },
      { label: 'Release Date', renderVal: itune => itune.releaseDate },
    ]
  }

  render() {
    const {
      hasError,
      isLoading,
      iTunesData
    } = this.state;

    return (
      <main>
        <div>
          <input 
            type="text" 
            id="queryParam" 
            name="queryParam" 
            onChange={this.handleSearhcQueryInputChange}
          />
          <br></br>
          
          <input 
            type="text" 
            id="queryValue" 
            name="queryValue" 
            onChange={this.handleSearchValueInputChange}
          />
          <br></br>

          <button 
            type="button" 
            onClick={this.handleButtonClick}>
              Click Me!
          </button>

      {!!iTunesData && !!iTunesData.length && !hasError &&
        <section>
          <Table
              id='iTunes-table'
              columns={this.getItunesDataColumns()}
              data={iTunesData}
          />          
        </section>
      }
        </div>
      </main>
    );
  }
}

export default App;
