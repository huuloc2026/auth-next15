import Image from "next/image";
import MePage from "./MeUI";

export default function Home() {

  
  return (
    <div className="p-4 space-y-2">
      <h1>This is protedted route</h1>
      <MePage></MePage>
    </div>
  );
}
