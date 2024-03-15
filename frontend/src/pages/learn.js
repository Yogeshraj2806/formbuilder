import React, { useState } from "react"

export function Learn() {
    const [name,getName] = useState('');
    const [email,getEmail] = useState('');

    const handleName = e => {
        getName(e.target.value);
        // console.log(e.target.value);
    }
    const handleEmail = (e) => {
        getEmail(e.target.value);
        // console.log(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData ={
            name:name,
            email:email
        }
        console.log(userData);
    } 
    return(
        <>
           <form onSubmit={handleSubmit}>
                <div className="mt-3">
                    <input type="text" name="name" id="name" placeholder="Enter Name" value={name} onChange={handleName} />
                </div>
                <div className="mt-3">
                    <input type="email" name="email" id="email" placeholder="Enter Email" value={email} onChange={handleEmail}/>
                </div>
                <div className="mt-3">
                    <button>click</button>
                </div>
           </form>
        </>
    )
}