import React, { Component } from 'react';
import AddCharacter from "./AddCharacter";
import InitiativeBoard from './InitiativeBoard';
import axios from 'axios';
import io from 'socket.io-client';
import '../App.css';

class App extends Component {
 constructor() {
   super();
   this.state = {
     initiative: []
   };
   const setStateFromSocket = data => {
    this.setState({initiative: data.initiative});
   }

   this.socket = io('http://localhost:3001');
   this.socket.on('RECEIVE_DATA', (data) => {
    setStateFromSocket(data);
   });

 }

  emitData = () => {
    this.socket.emit('SEND_DATA', {
      initiative: this.state.initiative
    });
  }

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
    axios.get('/characters').then(res => {
      console.log('characters', res.data);
      this.setState({initiative: res.data});
      this.emitData();
    })
    .catch(err => {
      console.log('err', err);
    })
  };

  updateCharacter = character => {
    axios.put(`${'/characters'}/${character._id}`, character).then(res => {
      console.log('updated character', res.data);
      let filterCharacter = this.state.initiative.filter(character => character._id !== res.data._id);
      let newState = [...filterCharacter, res.data];
      let sortState = newState.sort((a, b) => {
        return b.roll - a.roll;
      }); 
      this.setState({initiative: sortState});
      this.emitData();
    })
    .catch(err => {
      console.log('put error ', err);
    });
  }


  postCharactersToServer = character => {
    axios.post('/characters', character).then(res => {
      console.log('post worked', res);
      this.getCharactersFromServer();
    })
    .catch(err => {
      console.log('post error: ', err);
    });
  }

  clearBoard = () => {
    axios.delete('/characters').then(res => {
      this.setState({initiative: []});
    })
    .catch(err => {
      console.log('delete all error: ', err);
    })
  }

  deleteCharacter = id => {
    axios.delete(`${'/characters'}/${id}`).then(res => {
      console.log('character deleted');
      this.getCharactersFromServer();
    })
    .catch(err => {
      console.log('delete error', err);
    });
  }

  componentDidMount() {
    this.getCharactersFromServer();
  }



  render() {
    return (
      <div className='App'>
        <h1>INITIATIVE TRACKER</h1>
        <AddCharacter addCharacter={this.addCharacter}
          clearBoard={this.clearBoard} 
          addChar={true}
          initiative={this.state.initiative} 
          url={'/characters'} />
        <InitiativeBoard initiative={this.state.initiative}
          toggleUpdateForm={this.toggleUpdateForm}
          deleteCharacter={this.deleteCharacter}
          updateCharacter={this.updateCharacter} />
      </div>
    );
  }
}

export default App;