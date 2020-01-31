import React, {Fragment} from "react";
import Checkbox from '@material-ui/core/Checkbox';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import update from 'immutability-helper';
import {Select} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from "@material-ui/core/Button";
import {format} from 'date-fns'
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const contactOptions = ['mobile', 'home']

export class DynamicForm extends React.Component {

  state = {
    name: '',
    dob: this.getMaxDate(),
    gender: '',
    contact: [
      {
        type: '',
        value: ''
      }
    ],
    requireGuardianConsent: false,
    guardian: [
      {
        name: '',
        contact: '',
      }
    ],
    $internal: {
      msgOpen: false,
      msg: '',
    }
  }

  constructor(props) {
    super(props);
    this.handleDeepChange = this.handleDeepChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.addContactLine = this.addContactLine.bind(this)
    this.addGuardianLine = this.addGuardianLine.bind(this)
    this.submit = this.submit.bind(this)
  }

  /*
  * category: contact / guardian
  * objectKey: type / value / name / contact
  */
  handleDeepChange(event, i, objectKey, category) {
    const newVal = event.target.value
    const newState = update(this.state, {
      [category]: {
        [i]: {
          [objectKey]: {$set: newVal}
        }
      }
    });
    this.setState(newState);
  }

  handleChange(event, field) {
    const newVal = event.target.value
    this.setState({
      [field]: newVal
    })
  }

  handleDateChange(event, field) {
    this.setState({
      [field]: event
    })
  }

  handleCheck(event, field) {
    const newVal = event.target.checked
    this.setState({
      [field]: newVal
    })
  }

  addContactLine() {
    this.setState({
      contact: [...this.state.contact, {
        type: '',
        value: ''
      }]
    })
  }

  addGuardianLine() {
    this.setState({
      guardian: [...this.state.guardian, {
        name: '',
        contact: '',
      }]
    })
  }

  getMaxDate() {
    const d = new Date()
    d.setFullYear(d.getFullYear() - 18);
    return d
  }

  submit(e) {
    e.preventDefault()

    // prepare data
    const data = Object.fromEntries(
        Object.entries(this.state)
            .filter(([k, v]) => !['requireGuardianConsent', '$internal'].includes(k))
    )

    if (Object.keys(data).includes('dob')) {
      data.dob = format(data.dob, 'yyyy-MM-dd')
    }

    // validation
    let msg
    const nameValidator = (v) => v.trim().includes(" ")
    if (this.props.schema.includes('name') && !nameValidator(data.name)) {
      msg = 'Name validation failed! (Need to contain at least 2 words)'
    } else {
      msg = 'Successfully submitted! Check console.'
    }

    // notification
    const newState = update(this.state.$internal, {
      msgOpen: {$set: true},
      msg: {$set: msg},
    });
    this.setState(newState);

    console.log(data);
  }

  render() {
    let {schema} = this.props;

    // schema // name, dob, gender, contact, require guardian consent, guardianDetails

    return <>
      <Snackbar open={this.state.$internal.msgOpen} autoHideDuration={6000}>
        <MuiAlert elevation={6} variant="filled">
          {this.state.$internal.msg}
        </MuiAlert>
      </Snackbar>
      <form onSubmit={this.submit}>
        <FormControl>
          {
            this.props.schema.includes('name') &&
            <TextField label='name' required onChange={e => this.handleChange(e, 'name')}/>
          }
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {this.props.schema.includes('dob') && <DatePicker
                disableToolbar
                variant="inline"
                format="yyyy-MM-dd"
                maxDate={this.getMaxDate()}
                label="Date of birth"
                value={this.state.dob}
                onChange={(v) => this.handleDateChange(v, 'dob')}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
            />}
          </MuiPickersUtilsProvider>
          {this.props.schema.includes('gender') && <FormControl>
            <InputLabel>gender</InputLabel>
            <Select
                onChange={(event) =>
                    this.handleChange(event, 'gender')}>
              <MenuItem value='Male'>
                Male
              </MenuItem>
              <MenuItem value='Female'>
                Female
              </MenuItem>
              <MenuItem value='Others'>
                Others
              </MenuItem>
            </Select>
          </FormControl>}
          {this.props.schema.includes('contact') && <>
            <h3>Contact details</h3>
            <Button variant="contained" onClick={this.addContactLine}>
              Add
            </Button>
            {this.state.contact.map((field, i) =>
                <>
                  <FormControl>
                    <InputLabel>type</InputLabel>
                    <Select onChange={
                      (event) =>
                          this.handleDeepChange(event, i, 'type', 'contact')
                    }
                            value={this.state.contact[i].type}
                    >
                      {contactOptions.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}

                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField label='value' onChange={event => this.handleDeepChange(event, i, 'value', 'contact')}/>
                </>
            )}
          </>}
          {this.props.schema.includes('requireGuardianConsent') && <FormControlLabel
              control={
                <Checkbox
                    checked={this.state.requireGuardianConsent}
                    onChange={(event) => this.handleCheck(event, 'requireGuardianConsent')}
                    value="requireGuardianConsent"/>
              }
              label="Require Guardian Consent"
          />}
          {
            this.props.schema.includes('guardianDetails') && this.state.requireGuardianConsent && <>
              <h3>Guardian details</h3>
              <Button variant="contained" onClick={this.addGuardianLine}>
                Add
              </Button>
              {this.state.guardian.map((field, i) =>
                  <Fragment key={i}>
                    <TextField label='name'
                               onChange={event => this.handleDeepChange(event, i, 'name', 'guardian')}
                    />
                    <TextField label='contact'
                               onChange={event => this.handleDeepChange(event, i, 'contact', 'guardian')}
                    />
                  </Fragment>
              )}
            </>
          }
          <br/>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </>
  }
}
