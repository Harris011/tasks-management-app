import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    ModalHeader,
    IconButton,
    Flex,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { FaRegBell } from 'react-icons/fa';
import axios from 'axios';
import { setTasksNotification } from '../Reducers/tasksNotification';

function Notification() {
    const backgroundColor = useColorModeValue('teal.300', 'teal.700');
    const {isOpen, onOpen, onClose} = useDisclosure();
    const tasks = useSelector(state => state.tasksNotification);
    const dispatch = useDispatch();
    const sortby = 'date';
    const order = 'ASC';

    let getIncomingTasks = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/api/tasks/notification?sortby=${sortby}&order=${order}`);
            if (response.data.data && response.data.data.length > 0) {
                dispatch(setTasksNotification(response.data.data));
            } else {
                dispatch(setTasksNotification([]));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getIncomingTasks();
    }, [sortby, order]);

    const printIncominTasks = () => {
        if (tasks.length === 0) {
            return (
                <Text 
                    fontSize="sm"
                    textAlign={'center'}
                >
                    No incoming tasks.
                </Text>
            );
        }
        return tasks.map((task, idx) => {
            const formattedDate = new Date(task.date).toLocaleDateString('en-US', {
                year: '2-digit',
                month: 'short',
                day: 'numeric'
            })
            return (
                <Flex 
                    key={idx} 
                    alignItems="center" 
                    justifyContent="space-between"
                    px={'1.5'}
                >
                    <Text>{task.title}</Text>
                    <Text>{formattedDate}</Text>
                </Flex>
            )
        });
    }
    

    return ( 
        <Box>
            <Flex
                position="relative"
            >
                <IconButton
                    onClick={onOpen}
                    size={'sm'}
                    variant={'unstyled'}
                    icon={<FaRegBell size={'20px'}/>}
                />
                <>
                    {tasks.length > 0 && (
                        <Flex
                            bg={'red.500'}
                            borderRadius={'50%'}
                            w={'6'}
                            h={'6'}
                            align={'center'}
                            justify={'center'}
                            position="absolute"
                            top="-1"
                            right="-2.5"
                        >
                            <Text
                                fontSize={'xs'}
                                color={'white'}
                            >
                                {tasks.length}
                            </Text>
                        </Flex>
                    )}
                </>
            </Flex>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={{base:'full', lg:'md'}}
                motionPreset='scale'
            >
                <ModalOverlay/>
                <ModalContent>
                    <Box
                        bg={backgroundColor}
                        borderTopRadius={{lg:'md'}}
                    >
                        <ModalHeader>
                            Incoming Tasks :
                        </ModalHeader>
                        <ModalCloseButton/>
                    </Box>
                    <ModalBody>
                        {printIncominTasks()}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
     );
}

export default Notification;