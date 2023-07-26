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

function EditBoard() {
    const { isOpen , onOpen, onClose } = useDisclosure();

    return ( 
        <Box>
            <Button
                onClick={onOpen}
                variant={'unstyled'}
                my={'-3'}
            >
                Edit Board
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
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
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='twitter'
                            mr={'3'}
                        >
                            Save
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

export default EditBoard;