import React from 'react';
import Board from './Board';
import Utils from './Utils';
import '../css/index.css';
import { Button } from 'semantic-ui-react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        const numberSquares = Math.pow(this.props.side, 2);
        this.state = {
            history: [{
                squares: Array(numberSquares).fill(null),
                pos: null,
                stepNumber: 0,
            }],
            xIsNext: true,
            stepNumber: 0,
            squaresWinner: Array(numberSquares).fill(null),
            sortList: false,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (Utils.calculateWinner(squares, this.props.side) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                pos: i,
                stepNumber: history.length,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            squaresWinner: Utils.calculateWinnerLines(squares, this.props.side),
        });
    }

    jumpTo(step) {
        const squaresWinner = Utils.calculateWinnerLines(this.state.history[step].squares, this.props.side);
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            squaresWinner: squaresWinner,
        });
    }

    sortList() {
        const sortList = !this.state.sortList;
        this.setState({ sortList: sortList });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = Utils.calculateWinner(current.squares, this.props.side);

        let moves = [];
        if (this.state.sortList) {
            for (let move = history.length - 1; move > -1; move--) {
                let step = history[move];
                const desc = move ?
                    'Go to move #' + move + ' (' + Utils.calculateColRow(step.pos, this.props.side) + ')' :
                    'Go to game start';
                moves.push(
                    <li className={step.stepNumber === this.state.stepNumber ? 'bold' : 'normal'}
                        key={move}
                    >
                        <button className={step.stepNumber === this.state.stepNumber ? 'bold' : 'normal'} onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>);
            }
        } else {
            moves = history.map((step, move) => {
                const desc = move ?
                    'Go to move #' + move + ' (' + Utils.calculateColRow(step.pos, this.props.side) + ')' :
                    'Go to game start';
                return (
                    <li className={step.stepNumber === this.state.stepNumber ? 'bold' : 'normal'}
                        key={move}
                    >
                        <button className={step.stepNumber === this.state.stepNumber ? 'bold' : 'normal'} onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            });
        }

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            if (Utils.calculateGameTied(current.squares)) {
                status = 'Game tied!';
            } else {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squaresWinner={this.state.squaresWinner}
                        side={this.props.side}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <Button toggle active={this.state.sortList} onClick={() => this.sortList()}>
                            {this.state.sortList ? 'Decrescente' : 'Crescente'}
                        </Button>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;