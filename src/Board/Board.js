import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Cell from './Cell'

export default class Board extends Component {
    state = {
        boardState: [[0, 0, 0],
                     [0, 0, 0],
                     [0, 0, 0]],
        curPlayer : 0,
        gameState: 0
    };

    allEqual = arr => arr.every( v => v === arr[0] )
    
    getColumn = (array, column) => array.map(e => e[column]);
    getDiags = (matrix) => {
        let diags = [[], []]
        let matrixLength = matrix.length;
        for (var i = 0; i < matrixLength; i++) {
            diags[0].push(matrix[i][i]);
            diags[1].push(matrix[i][matrixLength-i-1]);
        }
        console.log(diags);
        return diags;
      }
    
    checkRows = () => {
        for (let i = 0; i < this.state.boardState.length; i++) {
            const row = this.state.boardState[i]
            if(this.allEqual(row) && row[0] > 0) {
                let winner = row[0] - 1;
                return winner;
            }
        }
        return -1;
    }

    checkCols = () => {
        for (let i = 0; i < 3; i++) {
            let col = this.getColumn(this.state.boardState, i);
            if(this.allEqual(col) && col[0] > 0)
                return col[0];
        }
        return -1;
    }
   
    checkDiags = () => {
        let diags = this.getDiags(this.state.boardState);
        for (let i = 0; i < diags.length; i++) {
            const diag = diags[i];
            if(this.allEqual(diag) && diag[0] > 0)
                return diag[0];
        }
        return -1;
    }

    checkForWinner = () => {
        let res = this.checkRows();
        console.log(res);
        if(res < 0){
            res = this.checkCols();
            console.log('col', res);
        }
        if(res < 0){
            res = this.checkDiags();
            console.log('diag', res);    
        }
        return res;
    }

    won = (winner) => {
        alert("Player " + winner + " Won!");
    }

    clickHandler = (row, col) => {
        let newBoardState = [...this.state.boardState]
        newBoardState[row][col] = this.state.curPlayer + 1
        let newCurPlayer = (this.state.curPlayer + 1) % 2
        this.setState(
            {
                curPlayer: newCurPlayer,
                boardState: newBoardState
            }
        )
        let res = this.checkForWinner()
        if( res >= 0)
            this.won(res);
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

                <div>
                {this.state.boardState}
                {this.state.curPlayer}
                </div>
            </div>
        )
    }
}
