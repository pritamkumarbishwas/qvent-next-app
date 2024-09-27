
import Link from "next/link";

const Tag = (props) => {
  const { text } = props;
  
  return (
    <div className="bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl m-1 w-fit px-2 py-1 text-center font-bold hover:scale-110 hover:cursor-pointer">
      <Link href={`/events?tag=${encodeURIComponent(text)}`}> # {text} </Link>
    </div>
  );
};

export default Tag;
