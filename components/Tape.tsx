type TapeProps = {
  rotation: number
}

const Tape: React.FC<TapeProps> = ({ rotation }) => {
  return (
    <>
      <div className="tape w-3 h-1 md:w-6 md:h-2 lg:w-8 lg:h-3 xl:w-12 xl:h-4" />
      <style jsx>{`
        .tape {
          transform: rotate(${rotation}deg);
          box-shadow: inset 0 0 1em 0.5em hsla(0, 0%, 100%, 0.1);
          background-color: hsla(0, 0%, 100%, 0.2);
          -webkit-filter: drop-shadow(0 1px 1px hsla(0, 0%, 0%, 0.3));
        }

        .tape:after,
        .tape:before {
          background-size: 0.4em 0.4em;
          bottom: 0;
          content: '';
          position: absolute;
          top: 0;
          width: 0.2em;
        }

        .tape:after {
          background-image: linear-gradient(
              45deg,
              transparent 50%,
              hsla(0, 0%, 100%, 0.3) 50%
            ),
            linear-gradient(-45deg, transparent 50%, hsla(0, 0%, 100%, 0.3) 50%);
          background-position: 0 100%;
          left: -0.2em;
        }

        .tape:before {
          background-image: linear-gradient(
              135deg,
              transparent 50%,
              hsla(0, 0%, 100%, 0.3) 50%
            ),
            linear-gradient(
              -135deg,
              transparent 50%,
              hsla(0, 0%, 100%, 0.3) 50%
            );
          background-position: 100% 100%;
          right: -0.2em;
        }
      `}</style>
    </>
  )
}

export default Tape
