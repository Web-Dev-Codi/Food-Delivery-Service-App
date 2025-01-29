// Define the routes in the centralised file (index.js) and import the routes in the App.jsx
// import { BrowserRouter as Router, Router, Route} from 'react-router-dom';
// import Home from './components/Home';
// import Layout from './components/Layout';
// This is just the sample code to show how i would like to define the routes as the sub-components. Many are going to be added here.
// All the routes are defined in the index.js file

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" component={<Home />} />
      </Layout>
    </Router>
  );
};

export default AppRoutes;

// Next stop App.jsx
