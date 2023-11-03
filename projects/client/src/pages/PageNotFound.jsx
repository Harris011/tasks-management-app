import React from 'react';
import {
    Box,
    Flex,
    Text
} from '@chakra-ui/react';

function PageNotFound() {
    return ( 
        <Box>
            <Flex
                my={'14'}
                justifyContent={'center'}
            >
                <Text>
                    Page Not Found
                </Text>
            </Flex>
        </Box>
     );
}

export default PageNotFound;