import React from 'react';
import './DayScedule.scss'
import DaySceduleCell from '../DaySceduleCell/DaySceduleCell';

const DayScedule = (props) => (
    <div className="day-scedule">
        {new Array(8).fill(null).map((el, idx) => (
            <DaySceduleCell hours={10 + idx} {...props} key={idx} />
        ))}
    </div>
);

export default DayScedule;