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
    useToast,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { BsThreeDots } from 'react-icons/bs';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
import TaskDetail from './TaskDetail';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setTasksNotification } from '../Reducers/tasksNotification';

function TasksCard({id, title, date, description, boardId, boardCategory, status, getAllTasks}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const toast = useToast();
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasksNotification);
    const sortby = 'date';
    const order = 'ASC';

    let getIncomingTasks = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/api/tasks/notification?sortby=${sortby}&order=${order}`);
            if (response.data.data && response.data.data.length > 0) {
                dispatch(setTasksNotification(response.data.data));
            } else {
                dispatch(setTasksNotification([]));
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getIncomingTasks();
    }, [sortby, order]);

    const onBtnUpdate = async () => {
        try {
            let response = await axios.patch(`http://localhost:8000/api/tasks/update/${id}`);
            if (response.data.success === true) {
                toast({
                    position:'top',
                    title: 'Update Task',
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
            } else {
                toast({
                    position:'top',
                    title: 'Update Task',
                    description: response.data.message,
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
            }
            getAllTasks();
            getIncomingTasks();
        } catch (error) {
            console.log(error);
        }
    }

    const onEditSuccess = () => {
        getAllTasks();
        getIncomingTasks();
    }

    const onDeleteSuccess = () => {
        getAllTasks();
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
                minW={{base:'327px', lg: '312px'}}
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
                                            <EditTask
                                                id={id}
                                                title={title}
                                                date={date}
                                                description={description}
                                                boardId={boardId}
                                                boardCategory={boardCategory}
                                                onEditSuccess={onEditSuccess}
                                                getIncomingTasks={getIncomingTasks}
                                            />
                                        </MenuItem>
                                        <MenuItem>
                                            <DeleteTask
                                                key={id}
                                                id={id}
                                                onDeleteSuccess={onDeleteSuccess}
                                            />
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </SkeletonCircle>
                            <SkeletonCircle
                                isLoaded={isLoaded}
                            >
                                {status === 'active' ? (
                                    <IconButton 
                                    icon={<CheckIcon/>} 
                                    rounded={'full'}
                                    size={'sm'}
                                    onClick={onBtnUpdate}
                                />    
                                ) : (
                                    <IconButton 
                                        icon={<CloseIcon/>} 
                                        rounded={'full'}
                                        size={'sm'}
                                        onClick={onBtnUpdate}
                                    />
                                ) }
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
                                    {boardCategory}
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
                                    {date}
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
                            {title}
                        </Text>
                    </Skeleton>
                    <Flex
                        justify={'end'}
                        pt={'0.5'}
                    >
                        <Skeleton
                            isLoaded={isLoaded}
                        >
                            <TaskDetail 
                                description={description}
                            />
                        </Skeleton>
                    </Flex>
                </CardBody>
            </Card>
        </Box>
     );
}

export default TasksCard;