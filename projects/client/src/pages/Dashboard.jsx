import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Skeleton,
} from '@chakra-ui/react';
import AddNewTasks from '../components/AddNewTasks';
import TasksCard from '../components/TasksCard';

function Dashboard() {
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
        <Box
            my={'6'}
            mx={{base:'3', sm:'3', md:'0', lg:'0'}}
            // h={'100vh'}
            // overflowY={'hidden'}
        >
            <Flex
                flexDir={'column'}
                gap={'2'}
                // h={'100%'}
            >
                <Flex>
                    <Skeleton
                        isLoaded={isLoaded}
                    >
                        <AddNewTasks/>
                    </Skeleton>
                </Flex>
                <Flex
                    gap={'4'}
                    flexWrap={'wrap'}
                >
                    <TasksCard/>
                    <TasksCard/>
                    <TasksCard/>
                    <TasksCard/>
                    <TasksCard/>
                    <TasksCard/>
                </Flex>
            </Flex>
        </Box>
     );
}

export default Dashboard;