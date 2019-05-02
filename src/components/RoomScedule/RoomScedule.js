import React from 'react';
// import Calendar from 'react-calendar';
import moment from 'moment'

import './RoomScedule.scss'
import DayScedule from '../DayScedule/DayScedule';
import { withStyles, TextField, Button, Typography } from '@material-ui/core';
import Wrapper from '../../layouts/Wrapper';
// import { TimePicker, DatePicker } from 'material-ui-pickers';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
});

class RoomScedule extends React.Component {
    state = {
        date: moment().format('YYYY-MM-DD'),
        start: '09:00',
        end: '09:00'
    }

    onChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        console.log(this.state.date);
    }

    onSubmit = (e) => {
        e.preventDefault();

        let data = JSON.parse(localStorage.getItem("data")) || { items: [] };
        localStorage.removeItem("data");
        data.items.push(this.state);
        localStorage.setItem("data", JSON.stringify(data));
        console.log(data);


        this.setState({
            date: moment().format('YYYY-MM-DD'),
            start: '09:00',
            end: '09:00'
        })
    }

    render() {
        const { classes } = this.props;
        const { date, start, end } = this.state;
        const email = localStorage.getItem('email');
        
        return (
            <div>
                {/* <Calendar
                    // onChange={this.onChange}
                    value={date}
                /> */}
                <form className="roomscedule" noValidate onSubmit={this.onSubmit}>
                    <div className="picker-container">
                        <TextField
                            id="date"
                            label={(email ? "Book" : "Check") + " room for date"}
                            type="date"
                            name='date'
                            value={date}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.onChange}
                        />
                        {email && (
                            <Wrapper>
                                <TextField
                                    id="time"
                                    label="Start event"
                                    type="time"
                                    name="start"
                                    value={start}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.onChange}
                                />
                                <TextField
                                    id="time"
                                    label="End event"
                                    type="time"
                                    name='end'
                                    value={end}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.onChange}

                                />
                            </Wrapper>)
                        }
                    </div>

                    <DayScedule />

                    {email
                        ? <Button type="submit" onClick={this.onSubmit}>Book the room</Button>
                        : <Typography><Button href='/sign-in'>Login</Button> for book the room</Typography>}
                </form>
            </div>
        )
    }

}

export default withStyles(styles)(RoomScedule);