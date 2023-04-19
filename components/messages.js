import { Fragment, useEffect, useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Universes from "./universes";
import Characters from "./characters";
import Options from "./options";
import Message from "./message";

export default function Messages({ handleSubmit, events, setEvents, isProcessing, onUndo }) {
  const [prompt, setPrompt] = useState('');
  const [scene, setScene] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (events.length > 2) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events.length]);

  useEffect(() => {
    const lastEvent = events[events.length - 1];
    if (lastEvent && (lastEvent.character || lastEvent.choice)) {
      handleSubmit(prompt);
    }
  }, [events]);

  const handleUniverseSelection = (universe, message) => {
    setEvents([...events, { universe, message }]);
  };

  const handleCharacterSelection = (prompt, message, scene) => {
    setPrompt(prompt);
    setScene(scene);
    setEvents([...events, { character: true, message }]);
  };

  const handleOptionSelection = (prompt, message, scene) => {
    setPrompt(prompt);
    setScene(scene);
    setEvents([...events, { choice: true, message }]);
  };

  return (
    <section className="w-full border-2 border-gray-400 rounded-lg pt-0 p-2 ">
      <Message key={"universe-choice"} sender="replicate" isSameSender>
        <Universes handleSelection={handleUniverseSelection} />
      </Message>

      {events.map((ev, index) => {
        if (ev.universe) {
          return (
            <Fragment key={"choose-character-" + index}>
              <Message key={"universe-" + index} sender="user" isSameSender>
                {ev.message}
              </Message>
              <Message key={"characters-" + index} sender="replicate" isSameSender>
                <Characters universe={ev.universe} handleSelection={handleCharacterSelection} />
              </Message>
            </Fragment>
          );
        }

        if (ev.character) {
          return (
            <Message key={"character-" + index} sender="user" isSameSender>
              {ev.message}
            </Message>
          );
        }

        if (ev.replicate && ev.description) {
          return (
            <Fragment key={"replicate-" + index}>
              <Message sender="replicate" isSameSender>
                {ev.description}
                {ev.options && (
                  <Options
                    key={"options-" + index}
                    scene={scene}
                    description={ev.description}
                    options={ev.options}
                    prompt={prompt}
                    handleSelection={handleOptionSelection}
                    onUndo={() => onUndo(index)}
                  />
                )}
              </Message>
            </Fragment>
          );
        }

        if (ev.choice) {
          return (
            <Message key={"message-" + index} sender="user" isSameSender>
              {ev.message}
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
