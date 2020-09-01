import React from 'react';
import '../css/index.css';

class Square extends React.Component {

    render() {
        let className = 'square';
        if (this.props.isSquareWinner) className = 'squarewinner';
        return (
            <button className={className} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;