import React from 'react';
// import Calendar from 'react-calendar';
import moment from 'moment'

import './RoomScedule.scss'
import DayScedule from '../DayScedule/DayScedule';
import { withStyles, TextField, Button, Typography, Dialog, DialogTitle } from '@material-ui/core';
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
    margin: {
        margin: theme.spacing.unit,
    }
});

class RoomScedule extends React.Component {
    state = {
        date: moment().format('YYYY-MM-DD'),
        start: '10:00',
        end: '11:00',
        open: false,
        isBooked: false
    }

    handleOpen = () => {
        this.setState({
            open: true,
            isBooked: false
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        console.log(this.state.date);
    }

    // checkState = () => {
    //     const data = JSON.parse(localStorage.getItem("data")) || { items: [] };
    //     const { date, start } = this.state;

    //     const isBooked = data.items.some((event) => {
    //         return moment(date + 'T' + start + ':01').isBetween(event.date + 'T' + event.start, event.date + 'T' + event.end, 'second') === true;
    //     })

    //     this.setState({
    //         isBooked
    //     })
    // }

    onSubmit = (e) => {
        // const { isBooked } = this.state;
        const currentRoom = sessionStorage.getItem("currentRoom");

        e.preventDefault();

        // this.checkState();

        const data = JSON.parse(localStorage.getItem("data" + currentRoom)) || { items: [] };
        const { date, start } = this.state;

        const isBooked = data.items.some((event) => {
            return moment(date + 'T' + start + ':01').isBetween(event.date + 'T' + event.start, event.date + 'T' + event.end, 'second') === true;
        })

        // this.setState({
        //     isBooked
        // })

        console.log(isBooked);

        if (!isBooked) {
            console.log(currentRoom);

            let data = JSON.parse(localStorage.getItem("data" + currentRoom)) || { items: [] };
            localStorage.removeItem("data" + currentRoom);
            data.items.push(this.state);
            localStorage.setItem("data" + currentRoom, JSON.stringify(data));
        } else {
            this.handleOpen();
        }


        this.setState({
            date: moment().format('YYYY-MM-DD'),
            start: '10:00',
            end: '11:00'
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
                            inputProps={{ min: date }}
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
                                    inputProps={{ min: "10:00", max: "18:00", step: "1" }}
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
                                    inputProps={{ min: start, max: "18:00", step: "1" }}
                                    onChange={this.onChange}

                                />
                            </Wrapper>)
                        }
                    </div>

                    <DayScedule currentDate={this.state} />

                    {email
                        ? <Button
                            type="submit"
                            className={classes.margin}
                            color='secondary'
                            variant='contained'
                            onClick={this.onSubmit}>
                            Book the room
                            </Button>
                        : <Typography>
                            <Button
                                href='/sign-in'
                                variant='text'
                                className={classes.margin}
                                color='secondary'>
                                Login
                            </Button>
                            for book the room
                        </Typography>
                    }
                </form>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-dialog-title" >
                    <DialogTitle id="simple-dialog-title">For this time the room is booked</DialogTitle>
                </Dialog>
            </div>
        )
    }

}

export default withStyles(styles)(RoomScedule);