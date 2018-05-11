import React, { Component } from 'react';
import CharacterForm from './CharacterForm';


class UpdateCharacter extends Component {
    render () {
        return (
            <div>
                <CharacterForm updateChar={true}
                    character={this.props.character}
                    deleteCharacter={this.props.deleteCharacter}
                    updateCharacter={this.props.updateCharacter}  />
            </div>
        )
    }
};

export default UpdateCharacter;