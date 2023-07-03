import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { createSpot } from '../../store/spot';
import './CreateSpot.css';

export default function CreateSpot() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("NewSpot => HandleSubmit => HIT!")

        dispatch(
            createSpot({
                country,
                address,
                city,
                state,
                description,
                title,
                price
            })
        );
        // reset();
    };

    const reset = () => {
        setCountry('');
        setAddress('');
        setCity('');
        setState('');
        setDescription('');
        setTitle('');
        setPrice(0);
    }
    return (
        <div className="create-spot create-spot-container">
            <div className="create-spot header">
                <h2>Create a new Spot</h2>
                <h4>Where's your place located?</h4>
                <p>Guest will only get your exact address once they have booked a reservation.</p>
            </div>
            <div className="create-spot form">
                <form onSubmit={handleSubmit}>
                    {/* Country */}
                    <input
                        type='text'
                        placeholder='Country'
                        name='country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />

                    {/* Street Address */}
                    <input
                        type='text'
                        placeholder='Address'
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    {/* City */}
                    <input
                        type='text'
                        placeholder='City'
                        name='city'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    {/* State */}
                    <input
                        type='text'
                        placeholder='STATE'
                        name='state'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />

                    <hr />

                    {/* Describe your place */}
                    <h4>Describe your place to guests</h4>
                    <p>mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    <textarea
                        placeholder='Please write at least 30 characters'
                        name='description'
                        rows='10'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <hr />

                    {/* Create a title */}
                    <h4>Create a title for your spot</h4>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <hr />

                    {/* Set a base price */}
                    <h4>Set a base price for your spot</h4>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                    <input
                        type='text'
                        placeholder='Price'
                        name='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <hr />

                    {/* Spot Photos */}
                    {/* <h4>Liven up your spot with photos</h4>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    /> */}

                    <hr />

                    {/* Submit Form */}
                    <button className="create-spot submit-button" type="submit">Create Spot</button>
                </form>
            </div>
            <div className="create-spot footer">
            </div>
        </div>
    );
}
