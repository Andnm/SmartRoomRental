import React from 'react'
import { iconMap } from '../../../utils/helpers'
import { FaFilter } from 'react-icons/fa6'

const VerticalFilter = (props) => {

    const { selectedFilters, setSelectedFilters } = props

    const clearFilters = () => {
        setSelectedFilters({});
        const inputs = document.querySelectorAll('.form-radio, .form-checkbox');
        inputs.forEach(input => input.checked = false);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-64 h-fit">
            <div className="flex items-center text-blue-800 mb-4 justify-between">
                <div className="flex items-center">
                    <FaFilter className="text-blue-800 mr-2" size={20} />
                    <span className="font-semibold">Lọc kết quả</span>
                </div>
                <button onClick={clearFilters} className="cursor-pointer text-red-500 text-sm font-semibold hover:underline">Xóa bộ lọc</button>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold mb-2">Diện tích</h3>
                <div className="space-y-2">
                    {['Dưới 20 m2', '20-40 m2', '40-60 m2', '60-80 m2', 'Trên 80 m2'].map((area, index) => (
                        <label key={index} className="flex items-center cursor-pointer">
                            <input type="radio" name="area" className="form-radio text-blue-600" />
                            <span className="ml-2">{area}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Tiện nghi</h3>
                <div className="space-y-2">
                    {Object.keys(iconMap.utilities).map((utility, index) => (
                        <label key={index} className="flex items-center cursor-pointer">
                            <input type="checkbox" className="form-checkbox text-blue-600" />
                            <span className="ml-2">{utility}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <h3 className="font-semibold mb-2">Môi trường xung quanh</h3>
                <div className="space-y-2">
                    {Object.keys(iconMap.environments).map((env, index) => (
                        <label key={index} className="flex items-center cursor-pointer">
                            <input type="checkbox" className="form-checkbox text-blue-600" />
                            <span className="ml-2">{env}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="font-semibold mb-2">Đối tượng</h3>
                <div className="space-y-2">
                    {Object.keys(iconMap.objects).map((obj, index) => (
                        <label key={index} className="flex items-center cursor-pointer">
                            <input type="checkbox" className="form-checkbox text-blue-600" />
                            <span className="ml-2">{obj}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VerticalFilter