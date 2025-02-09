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
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  const selectedSize = formData.sizeSelect || formData.size;

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const caption = "🥶 *${formData.name.toUpperCase()} uchun aksiya!*\n\n💰 *Narxi:* ${formData.price} so‘m 😇\n\n📏 *O'lcham:* ${selectedSize}\n\n👕 *Kategoriya:* ${formData.category}\n\n🧑‍🦰 *Kim uchun:* ${formData.gender}\n\n🚚 *Dastafka:* Bor✨\n\n✈️ *Yetib borish muddati:* 20 kun\n\n*Shoshiling! ✅*\n\n📩 Murojaat uchun: '@ProgrammWeeb_'\n👤 Bosh admin: '@ItsNoWonder_'";

      const mediaGroup = await Promise.all(
        formData.images.map(async image => {
          const formDataImage = new FormData();
          formDataImage.append('chat_id', CHAT_ID);
          formDataImage.append('photo', image);

          const { data } = await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
            formDataImage,
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );

          return {
            type: 'photo',
            media: data.result.photo[0].file_id,
            caption,
            parse_mode: 'Markdown'
          };
        })
      );

      await axios.post(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`,
        {
          chat_id: CHAT_ID,
          media: mediaGroup
        }
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
          <input type='text' name='name' placeholder='Mahsulot nomi' value={formData.name} onChange={handleChange} className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none' required />
          <input type='number' name='price' placeholder='Narx' value={formData.price} onChange={handleChange} className='p-2 bg-[#241b2a] text-white border-2 border-white focus:outline-none' required />
          <div className='flex w-auto justify-between max-w-[272px] gap-2'>
            <select name='sizeSelect' value={formData.sizeSelect} onChange={handleChange} className='p-2 w-1/2 bg-[#241b2a] text-white border-2 border-white focus:outline-none'>
              <option value=''>O‘lcham tanlang</option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
              <option value='XL'>XL</option>
              <option value='2XL'>2XL</option>
              <option value='3XL'>3XL</option>
            </select>
            <input type='number' name='size' placeholder='Oyoq kiyim razmeri' value={formData.size} onChange={handleChange} className='p-2 w-1/2 bg-[#241b2a] text-white border-2 border-white focus:outline-none' />
          </div>
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
