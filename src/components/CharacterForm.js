import React, { Component } from 'react';

class CharacterForm extends Component {
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

    updateCharacter = ev => {
        console.log('click');
        ev.preventDefault();
        console.log('update clicked');
        // const character = {
        //     name: this.name.value,
        //     roll: this.roll.value,
        //     foe: this.refs.foe.checked,
        //     party: this.refs.party.checked
        // }
        // this.props.addCharacter(character);
        ev.currentTarget.reset();
    }
    foo = () => {
        console.log('foo');
    }

    render() {
        return (
            <form className="character-form" onSubmit={(this.props.addChar) ? this.createCharacter : this.updateCharacter} >
                <input name="name" ref={input => this.name = input} type="text" placeholder={(this.props.addChar) ? "Name" :this.props.character.name} />
                <input name="roll" ref={input => this.roll = input} type="text" placeholder={(this.props.addChar) ? "Roll" :this.props.character.roll} />
                <input name="party" ref="party" type="checkbox" />Party
                <input name="foe" ref="foe" type="checkbox" /> Foe
                {(this.props.addChar) ? 
                <button type="submit">Add</button> : 
                <div>
                    <button type="submit">Update</button>
                    <button type="button" onClick={this.foo}>Delete</button>
                </div>}
            </form>
        );
    }
}

export default CharacterForm;