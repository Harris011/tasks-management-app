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
    Select,
    Textarea
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function AddNewTasks() {
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
                Add Task
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
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Date
                            </FormLabel>
                            <Input
                                type='date'
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <Textarea 
                                placeholder='Enter Description (optional)'
                            />
                        </FormControl>

                        <FormControl>
                            <FormLabel>
                                Boards
                            </FormLabel>
                            <Select
                                placeholder='Select Board'
                            >
                                <option value='option1'>Unassigned</option>
                            </Select>
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

export default AddNewTasks;