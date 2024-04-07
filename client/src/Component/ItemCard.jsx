import { Checkbox, ListItem, } from '@chakra-ui/react';
import React from 'react'
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { deletebug } from '../redux/BugTracker/bug.action';

const ItemCard = ({ item, type, index, onDropPlayer }) => {
    const dispatch = useDispatch();

    const [{ isDragging }, dragRef] = useDrag({
        type: type,
        item: () => ({ ...item, index }),
        end: (item, moniter) => {
            const dropResult = moniter.getDropResult();
            if (dropResult && item) {
                onDropPlayer(item);
            }
        },
        collect: (moniter) => ({
            isDragging: moniter.isDragging()
        })
    });

    const handleChacked = (id) => {
        dispatch(deletebug(id));
    };

    return (
        <ListItem display={'flex'} gap={'2%'} bg={isDragging ? type === "player" ? 'yellow.600' : "teal.400" : 'white'} p="2" borderRadius={'md'} boxShadow={'md'} mb='2' textAlign={'center'} ref={dragRef} color={isDragging ? 'white' : 'black'}>
            <Checkbox value={item.name} onChange={() => handleChacked(item._id)} size={'md'} colorScheme='green'>{item.name}</Checkbox>
        </ListItem>
    );
}

export default ItemCard;