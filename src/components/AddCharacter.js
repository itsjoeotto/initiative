import React, {Component} from "react";
import CharacterForm from './CharacterForm';
// import io from "socket.io-client";


class AddCharacter extends Component {

    createCharacter = ev => {
        ev.preventDefault();
        const character = {
            name: this.name.value,
            roll: this.roll.value,
            foe: this.refs.foe.checked,
            party: this.refs.party.checked,
            toBeUpdated: false
        }
        this.props.addCharacter(character);
        ev.currentTarget.reset();
    }

    // socket = io('localhost:8080');


    // sendMessage = ev => {
    //     ev.preventDefault();
    //     this.socket.emit('SEND_MESSAGE', {
    //         author: this.state.username,
    //         message: this.state.message
    //     });
    //     this.setState({ message: '' });
    // }

    // socket.on('RECEIVE_MESSAGE', function(data) {
    //     addMessage(data);
    // });

    // addMessage = data => {
    //     console.log(data);
    //     this.setState({ messages: [...this.state.messages, data] });
    //     console.log(this.state.messages);
    // };

    render() {
        return (
            <div className="add-character">
                <CharacterForm addChar={true}
                    clearBoard={this.props.clearBoard}
                    addCharacter={this.props.addCharacter} />
            </div>
        );
    }
}

export default AddCharacter;