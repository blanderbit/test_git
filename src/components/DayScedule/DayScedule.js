import React from 'react';
import './DayScedule.scss'
import DaySceduleCell from './DaySceduleCell/DaySceduleCell';

const DayScedule = () => (
    <div className="day-scedule">
        <DaySceduleCell hours='09:00-10:00' />
        <DaySceduleCell hours='10:00-11:00' />
        <DaySceduleCell hours='11:00-12:00' />
        <DaySceduleCell hours='12:00-13:00' />
        <DaySceduleCell hours='13:00-14:00' />
    </div>
);

export default DayScedule;