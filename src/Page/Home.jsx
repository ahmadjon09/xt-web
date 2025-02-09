import React, { useState } from 'react'
import axios from 'axios'
import { X } from 'lucide-react'

const BOT_TOKEN = '7727607417:AAGRkbmn4QcTg4HhadIDoJp0Z9LHw0Y9UmM'
const CHAT_ID = '-1002447257466'
const UNIVERSAL_STICKER =
  'CAACAgIAAxkBAAEJvq1lFhPT8XQpJf8h8ZvOKWl2jwABDW0AAmA5AAI_qDBJvH0TcaHbGmY0BA'

export const Home = () => {
  const [formData, setFormData] = useState({
    images: [],
    name: '',
    price: '',
    size: '',
    forGirls: '',
    forBoys: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const selectedSize = formData.sizeSelect || formData.size || 'Universal'

  const handleFileChange = e => {
    setFormData(prevState => ({
      ...prevState,
      images: [...prevState.images, ...e.target.files]
    }))
  }

  const handleRemoveImage = index => {
    const updatedImages = [...formData.images]
    updatedImages.splice(index, 1)
    setFormData({ ...formData, images: updatedImages })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setSuccess(null)

    try {
      const category =
        formData.forGirls || formData.forBoys
          ? formData.forGirls
            ? 'Qizlar uchun'
            : 'Bollar uchun'
          : 'Universal'

      const caption = `🥶 *${formData.name.toUpperCase()} uchun aksiya!*
      
💰 *Narxi:* ${formData.price} so‘m 😇
      
📏 *O'lcham:* ${selectedSize}
      
👕 *Kategoriya:* ${category}
      
🚚 *Dastafka:* Bor✨
      
✈️ *Yetib borish muddati:* 20 kun
      
*Shoshiling! ✅*
      
📩 Murojaat uchun: '@ProgrammWeeb_'
👤 Bosh admin: '@ItsNoWonder_'`

      if (!formData.forGirls && !formData.forBoys) {
        await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendSticker`,
          {
            chat_id: CHAT_ID,
            sticker: UNIVERSAL_STICKER
          }
        )
      }

      if (formData.images.length > 0) {
        const mediaGroup = formData.images.map((image, index) => {
          return {
            type: 'photo',
            media: `attach://file${index}`,
            ...(index === 0 && { caption, parse_mode: 'Markdown' })
          }
        })

        const formDataMedia = new FormData()
        formDataMedia.append('chat_id', CHAT_ID)
        formDataMedia.append('media', JSON.stringify(mediaGroup))
        formData.images.forEach((image, index) => {
          formDataMedia.append(`file${index}`, image)
        })

        await axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`,
          formDataMedia,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
      }

      setFormData({
        images: [],
        name: '',
        price: '',
        size: '',
        forGirls: '',
        forBoys: ''
      })
      setSuccess('Post yuborildi!')
    } catch (error) {
      setSuccess('Xatolik yuz berdi!')
    }

    setLoading(false)
  }

  return (
    <div className='flex items-start justify-center container min-h-[90vh] bg-[#241b2a] text-white'>
      <div className='max-w-xs w-full px-6 text-center'>
        <h2 className='text-lg font-bold mb-4'>Botga Post Yuborish</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input
            type='file'
            name='images'
            onChange={handleFileChange}
            multiple
            className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none'
          />
          <div className='flex flex-wrap justify-center gap-2 mt-2'>
            {formData.images.map((image, index) => (
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
          <button type='submit' className='p-2 border-2 border-white bg-[#241b2a] hover:bg-white hover:text-[#241b2a] transition-all duration-300' disabled={loading}>
            {loading ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>
        </form>
        {success && <p className='mt-4'>{success}</p>}
      </div>
    </div>
  )
}
