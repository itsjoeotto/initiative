import React, { Component } from 'react';
import AddCharacter from "./AddCharacter";
import InitiativeBoard from './InitiativeBoard';
import axios from 'axios';
import io from 'socket.io-client';
import '../App.css';
// import base from '../base';

class App extends Component {
 constructor() {
   super();
   this.state = {
     initiative: []
   };
   const setStateFromSocket = data => {
    this.setState({initiative: data.initiative});
   }
    //change this to firebase stuff
   this.url = 'http://localhost:3001/characters';
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
    axios.get(this.url).then(res => {
      // let sortState = res.data.sort((a, b) => {
      //   return a.roll - b.roll;
      // }); 
      this.setState({initiative: res.data});
      this.emitData();
    })
    .catch(err => {
      console.log('err', err);
    })
  };

  updateCharacter = character => {
    axios.put(`${this.url}/${character._id}`, character).then(res => {
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
    axios.post(this.url, character).then(res => {
      console.log('post worked', res);
      this.getCharactersFromServer();
    })
    .catch(err => {
      console.log('post error: ', err);
    });
  }

  deleteCharacter = id => {
    axios.delete(`${this.url}/${id}`).then(res => {
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
      <div>
        <h1>Initiative!</h1>
        <InitiativeBoard initiative={this.state.initiative}
          toggleUpdateForm={this.toggleUpdateForm}
          deleteCharacter={this.deleteCharacter}
          updateCharacter={this.updateCharacter} />
        <AddCharacter addCharacter={this.addCharacter} 
          addChar={true}
          initiative={this.state.initiative} 
          url={this.url} />
      </div>
    );
  }
}

export default App;