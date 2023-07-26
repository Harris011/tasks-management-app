import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Skeleton
} from '@chakra-ui/react';
import AddNewBoards from '../components/AddNewBoards';
import BoardsCard from '../components/BoardsCard';

function Boards() {
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
        >
            <Flex
                flexDir={'column'}
                gap={'4'}
            >
                <Flex>
                    <Skeleton
                        isLoaded={isLoaded}
                    >
                        <AddNewBoards/>
                    </Skeleton>
                </Flex>
                <Flex
                    gap={'2'}
                    flexWrap={'wrap'}
                >
                    <BoardsCard/>
                    <BoardsCard/>
                    <BoardsCard/>
                    <BoardsCard/>
                    <BoardsCard/>
                    <BoardsCard/>
                </Flex>
            </Flex>
        </Box>
     );
}

export default Boards;