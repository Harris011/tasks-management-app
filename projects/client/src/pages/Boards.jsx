import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    SimpleGrid,
    Skeleton
} from '@chakra-ui/react';
import AddNewBoards from '../components/AddNewBoards';
import BoardsCard from '../components/BoardsCard';
import axios from 'axios';
import Pagination from '../components/Pagination';

function Boards() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [boards, setBoards] = useState([])
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const [sortby, setSortby] = useState('id');
    const [order, setOrder] = useState('ASC');
    const [totalData, setTotalData] = useState(0);

    let getAllBoards = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/api/boards/boards?page=${page}&size=${size}&sortby=${sortby}&order=${order}&category=${category}`,{});
            setBoards(response.data.data);
            setTotalData(response.data.datanum);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllBoards();
    }, [category, page, size, sortby, order]);

    const printAllBoards = () => {
        return boards.map((val,idx) => {
            return (
                <div>
                    <BoardsCard
                        id={val.id}
                        category={val.category}
                        tasks={val.tasks}
                        getAllBoards={getAllBoards}
                    />
                </div>
            )
        })
    }

    const onAddSuccess = () => {
        getAllBoards();
    }

    const paginate = pageNumbers => {
        setPage(pageNumbers)
    };

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
                setSize(4);
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
            mx={{base:'3', sm:'3', md:'0', lg:'0'}}
            h={'75vh'}
        >
            <Flex
                flexDir={'column'}
                gap={'2'}
                justifyContent={'space-between'}
            >
                <Flex>
                    <Skeleton
                        isLoaded={isLoaded}
                    >
                        <AddNewBoards
                            onAddSuccess={onAddSuccess}
                        />
                    </Skeleton>
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
                            columns={{base:'none', lg:'3'}}
                            rows={{base:'none', lg:'2'}}
                            gap={'2'}
                        >
                            {printAllBoards()}
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

export default Boards;