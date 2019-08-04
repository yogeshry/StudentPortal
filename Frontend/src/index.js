import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker';
import gql from 'graphql-tag'
import {AUTH_TOKEN} from './constant'
// 1
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'
import { setContext } from 'apollo-link-context'



// 2
const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})
// 3
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})
let studentList = []
client.query({
    query: gql`
  {
    studentsList {
     
      id
      name
      class
      email
      phone
    }
  }
`}
).then(result => {
    studentList = result.data.studentsList;
    ReactDOM.render(
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App studentList={studentList}/>
            </ApolloProvider>
        </BrowserRouter>,
        document.getElementById('root')
    )
        serviceWorker.unregister();
});

// 4
