import React, { useState } from 'react';
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
    useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import axios from 'axios';

function AddNewBoards(props) {
    const toast = useToast();
    const { isOpen , onOpen, onClose } = useDisclosure();
    const handleCloseModal = () => {
        onClose();
        setCreateBoardCategory('');
    }
    const [createBoardCategory, setCreateBoardCategory] = useState('');

    const onBtnCreateBoard = async () => {
        try {
            if (createBoardCategory == '') {
                return toast({
                    position: 'top',
                    title : 'Create new Board',
                    description: 'Please fill requierd fields',
                    status: 'warning',
                    duration: 2000,
                    isClosable: true
                })
            }
            let response = await axios.post(`http://localhost:8000/api/boards/create`, {
                category: createBoardCategory
            })
            if(response.data.success) {
                toast({
                    position: 'top',
                    title: 'Create new Board',
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
                handleCloseModal();
                props.onAddSuccess();
            } else {
                return toast({
                    position: 'top',
                    title: 'Create new Board',
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
                Add Board
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={handleCloseModal}
                size={{base:'full', lg:'md'}}
                motionPreset='scale'
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Create New Board</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody
                        pb={'6'}
                    >
                        <FormControl
                            isInvalid={createBoardCategory === ''}
                        >
                            <FormLabel>
                                Title
                            </FormLabel>
                            <Input 
                                placeholder='Enter Board Title'
                                onChange={(e) => setCreateBoardCategory(e.target.value)}
                            />
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='twitter'
                            mr={'3'}
                            onClick={onBtnCreateBoard}
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

export default AddNewBoards;