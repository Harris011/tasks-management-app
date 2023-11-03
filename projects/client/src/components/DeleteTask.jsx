import React, { useRef } from 'react';
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
} from '@chakra-ui/react';

function DeleteTask() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    
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
                            Delete Task
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
                                onClick={onClose}
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

export default DeleteTask;