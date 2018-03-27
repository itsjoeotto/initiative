import React, { Component } from 'react';
import AddCharacter from "./AddCharacter";
import InitiativeBoard from './InitiativeBoard';
import axios from 'axios';
import '../App.css'

class App extends Component {
 
  state = {
    initiative: []
  };

  url = 'http://localhost:3001/characters';



  addCharacter = character => {
    let initiative = [...this.state.initiative];
    initiative[`character${Date.now()}`] = character;
    this.setState({ initiative: initiative });
    this.postCharactersToServer(character);
  };

  toggleUpdateForm= (character, key) => {
    let initiative = [...this.state.initiative];
    initiative[key] = character;
    this.setState({initiative: initiative});
  }

  getCharactersFromServer = () => {
    axios.get(this.url).then(res => {
      this.setState({ initiative: res.data });
    })
    .catch(err => {
      console.log('err', err);
    })
  };


  postCharactersToServer = character => {
    axios.post(this.url, character).then(res => {
      console.log('post worked', res);
    })
    .catch(err => {
      console.log('post error: ', err);
    });
  }

  componentDidMount() {
    this.getCharactersFromServer();
  }



  render() {
    return (
      <div>
        <h1>Initiative!</h1>
        <InitiativeBoard initiative={this.state.initiative}
          toggleUpdateForm={this.toggleUpdateForm} />
        <AddCharacter addCharacter={this.addCharacter} 
          addChar={true}
          initiative={this.state.initiative} 
          url={this.url} />
      </div>
    );
  }
}

export default App;