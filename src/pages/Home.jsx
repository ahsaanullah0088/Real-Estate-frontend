import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

// 🖼️ Banner Images
import abdulrehman9 from '../images/abdulrehman9.jpg';
import abdulrehman14 from '../images/abdulrehman14.jpg';
import abdulrehman11 from '../images/abdulrehman11.jpg';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  const bannerImages = [abdulrehman9, abdulrehman14, abdulrehman11];

  return (
    <div className='w-full'>

      {/* 🧭 Heading Section */}
      <div className='flex flex-col gap-6 px-3 pt-28 pb-0 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          GharBazaar is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* 🎯 Image Carousel */}
      <div className='w-full mb-20 mt-6'>
        <Swiper navigation loop={true}>
          {bannerImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className='w-full h-[70vh] object-cover transition-all duration-1000 ease-in-out mb-10'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🔄 Swiper Offer Background (optional) */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* 📦 Listings Section */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {/* 🎁 Offers */}
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                Show more offers
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {/* 🏘️ Rent + Sale Combined */}
        <div className='p-3 w-full'>
          <div className='my-3 flex flex-col items-center justify-center text-center'>
            <h1 className='text-2xl font-semibold text-slate-600'>Recent places</h1>
            <Link className='text-sm text-blue-800 hover:underline' to={'/search'}>
              Show more places
            </Link>
          </div>

          <div className='flex flex-wrap gap-4 justify-center'>
            {rentListings &&
              rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            {saleListings &&
              saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
