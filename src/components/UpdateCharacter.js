import React, { Component } from 'react';
import CharacterForm from './CharacterForm';


class UpdateCharacter extends Component {
    render () {
        return (
            <div>
                <CharacterForm updateChar={true}
                    character={this.props.character} />
            </div>
        )
    }
};

export default UpdateCharacter;