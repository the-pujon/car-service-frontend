import React,{ useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

const RedirectHandler: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.toLowerCase();

        if (path.includes('success')) {
            navigate('/booking-success',{ replace: true });
        } else if (path.includes('fail') || path.includes('cancel')) {
            navigate('/booking-fail',{ replace: true });
        } else {
            navigate('/',{ replace: true });
        }
    },[navigate,location]);

    return <div>Redirecting...</div>;
};

export default RedirectHandler;