import { useState } from 'react';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const useSubmitHandler = () => {
  const [events, setEvents] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e, body) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);

    const myEvents = [...events, { body }];
    setEvents(myEvents);

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

      setEvents(
        myEvents.concat([
          { replicate: prediction },
        ])
      )

      setPredictions(predictions.concat([prediction]));
    }

    if (prediction.status === "succeeded") {
      setEvents(
        myEvents.concat([
          { replicate: prediction },
        ])
      );
    }

    setIsProcessing(false)
  };

  return { handleSubmit, events, predictions, error, isProcessing };
};

export default useSubmitHandler;
