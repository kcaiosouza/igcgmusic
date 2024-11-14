import Image from "next/image";
import { IoPlayCircle } from "react-icons/io5";

export default function CardMusic() {
  return(
    <div className="relative min-w-[154px] min-h-[154px]">
      <Image src="https://github.com/kcaiosouza.png" width={216} height={216} alt="capa cd" className="w-[154px] h-[154px] rounded-2xl"/>
      <div className="w-[147px] h-12 flex flex-row left-1 gap-1 bottom-2 px-2 absolute justify-between backdrop-blur-sm rounded-md bg-black/30">
        <div className="flex flex-col justify-center flex-[2]">
          <span className="text-[14px] inline-block whitespace-nowrap text-ellipsis overflow-hidden max-w-[13ch]">O amor jamais acabara</span>
          <span className="font-sans text-[12px] whitespace-nowrap font-light">4:24 • Públio Alves</span>
        </div>
        <div className="flex-[1] flex items-center justify-center">
          <IoPlayCircle className="cursor-pointer" size={28}/>
        </div>
      </div>
    </div>
  )
}