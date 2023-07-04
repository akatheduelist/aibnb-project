import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSpots } from '../../store/spot';
import testImg from '../../images/testspot.jpg';
import './LandingPage.css';

export default function LandingPage() {
    const dispatch = useDispatch();
    const allSpots = Object.values(
        useSelector((state) => (state.spots.allSpots ? state.spots.allSpots : []))
    );
    console.log("Landing Page ALL SPOTS => ", allSpots);

    useEffect(() => {
        dispatch(getAllSpots());
    }, [dispatch]);


    return (
        <>
            <div className="landing-page landing-page-container">
                {allSpots?.map(({ name, city, state, avgRating, price, previewImage }) =>
                    <>
                        <div className="landing-page card-container">
                            <div>
                                <img className="card-img" src={testImg} />
                            </div>
                            <div className="card-details">
                                <span>{`${city}, ${state}`}</span><span className="avg-rating">{`${avgRating}`}</span>
                            </div>
                            <div className="card-price">
                                <span>{`$${price} night`}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
