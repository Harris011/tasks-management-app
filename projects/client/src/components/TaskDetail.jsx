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
    ModalHeader
} from '@chakra-ui/react';

function TaskDetail({description}) {
    const { isOpen , onOpen, onClose } = useDisclosure();

    return ( 
        <Box>
            <Button
                onClick={onOpen}
                size={'sm'}
                letterSpacing={'tight'}
                variant={'outline'}
            >
                Detail
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={{base:'full', lg:'md'}}
                motionPreset='scale'
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Task Detail</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody
                        pb={'6'}
                        style={{ whiteSpace: 'pre-wrap' }}
                    >
                        {description}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </Box>
     );
}

export default TaskDetail;