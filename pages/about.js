import Head from "next/head";
import Link from "next/link";
import { ArrowLeft as ArrowLeftIcon } from "lucide-react";

import appName from "./index";

export default function About() {
  return (
    <div>
      <Head>
        <title>{appName}</title>
      </Head>

      <main className="container max-w-[600px] mx-auto p-5">
        <h1 className="text-center text-5xl font-bold m-6">{appName}</h1>

        <p className="prose">
          This open-source website provides a simple interface for ...
        </p>

        <div className="text-center mt-10">
          <Link href="/">
            <a className="bg-black text-white rounded-md text-small inline-block p-3 flex-none">
              <ArrowLeftIcon className="icon" />
              Back to adventure
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
