import { Navigate, Route } from 'react-router-dom';

export const PrivateRoute = props => {
    const user = null;

    if (!user) return <Navigate to="/login" />

    return <Route {...props} />
}