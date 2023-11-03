import './App.css';
import React, { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Headers from './components/Headers';
import Boards from './pages/Boards';
import PageNotFound from './pages/PageNotFound';
import SecondNavbar from './components/SecondNavbar';

function App() {
  return (
    <div className="App">
      <Box 
        className="mobile"
      >
        <Navbar/>
      </Box>
      <Flex
        h={'100%'}
        flexDir={{base:'column', sm:'row', md:'row', lg:'row'}}
        maxW={'100%'}
      >
        <Box 
          className="desktop"
          w={{base:null, sm:'18%', md:'18%', lg:'18%', xl:'18%'}}
        >
          <Sidebar/>
        </Box>
        <Box
          w={{base:null, sm: '82%', md:'82%', lg: '82%'}}
          px={'4'}
          h={'100vh'}
        >
          <Headers/>
          <SecondNavbar/>
          <Routes>
            <Route 
              path='/' 
              element={<Dashboard/>}
            />
            <Route path='/boards' element={<Boards/>}/>
            <Route path='*' element={<PageNotFound/>}/>
          </Routes>
        </Box>
      </Flex>
    </div>
  );
}

export default App;
