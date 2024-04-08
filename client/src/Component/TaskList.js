import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure, Text, Heading, Box, Button, List } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const statusColumns = ['Pending', 'In Progress', 'Completed', 'Deployed', 'Deferred'];
    const [selectedTask, setSelectedTask] = useState(null);


    const [{ isDragging }, drag] = useDrag({
        type: 'task',
        item: { type: 'task' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    const handleUpdateTask = (taskId, newStatus) => {
        onUpdateTask(taskId, newStatus, "P0");
    };
    const moveTask = (taskId, newStatus) => {
        handleUpdateTask(taskId, newStatus);
    };
    const [{ canDrop, isOver }, drop] = useDrop({
        accept: 'task',
        drop: (item) => moveTask(item._id, 'newStatus'),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });


    function formatDate(timestamp) {
        const date = new Date(timestamp);

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
        return formattedDate;
    };

    return (
        <Box display={'grid'} gridTemplateColumns={'repeat(5,1fr)'} gap={'30px'}>
            {tasks.length > 0 && statusColumns.map((status) =>
                <List minH={'70vh'} overflow={'scroll'} key={status} display={'flex'} flexDirection={'column'} borderRadius={'7px'} boxShadow={'lg'} minW={'250px'}>
                    <Heading py={'10px'} color={'white'} background={status === "Pending" ? 'beige' : status === "In Progress" ? 'orange' : status === 'Completed' ? 'green' : status === 'Deployed' ? 'blue' : 'bisque'} fontSize={'23px'} borderTopRadius={'7px'} textAlign={'center'}>{status}</Heading>
                    <Box ref={drop} p={'10px'} display={'flex'} flexDirection={'column'} gap={'10px'} bg={isOver && canDrop ? 'lightgray' : 'white'}>
                        {tasks.filter((task) => task.status === status).map((task) =>
                            <Box opacity={isDragging ? 0.5 : 1} ref={drag} key={task._id} display={'flex'} flexDirection={'column'} gap={'10px'} background={'beige'} p={'5px'} borderRadius={'3px'} cursor={'grab'}>
                                <Box borderBottom={'1px solid black'} p={'5px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Heading as={'h3'} size={'23px'}>{task.title}</Heading>
                                    <Text background={'blue'} p={'2px 6px'} borderRadius={'2px'} color={'white'}>{task.priority}</Text>
                                </Box>
                                <Text>{task.description}</Text>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Text>@{task.assignee}</Text>
                                    <Box background={'blue'} p={'3px'} borderRadius={'2px'} color={'white'}>
                                        <BsThreeDotsVertical cursor={'pointer'} onClick={() => {
                                            setSelectedTask(task);
                                            onOpen();
                                        }} />
                                    </Box>
                                </Box>

                                <Modal isOpen={isOpen && selectedTask === task} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent background={'aliceblue'} borderRadius={'10px'} w={'200px'}>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <UpdateTask onUpdateTask={onUpdateTask} task={selectedTask} />
                                            <DeleteTask onDeleteTask={onDeleteTask} selectedTask={selectedTask} />
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>

                                <Text>Start Date: {formatDate(task.startDate)}</Text>
                                {(task.endDate && task.status === "Completed") && <Text>End Date: {formatDate(task.endDate)}</Text>}
                                <Button isDisabled bg={'blue.600'} fontSize={'15px'} color={'white'}>{task.status}</Button>
                            </Box>
                        )}
                    </Box>
                </List>
            )}
        </Box>
    );
}

export default TaskList;