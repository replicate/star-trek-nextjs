import { useState } from 'react';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const getDescriptionAndOptions = (output) => {
  const outputString = output?.join('')
  const description = outputString?.match(/<desc>(.*?)(<\/desc>|$)/)?.[1];
  const option1 = outputString?.match(/<option1>(.*?)<\/option1>/)?.[1];
  const option2 = outputString?.match(/<option2>(.*?)<\/option2>/)?.[1];
  const options = option1 && option2 ? [{ value: 1, text: option1}, { value: 2, text: option2 }] : false
  return { description, options }
}

const useSubmitHandler = () => {
  const [events, setEvents] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (body) => {
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

    let haveDescriptionAndOptions = false
    while (
      prediction.status !== "succeeded" &&
      prediction.status !== "failed" &&
      !haveDescriptionAndOptions
    ) {
      await sleep(500);
      const response = await fetch("/api/predictions/" + prediction.id);
      prediction = await response.json();
      if (response.status !== 200) {
        setError(prediction.detail);
        return;
      }

      const { description, options } = getDescriptionAndOptions(prediction.output)

      // TODO: If description and options, we can cancel the rest of the prediction early. We do not need the rest.
      if (options) {
        setIsProcessing(false)
        haveDescriptionAndOptions = true
      }

      setEvents(
        myEvents.concat([
          { replicate: prediction, description, options },
        ])
      )

      setPredictions(predictions.concat([prediction]));
    }

    if (prediction.status === "succeeded") {
      const { description, options } = getDescriptionAndOptions(prediction.output)
      setEvents(
        myEvents.concat([
          { replicate: prediction, description, options },
        ])
      );
    }

    setIsProcessing(false)
  };

  return { handleSubmit, events, setEvents, predictions, error, isProcessing, setIsProcessing };
};

export default useSubmitHandler;
