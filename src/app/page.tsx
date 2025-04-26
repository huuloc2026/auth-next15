import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4 space-y-2">


      <a href="/login" className="bg-green-300 text-black w-[100px] inline-block text-center p-2">
        Login
      </a>
    <br/>
  

      <br/>
      <a href="/protected" className="bg-red-500 text-white w-[100px] inline-block text-center p-2">
        protected
      </a>
    </div>
  );
}
