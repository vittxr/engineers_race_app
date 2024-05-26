const SelectSkeleton = () => {
    return (
        <select className="block w-full px-3 py-2 placeholder-gray-400 bg-gray-300 border-2 border-gray-300 rounded shadow-sm animate-pulse focus:outline-none focus:ring-primary focus:border-primary sm:text-sm ">
        <option disabled>Carregando...</option>
        </select>
    );
};

export default SelectSkeleton;