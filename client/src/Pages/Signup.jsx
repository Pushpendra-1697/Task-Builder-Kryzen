import { Box, Heading, Input, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { AiOutlineGoogle, AiOutlineTwitter, AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { backend_url } from './BackendURL';


const init = {
    email: '',
    password: ''
};
const Signup = () => {
    const [formData, setFormData] = useState(init);
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        let { email, password } = formData;
        e.preventDefault();
        if (email == '' || password == '') {
            alert('Please Fill * required Field')
            return;
        };
        if (email.includes('@') === false && email !== '') {
            alert('Email not Correct Formate');
            return;
        };

        try {
            let res = await fetch(`${backend_url}/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            res = await res.json();
            if (res) {
                if (res.msg === "Registered Successfully") {
                    toast({
                        title: `${res.msg}`,
                        status: "success",
                        isClosable: true,
                    });
                    navigate('/login');
                } else if (res.msg === "Registation failed") {
                    alert(`${res.msg}`);
                }
            }

            setFormData({
                email: '',
                password: ''
            });
        } catch (err) {
            console.log(err);
        }
    };

    const { email, password } = formData;
    return (
        <Box style={{ textAlign: "center" }}>
            <Heading mb="10px" style={{ textAlign: "center" }}>Register</Heading>
            <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
                <Box className='input-icons'>
                    <i class="fa fa-envelope icon"></i>
                    <Input className='input-field' w="300px" type={"email"} placeholder="Email" value={email} name="email" onChange={handleChange} />
                </Box>
                <Box className='input-icons'>
                    <i class="fa fa-key icon"></i>
                    <Input className='input-field' w="300px" type={"password"} value={password} name="password" placeholder='Password' onChange={handleChange} required />
                </Box>
                <Input w="300px" style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "10px", padding: "10px" }} type={"submit"} value="Register" />
            </form>
            <Text mt="30px">or continue with these social profile</Text>
            <Box m="8px 0" display={"flex"} justifyContent="center" alignItems={"center"} gap="5px">
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineGoogle /></a>
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillFacebook /> </a>
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineTwitter /> </a>
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillGithub /></a>
            </Box>
            <p>Already a member? <Link style={{ textDecoration: "none", color: "green" }} to={'/login'}>Login</Link>  </p>
        </Box>
    );
}

export default Signup;