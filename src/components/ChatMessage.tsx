const ChatMessage = () => {
  return (
    <div className="flex h-20 flex-shrink-0 gap-2 border-b-[1px] border-black first:border-b-[1px]">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 lg:mb-0">
          <img
            src="/images/43.jpg"
            className="h-full w-full overflow-hidden rounded-full shadow"
            alt=""
          />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">Çağlar Karahüseyin</p>
        <p className="text-xs text-gray-500">Örnek bir mesajdır</p>
      </div>
    </div>
  );
};
export default ChatMessage;
