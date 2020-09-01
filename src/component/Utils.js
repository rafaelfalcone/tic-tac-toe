class Utils {

    getLinesWinner(side) {
        const lines = [];
        let index = 0;
        for (let i = 0; i < side; i++) {
            let pos = [];
            for (let j = 0; j < side; j++) {
                pos.push(index++);
            }
            lines.push(pos);
        }

        for (let i = 0; i < side; i++) {
            let pos = [];
            for (let j = 0; j < side; j++) {
                pos.push(lines[j][i]);
            }
            lines.push(pos);
        }

        let verticalPos1 = [];
        for (let i = 0; i < side; i++) {
            verticalPos1.push(lines[i][i]);
        }
        lines.push(verticalPos1);

        let verticalPos2 = [];
        for (let i = 0, j = (side - 1); i < side; i++, j--) {
            verticalPos2.push(lines[i][j]);
        }
        lines.push(verticalPos2);

        return lines;
    }

    calculateWinner(squares, side) {
        const lines = this.getLinesWinner(side);

        for (let i = 0; i < lines.length; i++) {
            let winner = true;
            let posIni = null;
            for (let j = 0; j < lines[i].length && winner; j++) {
                const pos = lines[i][j];
                if (!squares[pos]) winner = false;
                if (posIni === null) posIni = pos;
                if (j > 0 && squares[pos]) {
                    if (squares[posIni] !== squares[pos]) {
                        winner = false;
                    }
                }
            }
            if (winner) {
                return squares[posIni];
            }

        }
        return null;
    }

    calculateWinnerLines(squares, side) {
        let squaresWinner = Array(Math.pow(side, 2)).fill(null)
        
        const lines = this.getLinesWinner(side);

        for (let i = 0; i < lines.length; i++) {
            let winner = true;
            let posIni = null;
            for (let j = 0; j < lines[i].length && winner; j++) {
                const pos = lines[i][j];
                if (!squares[pos]) winner = false;
                if (posIni === null) posIni = pos;
                if (j > 0 && squares[pos]) {
                    if (squares[posIni] !== squares[pos]) {
                        winner = false;
                    }
                }
            }
            if (winner) {
                squaresWinner = lines[i];
                return squaresWinner;
            }

        }
        return squaresWinner;
    }

    calculateGameTied(squares) {
        for (let i = 0; i < squares.length; i++) {
            if (!squares[i]) {
                return false;
            }
        }
        return true;
    }

    calculateColRow(pos, side) {
        if (pos === null) return '';
        const poslines = [];
        for (let i = 1; i <= side; i++) {
            for (let j = 1; j <= side; j++) {
                poslines.push([i, j]);
            }
        }
        return poslines[pos][0] + ',' + poslines[pos][1];
    }

}

export default new Utils();