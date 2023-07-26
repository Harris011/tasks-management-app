import React, { useEffect, useState } from 'react';
import {
    Box,
    Tabs,
    TabList,
    Tab,
    Skeleton,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

function SecondNavbar() {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const initialActiveTab = location.pathname;
    const [activeTab] = useState(initialActiveTab);

    useEffect(() => {
        const delay = setTimeout(() => {
            setIsLoaded(true)
        }, 2000)

        return () => {
            clearTimeout(delay);
        };
    }, []);

    const activeTabIndex = activeTab === '/' ? 0 : 1;

    return ( 
        <Box>
            <Tabs 
                isFitted
                colorScheme='twitter'
                display={{base:'block', sm:'none', md:'none', lg:'none'}}
                defaultIndex={activeTabIndex}
            >
                <Skeleton 
                    isLoaded={isLoaded}
                >
                    <TabList>
                        <Tab
                            onClick={() => navigate('/')}
                        >
                            Tasks
                        </Tab>
                        <Tab
                            onClick={() => navigate('/boards')}
                        >
                            Boards
                        </Tab>
                    </TabList>
                </Skeleton>
                
            </Tabs>
        </Box>
     );
}

export default SecondNavbar;