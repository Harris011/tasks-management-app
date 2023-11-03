import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Flex,
    SimpleGrid,
    Skeleton,
} from '@chakra-ui/react';
import AddNewTasks from '../components/AddNewTasks';
import TasksCard from '../components/TasksCard';
import axios from 'axios';
import Pagination from '../components/Pagination';

function Dashboard() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [task, setTask] = useState([]);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState(1);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [sortby, setSortby] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [totalData, setTotalData] = useState(0);

    let getAllTasks = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/api/tasks/tasks?page=${page}&size=${size}&sortby=${sortby}&order=${order}&title=${title}&status_id=${status}`);
            setTask(response.data.data);
            setTotalData(response.data.datanum);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllTasks();
    }, [title, status, page, size, sortby, order]);

    const printAllTasks = () => {
        return task.map((val, idx) => {
            return (
                <div>
                    <TasksCard
                        id={val.id}
                        title={val.title}
                        date={val.date}
                        description={val.description}
                        boardId={val.board.id}
                        boardCategory={val.board.category}
                        status={val.status.status}
                        getAllTasks={getAllTasks}
                    />
                </div>
            )
        })
    }

    const onAddSuccess = () => {
        getAllTasks();
    }

    const paginate = pageNumbers => {
        setPage(pageNumbers)
    }

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1200) {
                setSize(6);
            } else if (screenWidth >= 768) {
                setSize(6);
            } else if (screenWidth >= 480) {
                setSize(4); 
            } else {
                setSize(3);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoaded(true)
        }, 2000)

        return () => {
            clearTimeout(delay);
        };
    }, []);

    return ( 
        <Box
            my={'3'}
            h={'75vh'}
        >
            <Flex
                flexDir={'column'}
                gap={'2'}
            >
                <Flex
                    justifyContent={'space-between'}
                >
                    <Skeleton
                        isLoaded={isLoaded}
                    >
                        <AddNewTasks
                            onAddSuccess={onAddSuccess}
                        />
                    </Skeleton>
                    <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        gap={'0.5'}
                    >
                        <Skeleton
                            isLoaded={isLoaded}
                        >
                            <Button
                                size={'sm'}
                                letterSpacing={'tight'}
                                border={'0.5px'}
                                borderStyle={'solid'}
                                variant={'outline'}
                                onClick={() => {
                                    setStatus(1);
                                    setPage(0);
                                }}
                            >
                                Active
                            </Button>
                        </Skeleton>
                        <Skeleton
                            isLoaded={isLoaded}
                        >
                            <Button
                                size={'sm'}
                                letterSpacing={'tight'}
                                border={'0.5px'}
                                borderStyle={'solid'}
                                variant={'outline'}
                                onClick={() => {
                                    setStatus(2);
                                    setPage(0);
                                }}
                            >
                                Done
                            </Button>
                        </Skeleton>
                    </Flex>
                </Flex>
                <Flex
                    flexDir={'column'}
                    h={{base:'75vh', lg:'65vh'}}
                    justifyContent={'space-between'}
                >
                    <Flex
                        justifyContent={'center'}
                    >
                        <SimpleGrid
                            columns={{base:'0', sm:'0', md: '2', lg:'3'}}
                            rows={{base:'none', lg:'2'}}
                            gap={'2'}
                        >
                            {printAllTasks()}
                        </SimpleGrid>
                    </Flex>
                    <Flex
                        justifyContent={'center'}
                        py={'2'}
                    >
                        <Pagination
                            page={page}
                            size={size}
                            totalData={totalData}
                            paginate={paginate}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
     );
}

export default Dashboard;