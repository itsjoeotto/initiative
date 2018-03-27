import React from 'react';
import CharacterBox from './CharacterBox';

class InitiativeBoard extends React.Component {

    foo = ev => {
        ev.preventDefault();
        let char = ev.currentTarget.name;
        console.log('char', char);
    }

    renderList = key => {
        let character = this.props.initiative[key];

        return <li key={key}>
                <CharacterBox character={character}
                keyId={key}
                toggleUpdateForm={this.props.toggleUpdateForm}
                showUpdate={this.props.showUpdate} />
        </li>
    }


    render() {
        const initiativeIds = Object.keys(this.props.initiative);
        return (
            <div>
                <ul>
                    {initiativeIds.map(this.renderList)}
                </ul>
            </div>
        );
    }
}

export default InitiativeBoard;