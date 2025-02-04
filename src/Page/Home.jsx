import React, { useState } from 'react'
import axios from 'axios'
import { X } from 'lucide-react'

export const Home = () => {
  const [formData, setFormData] = useState({
    images: [],
    name: '',
    price: '',
    startDate: '',
    endDate: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = e => {
    setFormData(prevState => ({
      ...prevState,
      images: [...prevState.images, ...e.target.files]
    }))
  }

  const handleRemoveImage = index => {
    const updatedImages = [...formData.images]
    const removedImage = updatedImages.splice(index, 1)[0]

    URL.revokeObjectURL(removedImage) // Release memory
    setFormData({ ...formData, images: updatedImages })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)

    const data = new FormData()
    formData.images.forEach(image => {
      data.append('imgs', image)
    })
    data.append('name', formData.name)
    data.append('price', formData.price)
    data.append('startDate', formData.startDate)
    data.append('endDate', formData.endDate)
    try {
      formData.images.forEach(image => URL.revokeObjectURL(image))
      setFormData({
        images: [],
        name: '',
        price: '',
        startDate: '',
        endDate: ''
      })
      setSuccess(null)
      const response = await axios.post(
        'https://xt-bot.onrender.com/send-to-telegram',
        data,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      )

      setSuccess(response.data.message)
    } catch (error) {
      setSuccess('Xatolik yuz berdi!')
    }

    setLoading(false)
  }

  return (
    <div className='flex items-start  justify-center container min-h-[90vh] bg-[#241b2a] text-white'>
      <div className='max-w-xs w-full px-6 text-center'>
        <h2 className='text-lg font-bold mb-4'>Botga Post Yuborish</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            type='file'
            name='images'
            onChange={handleFileChange}
            multiple
            className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none'
            required
          />
          <div className='flex flex-wrap gap-2 mt-2'>
            {formData.images.length > 0 &&
              [...formData.images].map((image, index) => (
                <div
                  key={index}
                  className='relative rounded-lg w-20 h-20 bg-cover bg-center'
                  style={{
                    backgroundImage: `url(${URL.createObjectURL(image)})`
                  }}
                >
                  <button
                    type='button'
                    onClick={() => handleRemoveImage(index)}
                    className='absolute cursor-pointer top-0 right-0 text-red-500 hover:text-black rounded-full w-5 h-5 flex items-center justify-center'
                  >
                    <X />
                  </button>
                </div>
              ))}
          </div>
          <input
            type='text'
            name='name'
            placeholder='Mahsulot nomi'
            value={formData.name}
            onChange={handleChange}
            className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none'
            required
          />
          <input
            type='text'
            name='price'
            placeholder='Narx'
            value={formData.price}
            onChange={handleChange}
            className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none'
            required
          />
          <input
            type='date'
            name='startDate'
            placeholder='Aksiya boshlanish sanasi'
            value={formData.startDate}
            onChange={handleChange}
            className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none'
            required
          />
          <input
            type='date'
            name='endDate'
            placeholder='Aksiya tugash sanasi'
            value={formData.endDate}
            onChange={handleChange}
            className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none'
            required
          />
          <button
            type='submit'
            className='p-2 border-2 border-white bg-[#241b2a] hover:bg-white hover:text-[#241b2a] transition-all duration-300'
            disabled={loading}
          >
            {loading ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>
        </form>
      </div>
    </div>
  )
}
