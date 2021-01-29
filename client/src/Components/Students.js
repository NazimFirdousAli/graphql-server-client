import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

const Get_Students = gql`
query {
  students{
  id
  name
  age
  email
}
}
`;
const ADD_STUDENT = gql`
#addStudent is the general name 
mutation AddStudent($name:String!,$age:Int!,$email:String!) {
    #addStudent is the name of mutatuin
  addStudent(input:{name:$name,age:$age,email:$email}) {
    name
    age
    email
  }
}
`;

const UPDATE_STUDENT = gql`
mutation ($id: ID!, $name: String!, $age: Int!, $email: String!) {
  updateStudent(id: $id, input: { name: $name, age: $age, email: $email }) {
    name
    age
    email    
  }
}

`;

const DELETE_STUDENT = gql`
mutation($id: ID!){
    deleteStudent(id:$id)
}
`
const Students = () => {


    const { loading, error, data, refetch } = useQuery(Get_Students);
    const [addStd] = useMutation(ADD_STUDENT);
    const [updStd] = useMutation(UPDATE_STUDENT);
    const [deleteStd] = useMutation(DELETE_STUDENT);


    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [toggle, setToggle] = useState(false)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data)

    const { students } = data;
    //we take addstd as variable

    const submitValue = (event) => {
        event.preventDefault();
        if (toggle) {
            refetch(updStd({ variables: { id: id, name: name, age: age, email: email } })).then(()=>{
                setId('')
                setName('')
                setAge('')
                setEmail('')
                setToggle(false)

            })
        }
        else {
            refetch(addStd({ variables: { name: name, age: age, email: email } })).then(()=>{
                setId('')
                setName('')
                setAge('')
                setEmail('')
            })
        }
    }


    const update = (id) => {
        const a = students.find((students) => students.id === id);
        setId(a.id);
        setName(a.name);
        setAge(a.age);
        setEmail(a.email);
        setToggle(true)
    }

    const dlt = (id) => {
        refetch(deleteStd({ variables: { id: id } }))
    }
    return (
        <div>
            <form onSubmit={submitValue}>
                Name: <input type="text" value={name} onChange={event => setName(event.target.value)} required /><br />
            Age:  <input type="number" value={age} onChange={event => setAge(parseInt(event.target.value))} required /><br />
            Email: <input type="email" value={email} onChange={event => setEmail(event.target.value)} required /><br />
            
                <button type="submit">{toggle ? 'UPDATE' : 'ADD'}</button>
                
            </form>

            <div>
                <h2>My Students</h2>
                <table border='2' width="500">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>AGE</th>
                            <th>EMAIL</th>

                        </tr>
                    </thead>
                    <tbody>
                        {students.map(std => {
                            return (
                                <tr key={std.id}>
                                    <td>{std.id}</td>
                                    <td>{std.name}</td>
                                    <td>{std.age}</td>
                                    <td>{std.email}</td>
                                    <td>
                                        <button onClick={() => update(std.id)}>Edit</button>
                                        <button onClick={() => dlt(std.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
export default Students;
