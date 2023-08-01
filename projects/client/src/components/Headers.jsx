import React, { useEffect, useState } from 'react';
import {
    Box,
    Text,
    Flex,
    Skeleton
} from '@chakra-ui/react';

function Headers() {
    const [greeting, setGreeting] = useState('');
    const [day, setDay] = useState('');
    const [date, setDate] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const updateCurrentTime = () => {
          const currentHour = new Date().getHours();
          const currentMinute = new Date().getMinutes();
          const currentTime = currentHour + currentMinute / 60;
      
          if (currentTime >= 5 && currentTime <= 11) {
            setGreeting('Morning');
          } else if (currentTime > 11 && currentTime < 17) {
            if (currentHour === 11 && currentMinute === 0) {
                setGreeting('Morning')
            } else {
                setGreeting('Afternoon');
            }
          } else {
            setGreeting('Evening');
          }
        };
        const interval = setInterval(updateCurrentTime, 2000);

        setDay(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
        setDate(new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }));

        const delay = setTimeout(() => {
            setIsLoaded(true)
        }, 2000);

        return () => {
            clearTimeout(delay);
            clearInterval(interval);
          };
      }, []);

    return (
        <Box
            mt={'0.5rem'}
        >
            <Flex
                flexDir={{base:'column', sm:'row', md:'row', lg:'row'}}
                gap={'2'}
                alignItems={{base:'end', sm:'start', md:'start', lg:'start'}}
            >
                <Skeleton 
                    isLoaded={isLoaded}
                >
                    <Text
                        fontSize={'5xl'}
                        mb={'-1.5rem'}
                    >
                        Good
                    </Text>
                </Skeleton>
                <Skeleton
                    isLoaded={isLoaded}
                >
                    <Text
                        fontSize={'5xl'}
                    >
                        {greeting}
                    </Text>
                </Skeleton>
            </Flex>
            <Flex
                flexDir={'column'}
                my={'0.5rem'}
            >
                <Skeleton
                    isLoaded={isLoaded}
                    w={{base:'35%',lg:'15%'}}
                >
                    <Text
                        fontSize={'lg'}
                        mb={'-0.5'}
                    >
                        Today's {day}
                    </Text>
                    <Text
                        color={'gray.500'}
                    >
                        {date}
                    </Text>
                </Skeleton>
            </Flex>
        </Box>
    );
}

export default Headers;