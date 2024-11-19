import axios from 'axios'
import { React, useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { MdDeleteForever,MdEdit } from "react-icons/md";
const User = () => {
    const [users, setUsers] = useState([])

    const {id} = useParams();
    useEffect(() => {
        axios.get("https://mern-curd.vercel.app")
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    })

    const handleDelete = (id) =>{
        axios.delete("https://mern-curd.vercel.app/deleteUser/"+id)
        .then(res => {
            console.log(res)
            // window.location.reload()
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='d-flex vh-100 bg-secondary justify-content-center aling-items-center'>
            <div className='w-50 bg-green rounded p-5 '>
                <Link to ='/createUser' className='btn btn-success '>Add +</Link>
                <table className='table'>
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
                                return <tr >
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to ={`/updateUser/${user._id}`} className='btn  '><MdEdit/></Link>
                                        <Link onClick={(e) => handleDelete(user._id)} className='btn  '><MdDeleteForever/></Link>
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

export default User
