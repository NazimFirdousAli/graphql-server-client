import React ,{useState} from 'react'
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
mutation UpdateStudent($id: ID!, $name: String!, $age: Int!, $email: String!) {
  updateStudent(id: $id, input: { name: $name, age: $age, email: $email }) {
    name
    age
    email
    
  }
}

`;
const Students = () => {
    
    
    const { loading, error, data } = useQuery(Get_Students);
    const [addStd] = useMutation(ADD_STUDENT);
    const [updStd] = useMutation(UPDATE_STUDENT);
    
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data)

    const { students } = data;
    //we take addstd as variable

    const submitValue = (event) => {
        event.preventDefault();
        alert(`Submitting  ${name} `)
        addStd({ variables: { name:name,age:age,email:email } });
    }
    // const viewUpdateData = () => {
    //     if(std.id === )
    // }

    return (
        <div>
            <form onSubmit={submitValue}>
            Name: <input type="text" value={name} onChange={event=>setName(event.target.value)} required /><br />
            Age:  <input type="number" value={age}  onChange={event=>setAge(parseInt(event.target.value) )} required/><br />
            Email: <input type="email" value={email}  onChange={event=>setEmail(event.target.value)} required/><br />
            
            <button type="submit">Add User</button>
            </form>
            <button onClick={()=> updStd({variables:{id:"1",name:"khan",age:1,email:"email@gmail.com"}})}>Update</button>
            
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
                                    <button>Edit</button>
                                    <button>Update</button>
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
