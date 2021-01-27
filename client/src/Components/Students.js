import React from 'react'
import { gql, useQuery } from '@apollo/client';


const Students = () => {

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
    const { loading, error, data } = useQuery(Get_Students);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data)

    const { students } = data;


    return (
        <div>
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
