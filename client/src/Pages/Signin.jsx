import React, { useState } from 'react';
import { AiOutlineGoogle, AiOutlineTwitter, AiFillFacebook, AiFillGithub } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { backend_url } from './BackendURL';
import { Box, Heading, Input, useToast } from '@chakra-ui/react';



const init = {
    email: '',
    password: ''
};

const Signin = () => {
    const [formData, setFormData] = useState(init);
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) => {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let { email, password } = formData;
        if (email == '' || password == '') {
            alert('Please Fill * required Field')
            return;
        };
        if (email.includes('@') === false && email !== '') {
            alert('Email not Correct Formate');
            return;
        };

        try {
            let res = await fetch(`${backend_url}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    mode: 'no-cors'
                },
                body: JSON.stringify(formData)
            });
            res = await res.json();
            if (res) {
                if (res.msg === "Invalid Credentials") {
                    toast({
                        title: `${res.msg}`,
                        status: "warning",
                        isClosable: true,
                    });
                } else if (res.msg === "Login Successfully") {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('email', formData.email);
                    toast({
                        title: `${res.msg}`,
                        status: "success",
                        isClosable: true,
                    });
                    navigate('/dashboard');
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
        <Box style={{ textAlign: 'center' }}>
            <Heading mb="10px" style={{ textAlign: "center" }}>Login For Existing Users</Heading>
            <form onSubmit={onSubmit} style={{ textAlign: "center" }}>
                <Box className='input-icons'>
                    <i class="fa fa-envelope icon"></i>
                    <Input className='input-field' w="300px" type={"email"} placeholder="Email" value={email} name="email" onChange={handleChange} />
                </Box>
                <Box className='input-icons'>
                    <i class="fa fa-key icon"></i>
                    <Input className='input-field' w="300px" type={"password"} value={password} name="password" placeholder='Password' onChange={handleChange} />
                </Box>
                <Input w="300px" style={{ backgroundColor: "blue", color: "white", border: "none", borderRadius: "10px", padding: "10px" }} type={"submit"} value="Login" />
            </form>
            <p style={{ marginTop: "14px" }}>or continue with these social profile</p>

            <Box mt="10px" display={"flex"} justifyContent="center" alignItems={"center"} id="signInDiv"></Box>

            <Box m="0px 0 8px 0" display={"flex"} justifyContent="center" alignItems={"center"} gap="5px">
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineGoogle /></a>
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillFacebook /> </a>
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiOutlineTwitter /> </a>
                <a className='social-icon' target={"_blank"} href="https://github.com/topics/bug-tracker"><AiFillGithub /></a>
            </Box>
            <p>Cerate an account? <Link style={{ textDecoration: "none", color: "green" }} to={'/signup'}>Register</Link>  </p>
        </Box>
    );
}

export default Signin;