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
import { BsThreeDots } from 'react-icons/bs';
import EditBoard from './EditBoard';
import DeleteBoard from './DeleteBoard';

function BoardsCard({category, id, tasks, getAllBoards}) {
    const [isLoaded, setIsLoaded] = useState(false);

    const onEditSuccess = () => {
        getAllBoards();
    }

    const onDeleteSuccess = () => {
        getAllBoards();
    }

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
                shadow={'md'}
                minW={{base:'308px'}}
            >
                <CardHeader
                    mb={{base:'-5', lg:'-4'}}
                    mt={{base:'-2.5', lg:'-2'}}
                >
                    <Flex
                        flexDir={'column'}
                        gap={'1.5'}
                    >
                        <Flex
                            display={'flex'}
                            justifyContent={'end'}
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
                                            <EditBoard 
                                                id={id}
                                                category={category}
                                                onEditSuccess={onEditSuccess}
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <DeleteBoard
                                                key={id}
                                                id={id}
                                                category={category}
                                                onDeleteSuccess={onDeleteSuccess}
                                            />
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </SkeletonCircle>
                        </Flex>
                        <Flex
                            flexDir={'column'}
                            mb={'-4'}
                        >
                            <Skeleton
                                isLoaded={isLoaded}
                                mb={'0.5'}
                            >
                                <Text
                                    letterSpacing={'tight'}
                                    fontSize={'md'}
                                >
                                    {tasks.length} Active Tasks
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
                            fontSize={'xl'}
                        >
                            {category}
                        </Text>
                    </Skeleton>
                </CardBody>
            </Card>
        </Box>
     );
}

export default BoardsCard;