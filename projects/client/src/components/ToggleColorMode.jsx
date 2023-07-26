import React from 'react';
import { 
    Box, 
    IconButton, 
    useColorMode
} from '@chakra-ui/react';
import {
    SunIcon, 
    MoonIcon
} from "@chakra-ui/icons";

function ToggleColorMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box>
            <IconButton
                onClick={() => toggleColorMode()}
                size={'sm'}
                variant={'outline'}
                border={'1px'}
                rounded={'2xl'}
                p={'1'}
            >
                {colorMode === 'light' ? 
                    <MoonIcon
                        color={'blue.600'}
                    /> 
                    : 
                    <SunIcon
                        color={'yellow.300'}
                    />}
            </IconButton>
        </Box>
     );
}

export default ToggleColorMode;