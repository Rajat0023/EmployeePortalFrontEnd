import React, { Component } from 'react';
import './Employee.css';
import { Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Modal from 'react-modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const styles = theme => ({
    table: {
        width: 1000,
        marginLeft: 100,
    },
    button: {
        width: '120px',
        marginBottom: '1px'
    },
    textField: {
        marginRight: theme.spacing(1),
        width: 340,
    },
});

class Employee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            gender: "",
            dob: "",
            department: "",
            firstnameRequired: "dispNone",
            genderRequired: "dispNone",
            dobRequired: "dispNone",
            departmentRequired: "dispNone",
            invalidSignUpContact: "dispNone",
            modalIsOpen: false,
            failedSignUp: false,
            successMessage: "",
            open: false,
            rows: [
                {
                    name: 'Rajat',
                    gender: 'male',
                    dob: '01-05-1993',
                    department: 'Holmes'

                },
                {
                    name: 'Shubham',
                    gender: 'male',
                    dob: '08-05-1994',
                    department: 'Digital'

                },
            ],
            rowsNew: []
        }
    };

    signUpClickHandler = () => {

        this.state.firstname === "" ? this.setState({ firstnameRequired: 'dispBlock', message: 'dispNone' })
            : this.setState({ firstnameRequired: 'dispNone' })

        this.state.gender === "" ? this.setState({ genderRequired: 'dispBlock', message: 'dispNone' })
            : this.setState({ genderRequired: 'dispNone' })

        this.state.dob === "" ? this.setState({ dobRequired: 'dispBlock', message: 'dispNone' })
            : this.setState({ dobRequired: 'dispNone' })

        this.state.department === "" ? this.setState({ departmentRequired: 'dispBlock', message: 'dispNone' })
            : this.setState({ departmentRequired: 'dispNone' })

        let dataSignUp = JSON.stringify({
            "firstName": this.state.firstname,
            "lastName": this.state.lastname,
            "gender": this.state.gender,
            "dateOfBirth": this.state.dob,
            "department": this.state.department
        })

        if (this.state.firstname !== "" && this.state.gender !== "" && this.state.dob !== ""
            && this.state.department !== "") {
            let xhrSignUp = new XMLHttpRequest();
            let that = this;
            xhrSignUp.addEventListener("readystatechange", function () {

                if (this.readyState === 4 && this.status === 201) {
                    console.log(this.responseText);
                    that.setState({ signUpSuccess: true })
                    that.setState({ open: true })
                    that.setState({ successMessage: "Registration Successfull!" });
                    that.setState({ modalIsOpen: false });
                }
                if (this.readyState === 4 && this.status !== 201) {
                    console.log(this.responseText);
                    that.setState({ failedSignUp: true });
                    that.setState({ errorMessage: JSON.parse(this.responseText).message })

                    if (that.state.invalidPassword === 'dispNone' && that.state.invalidSignUpContact === 'dispNone'
                        && that.state.invalidEmail === 'dispNone') {
                        that.setState({ message: 'dispBlock' })
                    }
                }

            })

            xhrSignUp.open("POST", "http://localhost:7000/" + "employee/v1/register");
            xhrSignUp.setRequestHeader("Content-Type", "application/json");
            xhrSignUp.setRequestHeader("Cache-Control", "no-cache");
            xhrSignUp.send(dataSignUp);
        }
    }


    componentWillMount() {
        this.setState({ rowsNew: this.state.rows })
        console.log(this.state.rowsNew);
    }

    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }
    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputDepartmentChangeHandler = (e) => {
        this.setState({ department: e.target.value });
    }

    genderChangeHandler = (e) => {
        this.setState({ gender: e.target.value });
    }

    dobChangeHandler = (e) => {
        this.setState({ dob: e.target.value });
    }

    openModalHandler = () => {
        this.setState({ modalIsOpen: true });
        this.setState({
            firstnameRequired: "dispNone",
            genderRequired: "dispNone",
            dobRequired: "dispNone",
            departmentRequired: "dispNone",
            failedSignUp: false,
            message: "dispNone",
            successMessage: "",
            firstname: "",
            lastname: "",
            gender: "",
            dob: "",
            department: "",
            message: "dispNone",
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    handleCloseForSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({ open: false })
      };

    render() {
        const { classes } = this.props;
        return (
            <div className='container'>
                <header className="app-header">
                    <div className="logo-container">
                        <Typography style={{ color: 'white' }} variant='h6'>
                            SocGen Employee Portal
                        </Typography>
                    </div>
                    <div className="button-container">
                        <Button
                            variant="contained"
                            color="default"
                            size="medium"
                            className={classes.button}
                            onClick={this.openModalHandler}
                            startIcon={<AccountCircleIcon />}
                        >
                            <Typography variant='h7'> Sign Up </Typography>
                        </Button>
                    </div>
                </header>
                <br />
                <br />
                <br />
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Employee Name</StyledTableCell>
                                <StyledTableCell align="right">Gender</StyledTableCell>
                                <StyledTableCell align="right">Date of Birth</StyledTableCell>
                                <StyledTableCell align="right">Department</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rowsNew.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.gender}</StyledTableCell>
                                    <StyledTableCell align="right">{row.dob}</StyledTableCell>
                                    <StyledTableCell align="right">{row.department}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Modal Part for Sign Up */}
                <Modal isOpen={this.state.modalIsOpen} contentLabel='Register Modal' ariaHideApp={false}
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}>

                    <FormControl required fullWidth='true'>
                        <InputLabel htmlFor='firstname'>First Name</InputLabel>
                        <Input id='firstname' type='text' firstname={this.state.firstname}
                            onChange={this.inputFirstNameChangeHandler} />
                        <FormHelperText className={this.state.firstnameRequired}> <span className='red'>
                            required </span>
                        </FormHelperText>
                    </FormControl> <br /> <br />
                    <FormControl fullWidth='true'>
                        <InputLabel htmlFor='lastname'>Last Name</InputLabel>
                        <Input id='lastname' type='text' lastname={this.state.lastname}
                            onChange={this.inputLastNameChangeHandler} />
                    </FormControl> <br /> <br /> <br />

                    <FormControl required component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row aria-label="position" name="position" defaultValue="start" onChange={this.genderChangeHandler}>
                            <FormControlLabel
                                value="Male"
                                control={<Radio color="primary" />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="Female"
                                control={<Radio color="primary" />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="Other"
                                control={<Radio color="primary" />}
                                label="Other"
                            />
                        </RadioGroup>
                        <FormHelperText className={this.state.genderRequired}> <span className='red'>
                            required </span>
                        </FormHelperText>
                    </FormControl> <br /> <br />

                    <FormControl required fullWidth='true'>
                        <FormLabel component="legend">Date of Birth</FormLabel>
                        <TextField
                            id="date"
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            fullWidth="true"
                            onChange={this.dobChangeHandler}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <FormHelperText className={this.state.dobRequired}> <span className='red'>
                            required </span>
                        </FormHelperText>
                    </FormControl> <br /> <br />

                    <FormControl required fullWidth='true'>
                        <InputLabel htmlFor='department'>Department</InputLabel>
                        <Input id='department' type='text' contactno={this.state.department}
                            onChange={this.inputDepartmentChangeHandler} />
                        <FormHelperText className={this.state.departmentRequired}> <span className='red'>
                            required </span>
                        </FormHelperText>
                        <br /> <br />
                        {this.state.failedSignUp === true &&
                            <FormHelperText className={this.state.message}> <span className='red'>
                                {this.state.errorMessage} </span>
                            </FormHelperText>
                        }
                    </FormControl> <br />
                    <Button variant='contained' color='primary' onClick={this.signUpClickHandler}>REGISTER</Button>
                </Modal>

                {/* SnackBar Part */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={3000}
                    onClose={this.handleCloseForSnackBar}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.successMessage}</span>}
                />
            </div>
        )
    }
}

export default withStyles(styles)(Employee);