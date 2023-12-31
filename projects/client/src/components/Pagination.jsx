import React, { useEffect } from 'react';
import {
    Flex,
    IconButton,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
import { useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight} from 'react-icons/fa';

function Pagination(props) {
    const backgroundColor = useColorModeValue('teal.300', 'teal.700');
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        setPageNumber(props.page + 1);
    }, [props.page]);

    const buttonNext = () => {
        const maxPageNumber = Math.ceil(props.totalData / props.size);
        if (pageNumber < maxPageNumber) {
          setPageNumber(pageNumber + 1);
          props.paginate(pageNumber);
        }
      }
    
    const buttonPrevious = () => {
        if (pageNumber > 1) {
          setPageNumber(pageNumber - 1);
          props.paginate(pageNumber - 2);
        }
      }
    
    return ( 
        <Flex 
            justifyContent={'space-evenly'}
            alignItems={'center'}
            gap={'4'}
        >
            {/* BUTTON PERVIOUSE PAGE */}
            <IconButton 
                aria-label="Previous Page"
                onClick={buttonPrevious} 
                disabled={pageNumber === 1}
                icon={<FaChevronCircleLeft/>}
                color={backgroundColor}
                size={'sm'}
                fontSize={'xl'}
                p={'2'}
                bg={'transparent'}
                mr='1'
                _active={{
                    transform: 'scale(0.98)',
                    bg: 'transparent',
                    color: 'teal.700',
                }}
                _hover={{}}
            />
            {/* THE PAGE NUMBER*/}
            <Text
                py={'0.5'}
                px={'3'}
                rounded={'lg'}
                fontSize={'md'}
                border={'1px'}
                borderColor={'teal.500'}
            >
                {pageNumber}
            </Text>
            {/* BUTTON NEXT PAGE */}
            <IconButton 
                aria-label="Next Page"
                onClick={buttonNext}
                disabled={pageNumber === Math.ceil(props.totalData / props.size)}
                icon={<FaChevronCircleRight/>}
                color={backgroundColor}
                size={'sm'}
                fontSize={'xl'}
                p={'2'}
                bg={'transparent'}
                mr='1'
                _active={{
                    transform: 'scale(0.98)',
                    bg: 'transparent',
                    color: 'teal.700',
                }}
                _hover={{}}
            />
        </Flex>
     );
}

export default Pagination;