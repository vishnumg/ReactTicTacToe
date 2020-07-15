import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'
import Utils from './Utils';

import cloneDeep from 'lodash/cloneDeep';

const initState = {
    boardState: [[0, 0, 0],
                 [0, 0, 0],
                 [0, 0, 0]],
    curPlayer : 0,
    gameState: 0,
    turnCount: 0
};

export default class Board extends Component {

    state = cloneDeep(initState);

    utils = new Utils(this.state.boardState);

    reset = () => {
        let state = cloneDeep(initState)
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
        return (
            <div>
                <div>
                    <Cell onClick={this.clickHandler} row='0' col='0' val={this.state.boardState[0][0]}/>
                    <Cell onClick={this.clickHandler} row='0' col='1' val={this.state.boardState[0][1]}/>
                    <Cell onClick={this.clickHandler} row='0' col='2' val={this.state.boardState[0][2]}/>
                </div>
                <div>
                    <Cell onClick={this.clickHandler} row='1' col='0' val={this.state.boardState[1][0]}/>
                    <Cell onClick={this.clickHandler} row='1' col='1' val={this.state.boardState[1][1]}/>
                    <Cell onClick={this.clickHandler} row='1' col='2' val={this.state.boardState[1][2]}/>
                </div>
                <div>
                    <Cell onClick={this.clickHandler} row='2' col='0' val={this.state.boardState[2][0]}/>
                    <Cell onClick={this.clickHandler} row='2' col='1' val={this.state.boardState[2][1]}/>
                    <Cell onClick={this.clickHandler} row='2' col='2' val={this.state.boardState[2][2]}/>
                </div>
            </div>
        )
    }
}
