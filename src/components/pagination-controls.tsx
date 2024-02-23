import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type PaginationControlsProps = {
  previousPath: string;
  nextPath: string;
};

const btnStyles =
  "flex gap-x-2 items-center text-white px-5 py-3 bg-white/5 rounded-md opacity-75 hover:opacity-100 transition text-xs";

export default function PaginationControls({
  previousPath,
  nextPath,
}: PaginationControlsProps) {
  console.log(previousPath, nextPath);

  return (
    <section className="flex justify-between w-full ">
      {previousPath ? (
        <Link href={previousPath} className={btnStyles}>
          <ArrowLeftIcon className="w-6 h-6" />
          Previous
        </Link>
      ) : (
        <div></div>
      )}

      {nextPath && (
        <Link href={nextPath} className={btnStyles}>
          Next
          <ArrowRightIcon className="w-6 h-6" />
        </Link>
      )}
    </section>
  );
}
