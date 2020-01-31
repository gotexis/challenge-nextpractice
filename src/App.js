import React from 'react';
import './App.css';
import {DynamicForm} from "./components/Form";
import Container from "@material-ui/core/Container";

const formSchema = [
  'name',
  'dob',
  'gender',
  'contact',
  'requireGuardianConsent',
  'guardianDetails',
]


const App = () => {

  return (
      <div className="App">
        <Container maxWidth="sm" style={{padding: '10% 0'}}>
          <DynamicForm schema={formSchema}/>
        </Container>
      </div>
  );
};

export default App;
