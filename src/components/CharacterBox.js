import React, { Component } from 'react';
import UpdateCharacter from './UpdateCharacter';

class CharacterBox extends Component {

    toggleUpdateCharacter = (character, key) => {
        character.toBeUpdated = (character.toBeUpdated ? false : true);
        this.props.toggleUpdateForm(character, key);
    }


    render() {
        return (
            <div>
                <div onClick={() => {this.toggleUpdateCharacter(this.props.character, this.props.keyId)}}>
                    {this.props.character.name} : {this.props.character.roll}
                </div>

                {(this.props.character.toBeUpdated) ? 
                <UpdateCharacter character={this.props.character}
                deleteCharacter={this.props.deleteCharacter} 
                updateCharacter={this.props.updateCharacter} /> : null }
            </div>
        )
    }
}

export default CharacterBox;