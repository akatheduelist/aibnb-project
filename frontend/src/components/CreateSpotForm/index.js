import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as spotActions from '../../store/spot'
import './CreateSpot.css'

export default function CreateSpot () {
  const dispatch = useDispatch()
  const history = useHistory()
  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [previewImageUrl, setPreviewImageUrl] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()
    const error = {}

    if (!country) error.country = 'Country is required'
    if (!address) error.address = 'Address is required'
    if (!city) error.city = 'City is required'
    if (!state) error.state = 'State is required'
    if (!description || description.length < 30)
      error.description = 'Description needs 30 or more characters'
    if (!title) error.title = 'Name is required'
    if (!price) error.price = 'Price is required'
    if (!previewImageUrl) error.previewImageUrl = 'Preview image is required'

    // ==TODO== Check that urls have image format
    // const validImgFormats = ['.jpg', '.png', '.jpeg']
    // if (
    //   !imageUrl
    //     .slice(-4)
    //     .toLowerCase()
    //     .some(slice => image) ||
    //   !imageUrl.slice(-4).toLowerCase().includes('.jpg')
    // )
    //   error.imageUrl = 'Image URL must end in .png, .jpg, or .jpeg'

    // console.log('Create new spot ERRORS => ', error)
    // setErrors(error)

    if (!Object.keys(error).length) {
      const res = await dispatch(
        spotActions.postSpot({
          country,
          address,
          city,
          state,
          description,
          title,
          price
        })
      )
      if (!res.error) history.push(`/spots/${res.id}`)
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
    <div className='page-container-column'>
      <div className='create-spot-container'>
        <h2>Create a new Spot</h2>
        <h4>Where's your place located?</h4>
        <p>
          Guest will only get your exact address once they have booked a
          reservation.
        </p>

        <form className='create-spot-form' onSubmit={handleSubmit}>
          {/* Country */}
          <label>
            <span className='small medium'>Country</span>
            &nbsp;&nbsp;
            <span className='small medium validation-errors'>
              {errors.country}
            </span>
            <input
              type='text'
              placeholder='Country'
              name='country'
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
          </label>
          {/* Street Address */}
          <label>
            <span className='small medium'>Address</span>
            &nbsp;&nbsp;
            <span className='small medium validation-errors'>
              {errors.address}
            </span>
            <input
              type='text'
              placeholder='Address'
              name='address'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </label>
          {/* City */}
          {/* State */}
          <div className='side-by-side'>
            <label className='city'>
              <span className='small medium'>City</span>
              &nbsp;&nbsp;
              <span className='small medium validation-errors'>
                {errors.city}
              </span>
              <input
                type='text'
                placeholder='City'
                name='city'
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </label>
            <label>
              <span className='small medium'>State</span>
              &nbsp;&nbsp;
              <span className='small medium validation-errors'>
                {errors.state}
              </span>
              <input
                type='text'
                placeholder='STATE'
                name='state'
                value={state}
                onChange={e => setState(e.target.value)}
              />
            </label>
          </div>
          <hr />
          {/* Describe your place */}
          <h4>Describe your place to guests</h4>
          <p className='small medium'>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
          <textarea
            placeholder='Please write at least 30 characters'
            name='description'
            rows='10'
            value={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
          <div>
            <span className='small medium validation-errors'>
              {errors.description}
            </span>
          </div>
          <hr />
          {/* Create a title */}
          <h4>Create a title for your spot</h4>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special.
          </p>
          <input
            type='text'
            placeholder='title'
            name='title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div>
            <span className='small medium validation-errors'>
              {errors.title}
            </span>
          </div>
          <hr />
          {/* Set a base price */}
          <h4>Set a base price for your spot</h4>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results.
          </p>
          <span className='bold'>$</span>
          &nbsp;&nbsp;
          <input
            className='price'
            type='number'
            placeholder='Price per night (USD)'
            name='price'
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <div>
            <span className='small medium validation-errors'>
              {errors.price}
            </span>
          </div>
          <hr />
          {/* Spot Photos */}
          <h4>Liven up your spot with photos</h4>
          <p>Submit a link to at least one photo to publish your spot.</p>
          <input
            type='url'
            placeholder='Preview image URL'
            name='previewImageUrl'
            value={previewImageUrl}
            onChange={e => setPreviewImageUrl(e.target.value)}
          />
          <div>
            <span className='small medium validation-errors'>
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
            <span className='small medium validation-errors'>
              {errors.imageUrl}
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
            <span className='small medium validation-errors'>{errors.imageUrl}</span>
          </div>
          <input
            type='url'
            placeholder='Image URL'
            name='imageUrl'
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
          <div>
            <span className='small medium validation-errors'>{errors.imageUrl}</span>
          </div>
          <input
            type='url'
            placeholder='Image URL'
            name='imageUrl'
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
          />
          <div>
            <span className='small medium validation-errors'>{errors.imageUrl}</span>
          </div>
          <hr />
          {/* Submit Form */}
          <div className='create-spot-footer'>
            <button className='red-button-small' type='submit'>
              Create Spot
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
