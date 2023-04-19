import { useState } from 'react';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const useSubmitHandler = () => {
  const [events, setEvents] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e, apiCall) => {
    e.preventDefault();

    const prompt = e.target.prompt.value;

    setError(null);
    setIsProcessing(true);

    const myEvents = [...events, { prompt }];
    setEvents(myEvents);

    const body = { prompt };

    const response = await apiCall(body);
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
