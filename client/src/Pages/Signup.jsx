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
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function isValidEmail(email) {
        // Regular expression for validating email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;
        emailError.textContent = '';
        passwordError.textContent = '';

        // Email validation
        if (!isValidEmail(formData.email)) {
            isValid = false;
            emailError.textContent = 'Invalid email format.';
        };

        // Password validation
        if (formData.password.length < 8 || !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password)) {
            isValid = false;
            passwordError.textContent = 'Password must be at least 8 characters long with special character.';
        }

        if (!isValid) {
            return;
        }

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
                    setFormData({
                        email: '',
                        password: ''
                    });
                    navigate('/login');
                } else {
                    toast({
                        title: `${res.msg}`,
                        status: "error",
                        isClosable: true,
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const { email, password } = formData;
    return (
        <Box style={{ textAlign: "center" }} p='20px' display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Heading mb="10px" style={{ textAlign: "center" }}>Register</Heading>
            <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
                <Box className='input-icons'>
                    <i class="fa fa-envelope icon"></i>
                    <Input required className='input-field' w="300px" type={"email"} placeholder="Email" value={email} name="email" onChange={handleChange} />
                    <br />
                    <span id="emailError" className="error"></span>
                </Box>
                <Box className='input-icons'>
                    <i class="fa fa-key icon"></i>
                    <Input className='input-field' w="300px" type={"password"} value={password} name="password" placeholder='Password' onChange={handleChange} required />
                    <br />
                    <span id="passwordError" className="error"></span>
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