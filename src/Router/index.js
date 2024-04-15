
//creating routes in this page

//also using Lazy and suspense
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from "../layout/index"
import { DEFAULT_PATH } from '../config';
import LoadingScreen from '../components/loading';
import { Suspense, lazy } from 'react';

const Loading=(Components)=>(props)=>{
    return(
        <Suspense fallback={<LoadingScreen/>}>
         {/* This line renders the Component that was passed to Loadable, along with any additional props that might have been passed to the Loadable component. */}
            <Components {...props}/>
        </Suspense>
    );
};
const Router = () => {
    return useRoutes([{
        path:'/',
        element: <DashboardLayout/>,
        children: [
            {element: <Navigate to={DEFAULT_PATH} replace/> ,index: true},
            {path: "app" , element:<General/> },
            {path: "404" , element:<Page404/> },
            {path: "*" , element:<Navigate to="/404" replace/> }
        ],
    },
        {path: "*" , element:<Navigate to="/404" replace/> },
    ]);
};

const General=Loading(lazy(()=>(
    import ('../pages/General')
)))
const Page404=Loading(lazy(()=>(
    import ('../pages/error404')
)))
export default Router;
