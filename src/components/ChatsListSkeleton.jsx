const ChatsListSkeleton = ({ amount }) => {
  return (
    <div className="w-full space-y-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].slice(0, amount || 8).map((num) => (
        <div key={num} className="flex gap-3">
          <div className="w-14 h-14 rounded-full bg-gray-100 skeleton shrink-0"></div>

          <div className="glex-grow w-full">
            <p className="w-full h-6 rounded-lg bg-gray-100 skeleton mb-2"></p>
            <p className="w-[80%] h-5 rounded-lg bg-gray-100 skeleton"></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatsListSkeleton;
