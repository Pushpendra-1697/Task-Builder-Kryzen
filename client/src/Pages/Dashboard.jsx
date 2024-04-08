import { Alert, AlertIcon, Box, Button, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Avatar, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom'
import { deletebug, getBugs, updateBug } from '../redux/BugTracker/bug.action';
import { useDispatch, useSelector } from 'react-redux';
import { BiLoaderCircle } from "react-icons/bi";
import TaskList from '../Component/TaskList';
import TaskForm from '../Component/TaskForm';
import { RxCrossCircled } from "react-icons/rx";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filterAssignee, setFilterAssignee] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterFromDate, setFilterFromDate] = useState('');
  const [filterToDate, setFilterToDate] = useState('');
  const { bugs, error, loading } = useSelector((store) => store.bugManager);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    dispatch(getBugs());
  }, []);

  const sortByPriorityLTH = () => {
    const sort = 'priority';
    const order = 'asc';
    dispatch(getBugs(sort, order));
  };
  const sortByPriorityHTL = () => {
    const sort = 'priority';
    const order = 'desc';
    dispatch(getBugs(sort, order));
  };

  const deleteTask = (taskId) => {
    dispatch(deletebug(taskId));
    toast({
      title: `Task Deleted Successfully✌️`,
      status: "success",
      isClosable: true,
    });
    onClose();
  };

  const updateTask = (taskId, newStatus, newPriority) => {
    dispatch(updateBug(taskId, newStatus, newPriority));
    toast({
      title: `Task Updated Successfully✌️`,
      status: "success",
      isClosable: true,
    });
    onClose();
  };

  const handleFilter = () => {
    let filteredTasks = bugs;

    if (filterAssignee) {
      filteredTasks = filteredTasks.filter(task => task.assignee === filterAssignee);
    };
    if (filterPriority) {
      filteredTasks = filteredTasks.filter(task => task.priority === filterPriority);
    };
    if (filterFromDate && filterToDate) {
      const fromDate = new Date(filterFromDate);
      const toDate = new Date(filterToDate);
      filteredTasks = filteredTasks.filter(task => {
        const taskDate = new Date(task.startDate);
        return taskDate >= fromDate && taskDate <= toDate;
      });
    };

    return filteredTasks;
  };
  const filteredTasks = handleFilter();

  if (!localStorage.getItem('token')) {
    return (<Navigate to={'/login'} />)
  };
  if (error) {
    return (
      <Box display={"flex"} minH={'80vh'} justifyContent="center" alignItems={"center"}>
        <Alert status='error' w="300px" >
          <AlertIcon />
          {`Something went Wrong😒!! Pls Refresh...`}
        </Alert>
      </Box>
    )
  };
  return (
    <Box className="App" fontFamily={'Poppins'} minH={'100vh'} bgGradient="linear(to-r, red.100, blue.100)" display={'flex'} flexDirection={'column'} gap={'20px'} padding={'30px'}>
      {loading && (
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
          {" "}
          <BiLoaderCircle fontSize={"34px"} />{" "}
        </Box>
      )}

      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Heading size={'lg'}>Task Board</Heading>
        <Avatar
          size={'sm'}
        />
      </Box>

      <Box border={'2px solid white'} boxShadow={'md'} borderRadius={'7px'} minH={'80vh'} p={'20px'} display={'flex'} flexDirection={'column'} gap={'30px'}>
        <Box display={'flex'} flexDirection={{ base: 'column', sm: 'column', md: 'row', lg: 'row', xl: "row", "2xl": 'row' }} gap={'10px'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
            <Box display={'flex'} flexDirection={{ base: 'column', sm: "column", md: 'row', lg: 'row', xl: 'row', '2xl': 'row' }} alignItems={'center'} gap={'20px'}>
              <p>Filter By:</p>
              <Input bg={'white'} placeholder='Assignee Name' value={filterAssignee} onChange={(e) => setFilterAssignee(e.target.value)} />
              <select style={{ padding: '7px 5px', borderRadius: '5px' }} value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                <option value={''}>All Priorities</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
              <Input bg={'white'} type='date' value={filterFromDate} onChange={(e) => setFilterFromDate(e.target.value)} /> To
              <Input bg={'white'} type='date' value={filterToDate} onChange={(e) => setFilterToDate(e.target.value)} />
            </Box>
            <Box display={{ base: 'none', sm: 'none', lg: 'flex', md: 'flex', xl: 'flex', "2xl": 'flex' }} alignItems={'center'} gap={'20px'}>
              <p>Sort By:</p>
              <Button onClick={sortByPriorityLTH} variant={'outline'} colorScheme='blue'>Low To High Priority</Button>
              <Button onClick={sortByPriorityHTL} variant={'outline'} colorScheme='blue'>High To Low Priority</Button>
            </Box>
          </Box>
          <Button onClick={onOpen} bg={'blue.600'} fontSize={'15px'} color={'white'}>Add New Task</Button>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>CREATE A TASK</ModalHeader>
            <ModalCloseButton as={RxCrossCircled} background={'none'} cursor={'pointer'} size={'sm'} />
            <ModalBody display={'flex'} justifyContent={'center'} alignItems={'center'} bgGradient="linear(to-r, red.100, blue.100)">
              <TaskForm onClose={onClose} />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box overflowX={'auto'}>
          <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onUpdateTask={updateTask} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;


