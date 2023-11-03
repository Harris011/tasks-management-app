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
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';

function EditBoard({id, category, onEditSuccess}) {
    const { isOpen , onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [editCategory, setEditCategory] = useState(category);
    const [boardId, setBoardId] = useState(id);

    const handleCloseModal = () => {
        onClose();
        setEditCategory(category);
    }

    const onOpenEdit = (id, category) => {
        onOpen();
        setBoardId(id);
        setEditCategory(category);
    }

    const onBtnEdit = async() => {
        if (category == '') {
            return toast({
                position: 'top',
                title: 'Edit Board',
                description: 'Please fill requierd fields',
                status: 'warning',
                duration: 2000,
                isClosable: true
            })
        }
        try {
            let response = await axios.patch(`http://localhost:8000/api/boards/edit/${id}`,{
                category: editCategory
            })
            if (response.data.success === true) {
                toast({
                    position: 'top',
                    title: 'Edit Board',
                    description: response.data.message,
                    status:'success',
                    duration: 2000,
                    isClosable: true
                })
                handleCloseModal();
                onEditSuccess();
            } else {
                return toast({
                    position: 'top',
                    title: 'Edit Board',
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
        setBoardId(id);
    }, [id]);

    useEffect(() => {
        setEditCategory(category);
    }, [category])

    return ( 
        <Box>
            <Button
                onClick={() => {
                    onOpenEdit(
                        boardId,
                        editCategory
                    )
                }}
                variant={'unstyled'}
                my={'-3'}
            >
                Edit Board
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
                        Edit Board
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
                                onChange={(e) => setEditCategory(e.target.value)}
                                value={editCategory}
                            />
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

export default EditBoard;