import React, { useEffect, useState } from 'react';
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    ModalHeader,
    FormControl,
    FormLabel,
    Input,
    Select,
    Textarea,
    useToast
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setTasksNotification } from '../Reducers/tasksNotification';

function AddNewTasks(props) {
    const toast = useToast();
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasksNotification);
    const { isOpen , onOpen, onClose } = useDisclosure();
    const handleCloseModal = () => {
        onClose();
        setTitle('');
        setDate('');
        setDescription('');
        setBoard('');
    }

    // --- ADD NEW TASK --- //

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('')
    const [board, setBoard] = useState('');

    const onBtnCreateTask = async () => {
        try {
            if (!title && !date) {
                return toast({
                    position: 'top',
                    title: 'Create new Task',
                    description: 'Please fill requierd fields',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            let response = await axios.post(`http://localhost:8000/api/tasks/create`, {
                title: title,
                date: date,
                description: description,
                boards_id: board
            })
            if (response.data.success == true) {
                toast({
                    position:'top',
                    title: 'Create new Task',
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                dispatch(setTasksNotification([...tasks, response.data.data]));
                handleCloseModal();
                props.onAddSuccess();
            } else {
                return toast({
                    position: 'top',
                    title: 'Create new Task',
                    description: response.data.message,
                    status: 'error',
                    duration: 2000,
                    isClosable: true
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // --- BOARD LIST --- //
    const [boardsList, setBoardsList] = useState([]);
    const [size] = useState(100);

    const getAllBoards = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/api/boards/boards?page&size=${size}&sortby&order&category`,{})
            setBoardsList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        getAllBoards();
    }, []);

    return ( 
        <Box>
            <Button
                leftIcon={
                    <AddIcon
                        boxSize={'4'}
                    />
                }
                iconSpacing={'2'}
                onClick={onOpen}
                size={'sm'}
                letterSpacing={'tight'}
                border={'0.5px'}
                borderStyle={'dashed'}
                variant={'outline'}
            >
                Add Task
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={handleCloseModal}
                size={{base:'full', lg:'md'}}
                motionPreset='scale'
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader
                        mt={'2'}
                    >
                        Create New Task
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody
                        pb={'6'}
                    >
                        <FormControl>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <Input 
                                placeholder='Enter Title'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Date
                            </FormLabel>
                            <Input
                                type='date'
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <Textarea 
                                placeholder='Enter Description (optional)'
                                onChange={(e) => setDescription(e.target.value)}
                                whiteSpace={'pre-wrap'}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Boards
                            </FormLabel>
                            <Select
                                placeholder='Select Board'
                                onChange={(e) => {
                                    setBoard(e.target.value);
                                }}
                            >
                                {boardsList.map((board) => {
                                    return (
                                        <option
                                            key={board.id}
                                            value={board.id}
                                        >
                                            {board?.category}
                                        </option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='twitter'
                            mr={'3'}
                            onClick={onBtnCreateTask}
                        >
                            Add
                        </Button>
                        <Button
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </Box>
     );
}

export default AddNewTasks;