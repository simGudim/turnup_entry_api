import { useState } from 'react'

const AddTask = ({onAdd}) => {
    const[username, setUsername] =useState('')
    const[password, setPassword] =useState('')
    const[email, setEmail] =useState('')
    const[user_role, setUserRole] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!username || !password || !email ) {
            alert("please add all the fields")
            return
        }
        onAdd({ username, password, email, user_role })
        setUsername('')
        setPassword('')
        setEmail('')
        setUserRole(false)
    }
    
    return (
        <form className = 'add-form' onSubmit = {onSubmit} style = {{ display: "table" }}>
            <div className='form-control' style = {{ display: "table-row" }}>
                <label>Username</label>
                <input type = 'text' placeholder = 'Add Username' value = {username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type = 'text' placeholder = 'Add Password' value  = {password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Email</label>
                <input type = 'text' placeholder = 'Add Email' value  = {email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Admin</label>
                <input 
                    type = 'checkbox' 
                    checked = {user_role}
                    value = {user_role}
                    onChange={(e) => setUserRole(e.currentTarget.checked)}
                />
            </div>
            <input type = 'submit' value = 'Save User' className = 'btn btn-block'/>
        </form>
    )
}

export default AddTask