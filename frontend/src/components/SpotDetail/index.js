import { useParams } from "react-router-dom";
import { getSpotById } from "../../store/spot";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SpotDetail() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spotById = (
        useSelector((state) => state.spots.singleSpot)
    );

    useEffect(() => {
        dispatch(getSpotById(spotId));
    }, [dispatch]);

    const {name, city, state, country, ownerId, Owner} = spotById;

    console.log("DETAILS PAGE => CURRENT SPOT => ", name);
    return (
        <>
            <div className="spot-detail spot-detail-container">
                <div className="spot-header">
                    <h3 className="spot-name">{name}</h3>
                    <span className="spot-location">{`${city}, ${state}, ${country}`}</span>
                </div>
                <div className="image-gallery">
                    <img src="/" />
                    <img src="/" />
                    <img src="/" />
                    <img src="/" />
                    <img src="/" />
                </div>
                <div className="spot-description">
                    <h3>{`Hosted By ${Owner.firstName} ${Owner.lastName}`}</h3>
                </div>
            </div>
        </>
    );
}
