import Messages from "components/messages";
import PromptForm from "components/prompt-form";
import Head from "next/head";
import { useState } from "react";
import useSubmitHandler from "hooks/use-submit-handler";

import Footer from "components/footer";

export const appName = "Star Trek Adventure";
export const appSubtitle = "A choose your own adventure game";
export const appMetaDescription = "Play a Star Trek choose your own adventure game, with the help of an AI.";

export default function Home() {
  const { handleSubmit, events, setEvents, error, isProcessing, setIsProcessing } = useSubmitHandler();

  const startOver = async (e) => {
    e.preventDefault();
    setEvents([]);
    setError(null);
    setIsProcessing(false);
  };

  return (
    <div>
      <Head>
        <title>{appName}</title>
        <meta name="description" content={appMetaDescription} />
        <meta property="og:title" content={appName} />
        <meta property="og:description" content={appMetaDescription} />
      </Head>

      <main className="container max-w-[700px] mx-auto p-5">
        <hgroup>
          <h1 className="text-center text-5xl font-bold m-6">{appName}</h1>
          <p className="text-center text-xl opacity-60 m-6">
            {appSubtitle}
          </p>
        </hgroup>

        <Messages
          handleSubmit={handleSubmit}
          events={events}
          setEvents={setEvents}
          isProcessing={isProcessing}
          onUndo={(index) => {
            setInitialPrompt(events[index - 1].prompt);
            setEvents(events.slice(0, index));
          }}
        />

        {/* <PromptForm
          isFirstPrompt={events.length === 0}
          onSubmit={(e) => handleSubmit(e, { prompt: e.target.prompt.value })}
          disabled={isProcessing}
        /> */}

        <div className="mx-auto w-full">
          {error && <p className="bold text-red-500 pb-5">{error}</p>}
        </div>

        <Footer
          events={events}
          startOver={startOver}
        />
      </main>
    </div>
  );
}
