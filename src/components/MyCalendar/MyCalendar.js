import React from "react";
import moment from "moment";

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { Button, Typography } from "@material-ui/core";

import './MyCalendar.scss'
import Preview from "../Preview/Preview";

class Calendar extends React.Component {
  state = {
    currentMonth: moment(),
    selectedDate: moment()
  };

  onDateClick = day => {
    const { onChangeDay } = this.props;
    this.setState({
      selectedDate: day
    });
    onChangeDay(moment(day).format('YYYY-MM-DD'));
  };

  nextMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: currentMonth.add(1, 'month')
    });
  };

  prevMonth = () => {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: currentMonth.subtract(1, 'month')
    });
  };

  renderHeader() {
    const dateFormat = "MMMM YYYY";
    const { currentMonth } = this.state;

    return (
      <div className="calendar-header flexbox align-center">
        <Button onClick={this.prevMonth}>
          <ChevronLeft />
        </Button>

        <span>{moment(currentMonth).format(dateFormat)}</span>

        <Button onClick={this.nextMonth}>
          <ChevronRight />
        </Button>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "ddd";
    const days = [];
    const startDay = moment().startOf('week');

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="cell" key={i}>
          {startDay.add(1, 'day').format(dateFormat)}
        </div>
      );
    }

    return <div className="days flexbox">{days}</div>;
  }

  renderCells() {
    const {
      currentMonth,
      selectedDate
    } = this.state;
    const monthStart = currentMonth.clone().startOf('month');
    const monthEnd = currentMonth.clone().endOf('month');
    const startDate = monthStart.clone().startOf('isoWeek');
    const endDate = monthEnd.clone().endOf('isoWeek');
    const dateFormat = "DD";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format(dateFormat);
        const currentDay = moment(day)
        let cloneDay = day;

        days.push(
          <div
            className={`day ${
              !moment(cloneDay).isSame(currentMonth, 'month')
                ? "disabled"
                : moment(cloneDay).isSame(selectedDate, 'day') ? "selected" : ""
              }`
            }
            key={day}
            onClick={() => this.onDateClick(currentDay)}
          >
            <Typography>{formattedDate}</Typography>

            <Preview currentDay={currentDay} />
          </div>
        );
        day = day.add(1, 'day');
      }

      rows.push(
        <div className="week" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }
}

export default Calendar;