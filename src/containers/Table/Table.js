import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button';
import Dices from '../../components/Dices/Dices';
import Points from '../../components/Search/Points/Points';
import classes from './Table.module.css';
import { getRandomDice } from '../../shared/utility';


const INITIAL_STATE = {
    table: [null, null, null, null, null, null],
    oldTable: [null, null, null, null, null, null],
    changed: false,
    dices: [null, null],
    position: -1,
};

class Table extends Component {
    state = INITIAL_STATE;

    roll = () => {
        const dices = [getRandomDice(), getRandomDice()];

        this.setState({...this.state, dices: dices, position: 0});
    };

    updateValue = (index) => {
        let table = [...this.state.table];
        let position = this.state.position;
        let changed = this.state.changed;

        if (this.state.position >= 0 && this.state.position < 2) {
            if (!this.state.changed) {
                table = [...this.state.oldTable];
            }

            table[index] = this.state.dices[this.state.position];
            changed = true;
            position += 1;
        }

        this.setState({
            ...this.state,
            table: table,
            changed: changed,
            position: position,
        });
    };

    save = () => {
        this.setState({
            ...this.state,
            oldTable: [...this.state.table],
            dices: [null, null],
            position: -1,
        });
    };

    reset = () => {
        this.setState({
            ...this.state,
            table: [...this.state.oldTable],
            changed: false,
            position: 0
        });
    };

    newTable = () => this.setState(INITIAL_STATE);

    render() {
        let dice = null;
        let right =
            <div className={classes.Buttons}>
                <Button
                    style={{ backgroundColor: 'red' }}
                    onClick={this.reset}
                    disabled={this.state.position < 1}
                >
                    Effacer
                </Button>
                <Button onClick={this.save} disabled={this.state.position < 2}>
                    Sauvegarder
                </Button>
            </div>
        ;

        if (this.state.oldTable.includes(null)) {
            dice =
                <Dices
                    dices={this.state.dices}
                    position={this.state.position}
                    roll={this.roll}
                />
            ;
        } else {
            right =
                <Points
                    id={this.props.id}
                    table={this.state.oldTable}
                    region={this.props.region}
                    goBack={this.newTable}
                />
            ;
        }

        return (
            <div>
                <div className={classes.Bloc}>
                    <div className={classes.Table}>
                        {this.state.table.map((value, index) => value ?
                            <div key={index} className={classes.Value}>{value}</div> :
                            <div key={index} className={classes.Cell} onClick={() => this.updateValue(index)}>{value}</div>
                        )}
                    </div>
                    {right}
                </div>
                {dice}
            </div>
        );
    }
}

export default Table;
