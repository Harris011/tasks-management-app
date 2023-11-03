import React from 'react';
import {
    Box,
    Flex,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import ToggleColorMode from './ToggleColorMode';
import Notification from './Notification';

function Navbar() {
    const backgroundColor = useColorModeValue('teal.300', 'teal.700');

    return ( 
        <Box
            bg={backgroundColor}
        >
            <Flex
                p={'2%'}
                justifyContent={'space-between'}
                alignItems={'center'}
                px={'1rem'}
            >
                <Flex>
                    <Text
                        fontSize={'lg'}
                    >
                        TaskSmith
                    </Text>
                </Flex>
                <Flex>
                    <Flex
                        alignItems={'center'}
                        gap={'3'}
                    >
                        <Flex
                            mr={'2'}
                        >
                            <Notification/>
                        </Flex>
                        <Flex>
                            <ToggleColorMode/>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
     );
}

export default Navbar;