import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import * as spotActions from '../../store/spot'
import './UpdateSpot.css'

export default function UpdateSpot () {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()
  const currentSpot = useSelector(state => state.spots.singleSpot)
  const [country, setCountry] = useState(currentSpot.country)
  const [address, setAddress] = useState(currentSpot.address)
  const [city, setCity] = useState(currentSpot.city)
  const [state, setState] = useState(currentSpot.state)
  const [description, setDescription] = useState(currentSpot.descriptions)
  const [title, setTitle] = useState(currentSpot.name)
  const [price, setPrice] = useState(currentSpot.price)
  const [previewImageUrl, setPreviewImageUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(spotActions.getSpotById(spotId))
  }, [dispatch])

  const handleSubmit = e => {
    e.preventDefault()
    console.log('NewSpot => HandleSubmit => HIT!')

    const error = {}

    if (!country) error.country = 'Country is required'
    if (!address) error.address = 'Address is required'
    if (!city) error.city = 'City is required'
    if (!state) error.state = 'State is required'
    if (!description || description.length < 30)
      error.description = 'Description needs 30 or more characters'
    if (!title) error.title = 'Name is required'
    if (!price) error.price = 'Price is required'
    // if (!previewImageUrl) error.previewImageUrl = 'Preview image is required'

    // const validImgFormats = [".jpg", ".png", ".jpeg"]
    // if (!imageUrl.slice(-4).toLowerCase().some(slice => image) || !imageUrl.slice(-4).toLowerCase().includes(".jpg")) error.imageUrl = "Image URL must end in .png, .jpg, or .jpeg";

    console.log('Create new spot ERRORS => ', error)
    setErrors(error)

    if (!Object.keys(error).length) {
      // dispatch(
      //     createSpot({
      //         country,
      //         address,
      //         city,
      //         state,
      //         description,
      //         title,
      //         price
      //     })
      //     )
      console.log('UPDATE SPOT => ', {
        country,
        address,
        city,
        state,
        description,
        title,
        price
      })
    }
    reset()
  }

  const reset = () => {
    setCountry('')
    setAddress('')
    setCity('')
    setState('')
    setDescription('')
    setTitle('')
    setPrice(0)
    setPreviewImageUrl('')
    setImageUrl('')
  }
  return (
    <>
      <div className='create-spot create-spot-container'>
        <div className='create-spot header'>
          <h2>Update your Spot</h2>
          <h4>Where's your place located?</h4>
          <p>
            Guest will only get your exact address once they have booked a
            reservation.
          </p>
        </div>
        <div className='create-spot form'>
          <form onSubmit={handleSubmit}>
            {/* Country */}
            <label>
              Country{' '}
              <span className='validation-errors'>{errors.country}</span>
            </label>
            <input
              type='text'
              placeholder={currentSpot.country}
              name='country'
              value={country}
              onChange={e => setCountry(e.target.value)}
            />

            {/* Street Address */}
            <label>
              Address{' '}
              <span className='validation-errors'>{errors.address}</span>
            </label>
            <input
              type='text'
              placeholder={currentSpot.address}
              name='address'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />

            {/* City */}
            <label>
              City <span className='validation-errors'>{errors.city}</span>
            </label>
            <input
              type='text'
              placeholder={currentSpot.city}
              name='city'
              value={city}
              onChange={e => setCity(e.target.value)}
            />

            {/* State */}
            <label>
              State <span className='validation-errors'>{errors.state}</span>
            </label>
            <input
              type='text'
              placeholder={currentSpot.state}
              name='state'
              value={state}
              onChange={e => setState(e.target.value)}
            />

            <hr />

            {/* Describe your place */}
            <h4>Describe your place to guests</h4>
            <p>
              mention the best features of your space, any special amenities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
            <textarea
              placeholder={currentSpot.descriptions}
              name='description'
              rows='10'
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>
            <div>
              <span className='validation-errors'>{errors.description}</span>
            </div>

            <hr />

            {/* Create a title */}
            <h4>Create a title for your spot</h4>
            <p>
              Catch guests' attention with a spot title that highlights what
              makes your place special.
            </p>
            <input
              type='text'
              placeholder={currentSpot.name}
              name='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <div>
              <span className='validation-errors'>{errors.title}</span>
            </div>

            <hr />

            {/* Set a base price */}
            <h4>Set a base price for your spot</h4>
            <p>
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
            <input
              type='number'
              placeholder={currentSpot.price}
              name='price'
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
            <div>
              <span className='validation-errors'>{errors.price}</span>
            </div>

            <hr />

            {/* Spot Photos */}
            <h4>Liven up your spot with photos</h4>
            <p>Submit a link to at least one photo to publish your spot.</p>
            <input
              type='url'
              placeholder='Preview image URL'
              name='previewImageUrl'
              // value={
              //   currentSpot.SpotImages.find(spot => spot.preview === true).url
              // }
              onChange={e => setPreviewImageUrl(e.target.value)}
            />
            <div>
              <span className='validation-errors'>
                {errors.previewImageUrl || errors.imageUrl}
              </span>
            </div>

            <input
              type='url'
              placeholder='Image URL'
              name='imageUrl'
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
            />
            <div>
              <span className='validation-errors'>{errors.imageUrl}</span>
            </div>

            {/* <input
                     type='url'
                     placeholder='Image URL'
                     name='imageUrl'
                     value={imageUrl}
                     onChange={(e) => setImageUrl(e.target.value)}
                 />
                 <div><span className="validation-errors">{errors.imageUrl}</span></div>

                 <input
                     type='url'
                     placeholder='Image URL'
                     name='imageUrl'
                     value={imageUrl}
                     onChange={(e) => setImageUrl(e.target.value)}
                 />
                 <div><span className="validation-errors">{errors.imageUrl}</span></div>

                 <input
                     type='url'
                     placeholder='Image URL'
                     name='imageUrl'
                     value={imageUrl}
                     onChange={(e) => setImageUrl(e.target.value)}
                 />
                 <div><span className="validation-errors">{errors.imageUrl}</span></div> */}

            <hr />

            {/* Submit Form */}
            <button className='create-spot submit-button' type='submit'>
              Create Spot
            </button>
          </form>
        </div>
        <div className='create-spot footer'></div>
      </div>
    </>
  )
}
