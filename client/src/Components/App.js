import { ApolloProvider } from '@apollo/client';
import React from 'react';
import './App.css';
import client from '../config/gql-config'
import Students from './Students.js';



function App() {
  
  return (
  <div className="App">
    <ApolloProvider client={client}>
      <div>
        <h2>My first Apollo app 🚀</h2>
        <Students />
      </div>
    </ApolloProvider>
  </div>
  );
}

export default App;
