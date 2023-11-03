import React, { useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardHeader,
    CardBody,
    IconButton,
    Flex,
    Text,
    Skeleton,
    SkeletonCircle,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { BsThreeDots } from 'react-icons/bs';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
import TaskDetail from './TaskDetail';

function TasksCard() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoaded(true)
        }, 2000)

        return () => {
            clearTimeout(delay);
        };
    }, []);

    return ( 
        <Box>
            <Card
                maxW={'xs'}
            >
                <CardHeader
                    mb={'-9'}
                    mt={'-3'}
                >
                    <Flex
                        flexDir={'column'}
                        gap={'1.5'}
                    >
                        <Flex
                            display={'flex'}
                            justifyContent={'space-between'}
                        >
                            <SkeletonCircle
                                isLoaded={isLoaded}
                            >
                                <Menu>
                                    <MenuButton
                                        as={'button'}
                                    >
                                        <IconButton 
                                            icon={<BsThreeDots/>}
                                            rounded={'full'}
                                            size={'sm'}
                                        />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem>
                                            <EditTask/>
                                        </MenuItem>
                                        <MenuItem>
                                            <DeleteTask/>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </SkeletonCircle>
                            <SkeletonCircle
                                isLoaded={isLoaded}
                            >
                                <IconButton 
                                    icon={<CheckIcon/>} 
                                    rounded={'full'}
                                    size={'sm'}
                                />
                            </SkeletonCircle>
                        </Flex>
                        <Flex
                            flexDir={'column'}
                        >
                            <Skeleton
                                isLoaded={isLoaded}
                                mb={'0.5'}
                            >
                                <Text
                                    letterSpacing={'tight'}
                                    fontSize={'md'}
                                >
                                    Myself 
                                </Text>
                            </Skeleton>
                            <Skeleton
                                isLoaded={isLoaded}
                                w={'60%'}
                            >
                                <Text
                                    letterSpacing={'tight'}
                                    fontSize={'xs'}
                                    color={'gray.500'}
                                >
                                    Friday, 14 July 2023
                                </Text>
                            </Skeleton>
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody
                    mb={'-3'}
                >
                    <Skeleton
                        isLoaded={isLoaded}
                    >
                        <Text
                            fontSize={'lg'}
                        >
                            Visit the museum and go to park go to market, go to press
                        </Text>
                    </Skeleton>
                    <Flex
                        justify={'end'}
                        pt={'0.5'}
                    >
                        <Skeleton
                            isLoaded={isLoaded}
                        >
                            <TaskDetail/>
                        </Skeleton>
                    </Flex>
                </CardBody>
            </Card>
        </Box>
     );
}

export default TasksCard;