import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { getCategoryLabel } from '../../../utils/common';
import { boardingCategories } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';

const HorizontalCardRoom = ({ room, is_hot }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        if (room.type === "looking_for_roommates") {
            navigate(`/looking-for-roommates/${room._id}`);
        } else {
            const categoryPath = boardingCategories.includes(room.category) ? "boarding" : "apartment-fullhouse";
            navigate(`/${categoryPath}/${room._id}`);
        }
    };

    return (
        <div className='p-2 cursor-pointer rounded-lg transition-transform transform hover:scale-105 hover:shadow-md duration-300 w-230'
            onClick={handleNavigation}
        >
            <div className="rounded-lg flex flex-row gap-4">
                <div className="relative">
                    <img
                        src={room.img_links[0]}
                        alt={room.title}
                        className="h-40 w-full object-cover rounded-t-lg"
                    />
                    {is_hot ? <span className="absolute top-3 bg-orange-600 text-white text-xs px-6 py-1 rounded-r-full font-semibold">
                        HOT
                    </span> : <span className="absolute top-3 bg-red-600 text-white text-xs px-6 py-1 rounded-r-full font-semibold">
                        VIP
                    </span>}

                </div>
                <div className="py-2">
                    <h2 className="text-sm font-semibold truncate" title={room.title}>
                        {room.title}
                    </h2>

                    <p className="text-sm mt-2 text-gray-400">Từ: <span className='font-semibold text-orange-500'>{room.price.toLocaleString()} VND</span></p>

                    <div className="flex gap-2 text-xs text-gray-700 mt-3">
                        <div className="bg-white px-2 py-1 rounded-xs font-bold">{getCategoryLabel(room.category)}</div>
                        <div className="bg-white px-2 py-1 rounded-xs font-bold">{room.area}m²</div>
                    </div>
                    <div className='flex items-center mt-1'>
                        <IoLocationSharp className="mr-1 text-gray-400" size={20} />
                        <p className="text-gray-400 text-xs truncate" title={room.address}>
                            {room.address}
                        </p>
                    </div>

                </div>
            </div>
        </div>

    );
};


export default HorizontalCardRoom