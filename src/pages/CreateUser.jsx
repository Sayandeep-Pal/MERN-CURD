import React, { useState } from 'react'
import axios from 'axios'
const CreateUser = () => {

    const[name, setName] = useState()
    const[age, setAge] = useState()
    const[email, setEmail] = useState()

    const Submit = (e) =>{
        e.preventDefault()

        axios.post("http://localhost:3000/createUser",{name,age,email})
        .then(res => {
            console.log(res)
            window.location.href = '/'
        }
        )
        .catch(err => console.log(err))
    }

    return (
            <div className='d-flex vh-100 bg-primary justify-content-center aling-items-center'>
                <div className='w-50 bg-dark rounded p-3 ' style={{margin: "170px"}}>
                    <form onSubmit={Submit}>
                        <h2 style={{color: "white"}}>Add User</h2>
                        <div className="mb-2">
                            <label style={{color: "white"}}>Name</label>
                            <input type='text' required placeholder='Enter your full Name' className='form-control'
                            onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        
                        <div className="mb-2">
                            <label style={{color: "white"}}>Age</label>
                            <input type='number' required placeholder='Enter your Age'className='form-control'
                            onChange={(e) => setAge(e.target.value)}></input>
                        </div>

                        <div className="mb-2">
                            <label style={{color: "white"}}>Email</label>
                            <input type='email' required placeholder='Enter your email'className='form-control'
                            onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <br />
                        <div className='d-flex justify-content-center aling-items-center'>
                            <button className="btn btn-success">Submit</button>
                        </div>
                        
                    </form>
                </div>
            </div>
    )
}

export default CreateUser
