import React, { useEffect, useState } from 'react';

const ResolverComponent = () => {
  const [counter, setCounter] = useState(0);
  const [isLooping, setIsLooping] = useState(true);

  const resolver = {
    resolve: function resolve(options, callback) {
      const resolveString =
        options.resolveString ||
        options.element.getAttribute('data-target-resolver');
      const combinedOptions = { ...options, resolveString };

      function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function randomCharacter(characters) {
        return characters[getRandomInteger(0, characters.length - 1)];
      }

      function doRandomiserEffect(options, callback) {
        const characters = options.characters;
        const timeout = options.timeout;
        const element = options.element;
        const partialString = options.partialString;

        let iterations = options.iterations;

        setTimeout(() => {
          if (iterations >= 0 && isLooping) {
            const nextOptions = { ...options, iterations: iterations - 1 };

            if (iterations === 0) {
              element.textContent = partialString;
              setIsLooping(false); // Stop looping after one iteration
              if (typeof callback === 'function') {
                callback();
              }
            } else {
              element.textContent =
                partialString.substring(0, partialString.length - 1) +
                randomCharacter(characters);
              doRandomiserEffect(nextOptions, callback);
            }
          }
        }, options.timeout);
      }

      function doResolverEffect(options, callback) {
        const resolveString = options.resolveString;
        const characters = options.characters;
        const offset = options.offset;
        const partialString = resolveString.substring(0, offset);
        const combinedOptions = { ...options, partialString };

        doRandomiserEffect(combinedOptions, () => {
          const nextOptions = { ...options, offset: offset + 1 };

          if (offset <= resolveString.length) {
            doResolverEffect(nextOptions, callback);
          } else if (typeof callback === 'function') {
            callback();
          }
        });
      }

      doResolverEffect(combinedOptions, callback);
    },
  };

  const strings = [
    'I am a dedicated learner with a passion for web development, programming, and systems analysis, eager to take on challenges and explore new opportunities.',
    // ... other GLaDOS quotes ...
    '......',
  ];

  const options = {
    offset: 0,
    timeout: 5,
    iterations: 10,
    characters: [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#',
      '%', '&', '-', '+', '_', '?', '/', '\\', '=',
    ],
    resolveString: strings[counter],
    element: null, // Make sure to set the target element reference in the component
  };

  useEffect(() => {
    const callback = () => {
      setTimeout(() => {
        setCounter((prevCounter) =>
          prevCounter + 1 >= strings.length ? prevCounter : prevCounter + 1
        );

        setIsLooping(true); // Reset the looping state for the next iteration

        let nextOptions = { ...options, resolveString: strings[counter] };
        resolver.resolve(nextOptions, callback);
      }, 1000);
    };

    // Set the target element reference when the component mounts
    options.element = document.querySelector('[data-target-resolver]');

    resolver.resolve(options, callback);

    // Cleanup function
    return () => {
      // Add any necessary cleanup code here
    };
  }, [counter]);

  return <div data-target-resolver></div>;
};

export default ResolverComponent;
