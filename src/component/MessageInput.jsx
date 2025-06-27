import { useRef, useState } from "react";
import { useChat } from "../store/useChat";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

function MessageInput() {
  const { sendMessage } = useChat();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInput = useRef(null);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("please select an image");
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    console.log(imagePreview);
    reader.readAsDataURL(file);
  };
  const removeImage = (e) => {
    setImagePreview(null);
    if (fileInput.current) fileInput.current.value = "";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInput.current) fileInput.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-4 w-full '>
      {imagePreview && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <img src={imagePreview} alt='preview' className='size-20' />
            <button
              onClick={removeImage}
              className='absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300
    flex items-center justify-center'
              type='button'>
              <X className='size-3' />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input
            type='text'
            className='w-full input input-borded rounded-lg input-sm sm:input-md'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInput}
            onChange={handleImage}
          />
          <button
            type='button'
            className={`hidden sm:flex btn btn-circle
          ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInput?.current?.click()}>
            <Image size={20} />
          </button>
        </div>
        <button
          type='submit'
          className='btn btn-sm btn-circle'
          disabled={!text.trim() && !imagePreview}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
