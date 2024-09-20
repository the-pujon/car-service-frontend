import { selectCurrentUser,signOut,useCurrentToken } from '@/redux/features/auth/authSlice';
import { useAppDispatch,useAppSelector } from '@/redux/hook';
import { ReactNode } from 'react';
//import { useAppDispatch, useAppSelector } from '../../redux/hooks';
//import {
//  logout,
//  selectCurrentUser,
//  useCurrentToken,
//} from '../../redux/features/auth/authSlice';
import { Navigate } from 'react-router-dom';
//import { verifyToken } from '../../utils/verifyToken';

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
};

const ProtectedRoute = ({ children,role }: TProtectedRoute) => {
    const token = useAppSelector(useCurrentToken);


    //  if (token) {
    const user = useAppSelector(selectCurrentUser);
    //  }

    const dispatch = useAppDispatch();

    if (role !== undefined && role !== user?.role) {
        dispatch(signOut());
        return <Navigate to="/auth/signin" replace={true} />;
    }
    if (!token) {
        return <Navigate to="/auth/signin" replace={true} />;
    }

    return children;
};

export default ProtectedRoute;