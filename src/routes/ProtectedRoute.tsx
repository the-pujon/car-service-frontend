import { selectCurrentUser,signOut,useCurrentToken } from '@/redux/features/auth/authSlice';
import { useAppDispatch,useAppSelector } from '@/redux/hook';
import { isTokenExpired } from '@/utils/isTokenExpired';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
};

const ProtectedRoute = ({ children,role }: TProtectedRoute) => {
    const token = useAppSelector(useCurrentToken);
    const expiredToken = isTokenExpired(token);

    const user = useAppSelector(selectCurrentUser);

    const dispatch = useAppDispatch();

    if (expiredToken) {
        dispatch(signOut());
        return <Navigate to="/auth/signin" replace={true} />;
    }

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