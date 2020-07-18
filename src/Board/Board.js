import React, { Component } from 'react'
import Cell from './Cell'
import Utils from './Utils';

const initState = {
    boardState: [[0, 0, 0],
                 [0, 0, 0],
                 [0, 0, 0]],
    curPlayer : 0,
    gameState: 0,
    turnCount: 0
};

export default class Board extends Component {

    state = {...initState};

    utils = new Utils(this.state.boardState);

    reset = () => {
        let state = {...initState};
        this.setState({
            boardState: [[0, 0, 0],
                         [0, 0, 0],
                         [0, 0, 0]],
            curPlayer : 0,
            gameState: 0,
            turnCount: 0
        });
        console.log("reset")
    }

    won = (winner) => {
        alert("Player " + (winner + 1) + " Won!");
        this.reset();
    }

    draw = () => {
        alert("Draw!");
        this.reset()
    }

    clickHandler = (row, col) => {
        let newBoardState = [...this.state.boardState]
        newBoardState[row][col] = this.state.curPlayer + 1
        let newCurPlayer = (this.state.curPlayer + 1) % 2
        this.setState(
            {
                curPlayer: newCurPlayer,
                boardState: newBoardState,
                turnCount: this.state.turnCount + 1
            }
        )
        let res = this.utils.checkForWinner(this.state.boardState)
        if(res >= 0)
            this.won(res);
        else if(this.state.turnCount >= 8)
            this.draw();
    }

    render() {
        let boardElements = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(<Cell onClick={this.clickHandler} row={i} col={j} val={this.state.boardState[i][j]}/>);
            }

            boardElements.push(
                <div>{row}</div>
            )
        }

        return (
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                { boardElements}
            </div>
        )
    }
}
