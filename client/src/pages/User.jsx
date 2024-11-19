import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdDeleteForever, MdEdit } from "react-icons/md";

const User = () => {

    const URL = "https://mern-curd.vercel.app";
    // const URL = "http://localhost:3000";

    const [users, setUsers] = useState([])

    const { id } = useParams();
    useEffect(() => {
        axios.get(`${URL}`)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    })

    const handleDelete = (id) => {
        axios.delete(`${URL}/deleteUser/${id}`)
            .then(res => {
                console.log(res)
                // window.location.reload()
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='container'>
            <div className='table-container'>
                <h1 style={{color: 'whitesmoke'}}>User Table</h1>
                <Link to='/createUser' className='btn-add'>Add +</Link>
                <table className='user-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/updateUser/${user._id}`} className='btn-edit'><MdEdit /></Link>
                                        <button onClick={() => handleDelete(user._id)} className='btn-delete'><MdDeleteForever /></button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
         </div>
    )
}

export default User;
