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
    Text
} from '@chakra-ui/react';

function TaskDetail() {
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
                    <ModalHeader>Task Title</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody
                        pb={'6'}
                    >
                        <Text>
                            1. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim nisi fugiat distinctio neque, beatae iusto omnis minus sapiente praesentium, molestias soluta temporibus sit vel facere veritatis ullam qui rem quisquam?
                        </Text>
                        <Text>
                        2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut laborum placeat itaque odit excepturi accusamus laudantium obcaecati provident, dolorem quis, consectetur, praesentium quos reiciendis voluptatem ratione similique aspernatur vero voluptatibus.
                        </Text>
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