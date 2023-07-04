import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spot';
import './LandingPage.css';

export default function LandingPage(store) {
    const dispatch = useDispatch();
    const allSpots = useSelector((state) => Object.values(state.spots));

    console.log("Landing Page ALL SPOTS => ", allSpots);
    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);

    return (
        <>
            {allSpots.map(({ name, city, state, avgRating, price }) =>
                <>
                    <h1>{name}</h1>

                    <div></div>
                </>
            )}
        </>
    );
}
