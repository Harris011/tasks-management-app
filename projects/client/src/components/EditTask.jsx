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
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';

function EditTask({id, title, date, description, boardId, onEditSuccess, getIncomingTasks}) {
    const { isOpen , onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [editTitle, setEditTitle] = useState('');
    const [editDate, setEditDate] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editBoard, setEditBoard] = useState('');
    const [taskId, setTaskId] = useState(id);

    const handleCloseModal = () => {
        onClose();
        setEditTitle(title);
        setEditDate(date);
        setEditDescription(description);
        setEditBoard(boardId);
    }

    const onOpenEdit = (id, title, date, description, boardId) => {
        onOpen();
        setTaskId(id);
        setEditTitle(title);
        setEditDate(date);
        setEditDescription(description);
        setEditBoard(boardId);
    }

    const onBtnEdit = async () => {
        if (!editTitle && !editDate) {
            return toast({
                position: 'top',
                title: 'Edit Task',
                description: 'Please fill requierd fields',
                status: "warning",
                duration: 2000,
                isClosable: true
            })
        }
        const formattedEditDate = new Date(editDate).toISOString().split('T')[0];
        try {
            let response = await axios.patch(`http://localhost:8000/api/tasks/edit/${id}`, {
                title: editTitle,
                date: formattedEditDate,
                description: editDescription,
                boards_id : editBoard
            })
            if (response.data.success == true) {
                toast({
                    position:'top',
                    title: 'Edit Task',
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                getIncomingTasks();
                handleCloseModal();
                onEditSuccess();
            } else {
                return toast({
                    position: 'top',
                    title: 'Edit Task',
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

    useEffect(() => {
        setTaskId(id);
        setEditBoard(boardId)
    }, [id, boardId]);

    useEffect(() => {
        setEditTitle(title);

        const formattedDate = new Date(date).toISOString().split('T')[0];
        setEditDate(formattedDate);
        
        setEditDescription(description);
        setEditBoard(boardId);
    }, [title, date, description, boardId])
    
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
                variant={'unstyled'}
                my={'-3'}
                onClick={() => {
                    onOpenEdit(
                        taskId,
                        editTitle,
                        editDate,
                        editDescription,
                        editBoard
                    )
                }}
            >
                Edit Task
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
                        Edit Task
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
                                onChange={(e) => setEditTitle(e.target.value)}
                                value={editTitle}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Date
                            </FormLabel>
                            <Input
                                type='date'
                                onChange={(e) => setEditDate(e.target.value)}
                                value={editDate}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <Textarea 
                                placeholder='Enter Description (optional)'
                                onChange={(e) => setEditDescription(e.target.value)}
                                value={editDescription}
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Boards
                            </FormLabel>
                            <Select
                                placeholder='Select Board'
                                onChange={(e) => setEditBoard(e.target.value)}
                                value={editBoard}
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
                            onClick={onBtnEdit}
                        >
                            Save
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

export default EditTask;