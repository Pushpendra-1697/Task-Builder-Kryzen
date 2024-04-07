import { Alert, AlertIcon, Box, Button, Heading, Input, List, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import { addBug, getBugs } from '../redux/BugTracker/bug.action';
import { useDispatch, useSelector } from 'react-redux';
import { BiLoaderCircle } from "react-icons/bi";
import ItemCard from '../Component/ItemCard';
import { useDrop } from 'react-dnd';

const Dashboard = () => {
  const [name, setTaskName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [team, setTeam] = useState([]);
  const { bugs, error, loading } = useSelector((store) => store.bugManager);
  const [player, setPlayer] = useState([]);

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: 'player',
    collect: (monitor) => ({ isOver: !!monitor.isOver() })
  });
  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: 'team',
    collect: (monitor) => ({ isOver: !!monitor.isOver() })
  });

  // console.log(player)


  useEffect(() => {
    dispatch(getBugs());
  }, []);


  const handleSubmit = () => {
    dispatch(addBug({ name }));
    setTaskName('');
  };

  const movePlayerToTeam = (item) => {
    // console.log(item)
    setPlayer((prev) => prev.filter((_, i) => i !== item.index));
    setTeam((prev) => [...prev, item]);
  };
  const RemovePlayerFromTeam = (item) => {
    setTeam((prev) => prev.filter((_, i) => i !== item.index));
    setPlayer((prev) => [...prev, item]);
  };

  if (localStorage.getItem('token') === null) {
    return <Navigate to='/login' />
  };
  return (
    <>
      {loading && (
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          {" "}
          <BiLoaderCircle fontSize={"34px"} />{" "}
        </Box>
      )}
      {error && <Box display={"flex"} justifyContent="center" alignItems={"center"}>
        <Alert status='error' w="300px" >
          <AlertIcon />
          {`Something went Wrong`}
        </Alert>
      </Box>}

      <Box display={'grid'} gridTemplateColumns={["repeat(1,1fr)", "repeat(1,1fr)", "repeat(3,1fr)"]} w='90%' m='auto' gap={'2%'}>

        <Box bg='aliceblue' boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" border={'1px solid black'} >
          <Heading textAlign={'center'} padding={'3px'} bg='blackAlpha.100' fontSize={'22px'}>List 1</Heading>
          <List overflow={'scroll'} height={'500px'} ref={removeFromTeamRef} p='4' minH={'70vh'} boxShadow={'xl'} borderRadius={'md'} bgGradient={
            isPlayerOver ? 'linear(to-b, yellow.300, yellow.500)' : "linear(to-b, yellow.100, yellow.200)"
          }>
            {bugs && bugs.map((ele, index) =>
              <ItemCard key={ele._id} item={ele} type={"player"} index={index} onDropPlayer={movePlayerToTeam} />
            )}
          </List>
        </Box>


        <Box bg='aliceblue' boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" border={'1px solid black'}>
          <Heading bg='blackAlpha.100' textAlign={'center'} padding={'3px'} fontSize={'22px'}>List 2</Heading>
          <List overflow={'scroll'} height={'500px'} p='4' minH={'70vh'} boxShadow={'xl'} borderRadius={'md'} ref={addToTeamRef} bgGradient={
            isOver ? 'linear(to-b, teal.300, teal.500)' : "linear(to-b, teal.100, teal.200)"
          }>
            {team && team.map((ele, index) =>
              <ItemCard key={ele._id} item={ele} type={"team"} index={index} onDropPlayer={RemovePlayerFromTeam} />
            )}
          </List>
        </Box>


        <Box bg='aliceblue' boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px" border={'1px solid black'}>
          <Heading bg='blackAlpha.100' textAlign={'center'} padding={'3px'} fontSize={'22px'}>Create New List</Heading>
          <Text onClick={onOpen} display={'flex'} justifyContent={'center'} alignItems={'center'} fontSize={'58px'} padding={'10px'} bg='white'>+</Text>
        </Box>

      </Box>

      <Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Task Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input w='200px' placeholder='Enter Task' value={name} onChange={(e) => setTaskName(e.target.value)} type='text' />
              <Button variant={'outline'} bg='black' color={'white'} onClick={handleSubmit}>Submit</Button>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default Dashboard;


