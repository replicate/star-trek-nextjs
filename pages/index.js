import Messages from "components/messages";
import PromptForm from "components/prompt-form";
import Head from "next/head";
import { useState } from "react";

import Footer from "components/footer";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const appName = "Star Trek Adventure";
export const appSubtitle = "A choose your own adventure game";
export const appMetaDescription = "Play a Star Trek choose your own adventure game, with the help of an AI.";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = e.target.prompt.value;

    setError(null);
    setIsProcessing(true);
    setInitialPrompt("");

    const myEvents = [...events, { prompt }];
    setEvents(myEvents);

    const body = { prompt };

    const response = await fetch("/api/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const prediction = await response.json();

    if (response.status !== 201) {
      setError(prediction.detail);
      return;
    }

    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed"
    ) {
      await sleep(500);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }

      setPredictions(predictions.concat([prediction]));
    }

    if (prediction.status === "succeeded") {
      setEvents(
        myEvents.concat([
          { replicate: prediction },
        ])
      );
    }

    setIsProcessing(false);
  };

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
          events={events}
          isProcessing={isProcessing}
          onUndo={(index) => {
            setInitialPrompt(events[index - 1].prompt);
            setEvents(events.slice(0, index));
          }}
        />

        <PromptForm
          initialPrompt={initialPrompt}
          isFirstPrompt={events.length === 0}
          onSubmit={handleSubmit}
          disabled={isProcessing}
        />

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
