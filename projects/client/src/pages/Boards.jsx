import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
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

    console.log("data from boards :", boards);

    let getAllBoards = async () => {
        try {
            let response = await axios.get(`http://localhost:8000/api/boards/boards?page=${page}&size=${size}&sortby=${sortby}&order=${order}&category=${category}`,{});
            console.log("data from getAllBoard response :", response);
            console.log("data from getAllBoard response 2:", response.data);
            console.log("data from getAllBoard response 3:", response.data.data);
            console.log("data from getAllBoard num:", response.data.datanum);
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
        console.log("Data from printAllBoards:", boards);
        return boards.map((val,idx) => {
            console.log("val from printAllBoard :", val);
            console.log("val id from printAllBoard :", val.id);
            console.log("val category from printAllBoard :", val.category);
            return (
                <div>
                    <BoardsCard
                        id={val.id}
                        category={val.category}
                        getAllBoards={getAllBoards}
                    />
                </div>
            )
        })
    }

    // console.log("printAllBoards :", printAllBoards);

    const onAddSuccess = () => {
        getAllBoards();
    }

    const paginate = pageNumbers => {
        setPage(pageNumbers)
    };

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
            h={'100vh'}
        >
            <Flex
                flexDir={'column'}
                gap={'4'}
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
                    gap={'2'}
                    flexWrap={'wrap'}
                >
                    {printAllBoards()}
                </Flex>
                <Flex
                    justifyContent={'center'}
                    mt={'2'}
                >
                    <Pagination 
                        page={page}
                        size={size}
                        totalData={totalData}
                        paginate={paginate}
                    />
                </Flex>
            </Flex>
        </Box>
     );
}

export default Boards;