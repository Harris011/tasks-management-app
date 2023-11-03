import React, { useRef, useState } from 'react';
import {
    Box,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
    useToast,
} from '@chakra-ui/react';
import axios from 'axios';

function DeleteBoard({id, onDeleteSuccess}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const toast = useToast();

    // const [boardId, setBoardId] = useState(id);

    const onBtnDelete = async () => {
        try {
            let response = await axios.patch(`http://localhost:8000/api/boards/delete/${id}`)
            if (response.data.success === true) {
                toast({
                    position: 'top',
                    title: 'Delete Board',
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                });
                onDeleteSuccess();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Box>
            <Button
                onClick={onOpen}
                variant={'unstyled'}
                my={'-2.5'}
            >
                Delete
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isCentered={true}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader
                            fontWeight={'semibold'}
                        >
                            Delete Board
                        </AlertDialogHeader>
                        <AlertDialogCloseButton/>
                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button
                                ref={cancelRef}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme='red'
                                onClick={() => {
                                    onBtnDelete();
                                    onClose();
                                }}
                                ml={'3'}
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
     );
}

export default DeleteBoard;