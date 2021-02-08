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
mutation AddStudent($name:String!,$email:String!,$age:Int!) {
    #addStudent is the name of mutatuin
  addStudent(name:$name,email:$email,age:$age) {
    name
    email
    age
  }
}
`;

const UPDATE_STUDENT = gql`
mutation ($id: Int! ,$name: String!, $email: String! ,$age: Int!) {
  updateStudent(id: $id ,name: $name, email: $email ,age: $age) {
    name
    email    
    age
  }
}

`;

const DELETE_STUDENT = gql`
mutation($id: Int!){
    deleteStudent(id:$id)
}
`
const Students = () => {
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')
    const [toggle, setToggle] = useState(false)

    const { loading, data, refetch } = useQuery(Get_Students);

    const [addStd] = useMutation(ADD_STUDENT, {
        onCompleted: () => {
            setName('')
            setAge('')
            setEmail('')
            refetch()
        },
        onError: ({ message }) => alert(message)
    });
    const [updStd] = useMutation(UPDATE_STUDENT, {
        onCompleted: () => {
            setId('')
            setName('')
            setAge('')
            setEmail('')
            setToggle(false);
            refetch()
        },
        onError: ({ message }) => alert(message)
    });
    const [deleteStd] = useMutation(DELETE_STUDENT, {
        onCompleted: () => {
            if (id) setId(id)
            if (name) setName(name)
            if (age) setAge(age)
            if (email) setEmail(email)
            if (toggle) setToggle(false);
            refetch()
        },
        onError: ({ message }) => console.log(message)
    });

    const submitValue = (event) => {
        event.preventDefault();
        if (toggle) {
            updStd({ variables: { id: id, name: name, age: age, email: email } }).then(() => {

            }).catch((error) => console.log(error.message))
        }
        else {
            addStd({ variables: { name: name, age: age, email: email } })
                .then(() => {

                }).catch((error) => console.log(error.message))
        }
    }


    const update = (id) => {
        const a = data.students.find((student) => student.id === id);
        setId(a.id);
        setName(a.name);
        setAge(a.age);
        setEmail(a.email);
        setToggle(true)
    }

    const dlt = (id) => {
        deleteStd({ variables: { id } })
    }
    if (loading) return <p>Loading...</p>;

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
                        {data.students.map(std => {
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
