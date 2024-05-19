
//creating routes in this page

//also using Lazy and suspense
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from "../layout/index"
import AuthLayout from '../layout/Auth';
import { DEFAULT_PATH, AUTH_DEFAULT } from '../config';
import LoadingScreen from '../components/reusable/loading';
import { Suspense, lazy } from 'react';
import LoginPage from '../pages/authenticationPages/loginPage';
import RegisterPage from '../pages/authenticationPages/registerPage';
import ResetPassword from '../pages/authenticationPages/resetPasswordPage';
import NewPasswordPage from '../pages/authenticationPages/newPasswordPage';
import VerifyOTPPage from '../pages/authenticationPages/verifyOTPPage';
const Loading=(Components)=>(props)=>{
    return(
        <Suspense fallback={<LoadingScreen/>}>
         {/* This line renders the Component that was passed to Loadable, along with any additional props that might have been passed to the Loadable component. */}
            <Components {...props}/>
        </Suspense>
    );
};
const Router = () => {
    return useRoutes([
    {
            path: "/auth",
            element: <AuthLayout />,
            children: [
              { element: <Navigate to={AUTH_DEFAULT} replace /> },
              { path: "login", element: <LoginPage /> },
              { path: "register", element: <RegisterPage /> },
              { path: "reset-password", element: <ResetPassword /> },
              { path: "new-password", element: <NewPasswordPage /> },
              { path: "verify", element: <VerifyOTPPage /> },
            ],
    },
    
    {
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
