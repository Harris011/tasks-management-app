import React from 'react';
import {
    Box,
    Text,
    Flex,
    Icon,
    Link,
    useColorModeValue
} from '@chakra-ui/react';
import ToggleColorMode from './ToggleColorMode';
import { BsListTask } from 'react-icons/bs';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const backgroundColor = useColorModeValue('teal.300', 'teal.700');
    const navigate = useNavigate();

    return ( 
        <Box
            p={'2'}
            py={'4'}
            px={'4'}
            h={'3000px'}
            bg={backgroundColor}
        >
            <Flex
                flexDir={'column'}
            >
                <Flex
                    justifyContent={{lg:'space-between'}}
                    alignItems={'center'}
                    gap={{base:'0', sm: '0', md:'1.5', lg: '0'}}
                >
                    <Text
                        fontSize={'lg'}
                    >
                        TaskSmith
                    </Text>
                    <ToggleColorMode/>
                </Flex>
                <Flex
                    flexDir={'column'}
                    my={'14'}
                    gap={'4'}
                >
                    <Flex
                        alignItems={'flex-end'}
                        gap={'4'}
                    >
                        <Link>
                            <Icon
                                as={BsListTask}
                                fontSize={'lg'}
                                onClick={() => navigate('/')}
                            />
                        </Link>
                        <Link
                            _hover={{textDecor: 'none'}}
                        >
                            <Text
                                fontSize={'lg'}
                                onClick={() => navigate('/')}
                            >
                                Tasks
                            </Text>
                        </Link>
                    </Flex>
                    <Flex
                        alignItems={'flex-end'}
                        gap={'4'}
                    >
                        <Link>
                            <Icon
                                as={MdOutlineDashboardCustomize}
                                fontSize={'lg'}
                                onClick={() => navigate('/boards')}
                            />
                        </Link>
                        <Link
                            _hover={{textDecor: 'none'}}
                        >
                            <Text
                                fontSize={'lg'}
                                onClick={() => navigate('/boards')}
                            >
                                Boards
                            </Text>
                        </Link>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
     );
}

export default Sidebar;