
//creating routes in this page

//also using Lazy and suspense
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
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
import CreateProfile from '../pages/authenticationPages/createProfile';
import CreateProfileForm from '../sections/User/profile';
import DeleteAccount from '../sections/User/deleteAccount';
import { useSelector } from 'react-redux';
const Loading=(Components)=>(props)=>{
    
    return(
        <Suspense fallback={<LoadingScreen/>}>
         {/* This line renders the Component that was passed to Loadable, along with any additional props that might have been passed to the Loadable component. */}
            <Components {...props}/>
        </Suspense>
    );
};
const Router = () => {
    const {isLoggedIn}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
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
              { path: "create-profile", element: <CreateProfile /> },
            ],
    },
    
    {
        path:'/',
        element: isLoggedIn? <DashboardLayout /> : <Navigate to="/auth/login" replace />,
        children: [
            {element: <Navigate to={DEFAULT_PATH} replace/> ,index: true},
            {path: "app" , element:<General/> },
            {path: "profile" , element:<CreateProfileForm/> },
            {path: "delete-account" , element:<DeleteAccount/> },
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
