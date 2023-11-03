import React from 'react';
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
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function AddNewBoards() {
    const { isOpen , onOpen, onClose } = useDisclosure();
    
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
            >
                Add Board
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
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
                        <FormControl>
                            <FormLabel>
                                Title
                            </FormLabel>
                            <Input 
                                placeholder='Enter Board Title' 
                            />
                        </FormControl>

                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='twitter'
                            mr={'3'}
                        >
                            Add
                        </Button>
                        <Button
                            onClick={onClose}
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