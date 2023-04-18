import {
  Info as InfoIcon,
  XCircle as StartOverIcon,
} from "lucide-react";
import Link from "next/link";

export default function Footer({ events, startOver }) {
  return (
    <footer className="w-full my-8">
      <div className="text-center">
        <Link href="/about">
          <a className="lil-button">
            <InfoIcon className="icon" />
            What is this?
          </a>
        </Link>

        {events.length > 1 && (
          <button className="lil-button" onClick={startOver}>
            <StartOverIcon className="icon" />
            Start over
          </button>
        )}
      </div>

      <div className="text-center lil-text mt-8">
      <div className="inline-block py-2 px-4 border border-yellow-200 rounded-lg bg-[#fef6aa]">
      🤔 Are you a developer and want to learn how to build this? Check out the{" "}
        <Link href="#">
          <a target="_blank">README</a>
        </Link>.
      </div>
      </div>

      <div className="text-center lil-text mt-8">
        Powered by{" "}
        <Link href="#">
          <a target="_blank">Replicate</a>
        </Link>
        ,{" "}
        <Link href="https://vercel.com/templates/ai">
          <a target="_blank">Vercel</a>
        </Link>
        , and{" "}
        <Link href="#">
          <a target="_blank">GitHub</a>
        </Link>
      </div>
    </footer>
  );
}
