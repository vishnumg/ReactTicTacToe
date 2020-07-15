
    export default class Utils {

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
        
        checkRows = (boardState) => {
            for (let i = 0; i < boardState.length; i++) {
                const row = boardState[i]
                if(this.allEqual(row) && row[0] > 0) {
                    let winner = row[0] - 1;
                    return winner;
                }
            }
            return -1;
        }

        checkCols = (boardState) => {
            for (let i = 0; i < 3; i++) {
                let col = this.getColumn(boardState, i);
                if(this.allEqual(col) && col[0] > 0)
                    return col[0];
            }
            return -1;
        }
    
        checkDiags = (boardState) => {
            let diags = this.getDiags(boardState);
            for (let i = 0; i < diags.length; i++) {
                const diag = diags[i];
                if(this.allEqual(diag) && diag[0] > 0)
                    return diag[0];
            }
            return -1;
        }

        checkForWinner = (boardState) => {
            let res = this.checkRows(boardState);
            console.log(res);
            if(res < 0){
                res = this.checkCols(boardState);
                console.log('col', res);
            }
            if(res < 0){
                res = this.checkDiags(boardState);
                console.log('diag', res);    
            }
            return res;
        }
    }