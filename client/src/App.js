import { Box } from '@chakra-ui/react';
import Navbar from './Component/Navbar';
import AllRoutes from './Pages/AllRoutes';
import Footer from './Component/Footer';
function App() {
  return (
    <Box>
      <Navbar />
      <AllRoutes />
      <Footer />
    </Box>
  );
}

export default App;
