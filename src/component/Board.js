import React from 'react';
import Square from './Square'
import '../css/index.css';

class Board extends React.Component{

    renderSquare(i) {
        const isSquareWinner = (this.props.squaresWinner.indexOf(i) > -1 ? true : false);
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                isSquareWinner={isSquareWinner}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderRow(squares, index) {
        return (
            <div key={index} className="board-row">
                {squares.map((numberSquare) =>
                    this.renderSquare(numberSquare)
                )}
            </div>
        );
    }

    render() {
        const side = this.props.side;

        let squares = [];
        let count = 0;
        for (let i = 0; i < side; i++) {
            let columns = [];
            for (let j = 0; j < side; j++) {
                columns.push(count++);
            }
            squares.push(columns);
        }

        return (
            <div>
                {squares.map((numberRow, index) =>
                    this.renderRow(numberRow, index)
                )}
            </div>
        );
    }
}

export default Board;