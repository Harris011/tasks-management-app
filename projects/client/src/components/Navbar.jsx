import React from 'react';
import {
    Box,
    Flex,
    IconButton,
    Text,
    useColorModeValue
} from '@chakra-ui/react';
import { FaRegBell } from 'react-icons/fa';
import ToggleColorMode from './ToggleColorMode';

function Navbar() {
    const backgroundColor = useColorModeValue('gray.300', 'gray.700');
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
                        gap={'5'}
                    >
                        <Flex>
                            <IconButton
                                as={FaRegBell}
                                p={'1.5'}
                                size={'sm'}
                                variant={'none'}
                                rounded={'2xl'}
                            />
                            <Flex
                               bg={'red.500'}
                               borderRadius={'50%'}
                               w={'6'}
                               h={'6'}
                               align={'center'}
                               justify={'center'}
                               ml={'-2'}
                               mt={'-0.5'}
                            >
                                <Text
                                    fontSize={'xs'}
                                    color={'white'}
                                >
                                    3
                                </Text>
                            </Flex>
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