import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4 space-y-2">
      <div className="bg-amber-300 text-black w-[100px] p-2">
        <h1>Hello World</h1>
      </div>

      <a href="/login" className="bg-red-300 text-black w-[100px] inline-block text-center p-2">
        Login
      </a>
    <br/>
      <a href="/register" className="bg-green-900 text-white w-[100px] inline-block text-center p-2">
        Register
      </a>
    </div>
  );
}
