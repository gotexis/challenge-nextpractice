import React, {useState} from 'react';
import './App.css';
import {DynamicForm} from "./components/Form";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from "@material-ui/core/Container";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const formSchema = [
  'name',
  'dob',
  'gender',
  'contact',
  'requireGuardianConsent',
  'guardianDetails',
]


const App = () => {
  const [state, setState] = useState({
    schema: formSchema,
  });

  const handleChange = name => event => {
    if (event.target.checked) {
      setState({
        schema: [...state.schema, name]
      })
    } else {
      setState({
        schema: state.schema.filter(x => x !== name)
      })
    }
  };

  return (
      <div className="App">
        <Container maxWidth="sm">
          <FormGroup row>
            {
              formSchema.map((field) =>
                  <FormControlLabel
                      key={field}
                      control={<Switch value={field} onChange={handleChange(field)} checked={state.schema.includes(field)}/>}
                      label={field}/>)
            }
          </FormGroup>
        </Container>

        <CssBaseline/>
        <Container maxWidth="sm" style={{padding: '10% 0'}}>
          <DynamicForm schema={state.schema}/>
        </Container>
      </div>
  );
};

export default App;
