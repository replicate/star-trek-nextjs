import { Fragment, useEffect, useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Universes from "./universes";
import Message from "./message";

export default function Messages({ events, isProcessing, onUndo }) {
  const messagesEndRef = useRef(null);

  const handleButtonClick = (value) => {
    // Process the button value, create a prompt, and call the API
    console.log('Button clicked:', value);
  };

  useEffect(() => {
    if (events.length > 2) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events.length]);

  return (
    <section className="w-full">
      <Universes onButtonClick={handleButtonClick} />

      <Message sender="replicate" isSameSender>
        <p>Scene:</p>
        <p>Captains log, Stardate 31547.1. My ship has encountered a new lifeform that is capable of shapeshifting into the likeness of any person or thing it chooses to mimic. This may have great potential for interstellar exploration and I shall record this in my captains log. In doing so, I will be making some decisions which affect many lives including those of my crew members who are family members with children.</p>
      </Message>

      {events.map((ev, index) => {
        if (ev.replicate && ev.replicate.output && ev.replicate.output.length > 0) {
          return (
            <Message key={"replicate-" + index} sender="replicate" isSameSender>
              {ev.replicate.output}
            </Message>
          );
        }

        if (ev.prompt) {
          return (
            <Message key={"prompt-" + index} sender="user">
              {ev.prompt}
            </Message>
          );
        }
      })}

      {isProcessing && (
        <Message sender="replicate">
          <PulseLoader color="#999" size={7} />
        </Message>
      )}

      <div ref={messagesEndRef} />
    </section>
  );
}
