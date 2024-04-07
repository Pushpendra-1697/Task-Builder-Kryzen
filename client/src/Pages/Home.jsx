import { Box, Heading, Img } from '@chakra-ui/react';
import React from 'react'

const Home = () => {
  return (
    <Box textAlign={"center"} display="flex" justifyContent={"center"} alignItems="center" flexDirection={"column"} gap={'10px'}>
      <Heading mb="10px" fontSize={['23px', '25px', '28px', '30px', '33px']}>Welcome to Task Manager App</Heading>
      <Img height={"400px"} w="500px" src='https://media.istockphoto.com/id/1056305928/photo/checking-completed-tasks-on-a-list.jpg?b=1&s=170667a&w=0&k=20&c=9dTbaI6J1kizUwLgrPTDs7fpMVsxOqzBe6YKTerJxSY=' alt='bug profile' />
    </Box>
  );
}

export default Home;