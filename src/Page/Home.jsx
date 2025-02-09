import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const BOT_TOKEN = '7727607417:AAGRkbmn4QcTg4HhadIDoJp0Z9LHw0Y9UmM';
const CHAT_ID = '-1002447257466';

export const Home = () => {
  const [formData, setFormData] = useState({
    images: [],
    name: '',
    price: '',
    size: '',
    sizeSelect: '',
    category: '',
    gender: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setFormData(prevState => ({
      ...prevState,
      images: [...prevState.images, ...e.target.files]
    }));
  };

  const handleRemoveImage = index => {
    setFormData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index)
    }));
  };

  const selectedSize = formData.sizeSelect || formData.size;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const caption = `🥶 *${formData.name.toUpperCase()} uchun aksiya!*\n\n💰 *Narxi:* ${formData.price} so‘m 😇\n\n📏 *O'lcham:* ${selectedSize}\n\n👕 *Kategoriya:* ${formData.category}\n\n🧑‍🦰 *Kim uchun:* ${formData.gender}\n\n🚚 *Dastafka:* Bor✨\n\n✈️ *Yetib borish muddati:* 20 kun\n\n*Shoshiling! ✅*\n\n📩 Murojaat uchun: \n'@ProgrammWeeb_'\n👤 Bosh admin: \n'@ItsNoWonder_'`;

      const mediaGroup = formData.images.map((_, index) => ({
        type: 'photo',
        media: `attach://photo${index}`
      }));

      const formDataImage = new FormData();
      formData.images.forEach((image, index) => {
        formDataImage.append(`photo${index}`, image);
      });
      formDataImage.append('chat_id', CHAT_ID);
      formDataImage.append('media', JSON.stringify(mediaGroup));

      await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`,
        formDataImage,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setFormData({ images: [], name: '', price: '', size: '', sizeSelect: '', category: '', gender: '' });
      setSuccess('Post yuborildi!');
    } catch (error) {
      setSuccess('Xatolik yuz berdi!');
    }

    setLoading(false);
  };

  return (
    <div className='flex items-start justify-center container min-h-[90vh] bg-[#241b2a] text-white'>
      <div className='max-w-xs w-full px-6 text-center'>
        <h2 className='text-lg font-bold mb-4'>Botga Post Yuborish</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <input type='file' name='images' onChange={handleFileChange} multiple className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none' />
          <div className='flex flex-wrap justify-center gap-2 mt-2'>
            {formData.images.map((image, index) => (
              <div
                key={index}
                className='relative rounded-lg w-20 h-20 bg-cover bg-center'
                style={{ backgroundImage: `url(${URL.createObjectURL(image)})` }}
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
          <input type='text' name='name' placeholder='Mahsulot nomi' value={formData.name} onChange={handleChange} className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none' required />
          <input type='number' name='price' placeholder='Narx' value={formData.price} onChange={handleChange} className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none' required />
          <select name='sizeSelect' value={formData.sizeSelect} onChange={handleChange} className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none'>
            <option value=''>O‘lcham tanlang</option>
            <option value='S'>S</option>
            <option value='M'>M</option>
            <option value='L'>L</option>
            <option value='XL'>XL</option>
            <option value='2XL'>2XL</option>
            <option value='3XL'>3XL</option>
          </select>
          <select name='gender' value={formData.gender} onChange={handleChange} className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none'>
            <option value=''>Kim uchun?</option>
            <option value='Qizlar uchun'>Qizlar uchun</option>
            <option value='Bollar uchun'>Bollar uchun</option>
          </select>
          <button type='submit' className='p-2 border-2 border-white bg-[#241b2a] hover:bg-white hover:text-[#241b2a] transition-all duration-300' disabled={loading}>
            {loading ? 'Yuborilmoqda...' : 'Yuborish'}
          </button>
        </form>
        {success && <p className='mt-4'>{success}</p>}
      </div>
    </div>
  );
};
