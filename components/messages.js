import { Fragment, useEffect, useRef } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Universes from "./universes";
import Characters from "./characters";
import Options from "./options";
import Message from "./message";
import useSubmitHandler from "hooks/use-submit-handler";

export default function Messages({ handleSubmit, events, setEvents, isProcessing, onUndo }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (events.length > 2) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events.length]);

  useEffect(() => {
    const lastEvent = events[events.length - 1];

    if (lastEvent && (lastEvent.character || lastEvent.choice)) {
      handleSubmit(lastEvent.prompt);
    }
  }, [events]);

  const handleUniverseSelection = (universe, message) => {
    setEvents(
      events.concat([
        { universe, message },
      ])
    )
  };

  const handleCharacterSelection = (prompt, message, scene) => {
    setEvents(
      events.concat([
        {
          character: true,
          prompt,
          message,
          scene,
        },
      ])
    );
  };

  const handleOptionSelection = (prompt, message, scene) => {
    setEvents(
      events.concat([
        {
          choice: true,
          prompt,
          message,
          scene
        },
      ])
    );
  };

  return (
    // add a border to section
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

        if (ev.replicate) {
          return (
            <Fragment key={"replicate-" + index}>
              <Message sender="replicate" isSameSender>
                {ev.description ? (
                  <>
                    {ev.description}
                    {ev.options && (
                      <Options
                        scene={ev.scene}
                        description={ev.description}
                        options={ev.options}
                        prompt={ev.prompt}
                        handleSelection={handleOptionSelection}
                        onUndo={() => onUndo(index)}
                      />
                    )}
                  </>
                ) : null}

                {isProcessing && (
                  <PulseLoader color="#999" size={7} />
                )}
              </Message>
            </Fragment>
          );
        }

        if (ev.choice) {
          return (
            <Message key={"character-" + index} sender="user" isSameSender>
              {ev.message}
            </Message>
          );
        }
      })}

      <div ref={messagesEndRef} />
    </section>
  );
}
