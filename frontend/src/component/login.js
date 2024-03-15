import { useState } from 'react';
import { loginFields } from "../constants/formfields";
import Input from "../component/input";
import FormAction from "../component/formaction";
import FormExtra from "../component/formextra";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ip = 'http://192.168.0.110:8000/'
const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');
// console.log(fields.name);
export default function Login() {
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState(fieldsState);
    const [name, getName] = useState('');
    const [password, getPassword] = useState('');

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleUsername = (e) => {
        getName(e.target.value);
        console.log(name);
    }

    const handlePassword = (e) => {
        getPassword(e.target.value);
        console.log(password);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const authenticateUser = () => {
        console.log(loginState);
        try {
            axios.post(ip+"/usrserv/login", {
                "username": loginState.username,
                "password": loginState.password,
                "entity_id": 1,
                "encrypted_key": "ËÖÉÅØÍÊÝÅÍ"
            }).then(response => {
                {
                    if (response.data.status === 200){
                        // console.log("Hello");
                        localStorage.setItem("user_role",response.data.entity_id);
                        localStorage.setItem("token",response.data.token);
                        localStorage.setItem("State",true);
                        navigate('/validate');
                    }
                }
            })
                .catch(error => {
                    console.log("Mismatched :)");
                })
        } catch (e) {
            console.log(e.error);
        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
            </div>
            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    )
}