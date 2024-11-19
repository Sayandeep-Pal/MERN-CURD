import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const UpdateUser = () => {

    const URL = "https://mern-curd.vercel.app/";

    const { id } = useParams()
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {

        axios.get(`${URL}/getUser/${id}`)

            .then(res => {
                console.log(res.data)
                setName(res.data.name)
                setAge(res.data.age)
                setEmail(res.data.email)
            })
            .catch(err => console.log(err))
    },[id]);

    const Update = (e) => {
        e.preventDefault()

        axios.put(`${URL}/update/`+id, {name, age, email })
            .then(res => {
                console.log(res)
                window.location.href = '/'
            }
            )
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center aling-items-center'>
            <div className='w-50 bg-dark rounded p-3 ' style={{ margin: "170px" }}>
                <form onSubmit={Update}>
                    <h2 style={{ color: 'white' }}>Update User</h2>
                    <div className="mb-2">
                        <label style={{ color: 'white' }}>Name</label>
                        <input required type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label style={{ color: 'white' }}>Age</label>
                        <input required type="text" className="form-control" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>

                    <div className="mb-2">
                        <label style={{ color: 'white' }}>Email</label>
                        <input required type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <br />
                    <div className='d-flex justify-content-center align-items-center'>
                        <button className="btn btn-success">Update</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default UpdateUser
