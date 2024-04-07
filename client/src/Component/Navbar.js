import { Avatar, Box, Button, Center, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, useColorMode, useColorModeValue, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../Styles/Comman.css';
import { ReactNode } from 'react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import './navbar.css';


const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);


const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [email, setEmail] = useState('');

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        window.location.reload();
    };

    useEffect(() => {
        setEmail(localStorage.getItem('email'));
    }, [email]);

    return (
        <>
            <Box bg={useColorModeValue('goldenrod', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Link to="/"> <Image rounded={'full'} className='icon' w="60px" h={'60px'} objectFit={'cover'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqWn-u2P5K8zX_CDd8QoT05Wul11EkmvF99w&usqp=CAU" alt='logo' /> </Link>


                    <Link className='icon' to="/dashboard">Dashboard</Link>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Button className='icon' onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton
                                    className='icon'
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={''}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                        />
                                    </Center>
                                    <br />
                                    {email && <Center>
                                        <p>{email}</p>
                                    </Center>}
                                    <br />
                                    <MenuDivider />
                                    <MenuItem> <Link to="/dashboard" className='Link'>Dashboard</Link> </MenuItem>
                                    <MenuItem><Link to="/login" className='Link'>Login</Link></MenuItem>
                                    <MenuItem><Link to="/signup" className='Link'>New User?</Link></MenuItem>
                                    <MenuItem className='Link'><Button onClick={handleLogout} variant={"outline"} bg="black" color={"red"}>Logout</Button></MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}

export default Navbar;