import React from 'react';
import './DaySceduleCell.scss';

const DaySceduleCell = (props) => {
    return (
        <div className="cell">
            <div className="hours">{props.hours}</div>
            <div className="mark"></div>
        </div>
    );
}

export default DaySceduleCell;