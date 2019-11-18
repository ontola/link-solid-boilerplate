import React, { FC } from "react";

export interface Props {
  className: string;
  doneText: string;
  workingText: string;
  onClick: () => void;
}

const ButtonWithFeedback: FC<Props> = ({
  children,
  className,
  doneText,
  workingText,
  onClick,
  ...other
}) => {
  const [ working, setWorking ] = React.useState(false);
  const [ done, setDone ] = React.useState(false);

  React.useEffect(() => {
    let timeout: number | undefined;
    if (done) {
      timeout = window.setTimeout(() => {
        setDone(false);
      }, 2000);
    } else if (done) {
      window.clearTimeout(timeout);
    }
    return () => window.clearTimeout(timeout);
  }, [done]);

  return (
    <button
      className={className}
      disabled={working}
      onClick={() => {
        setWorking(true);
        try {
          onClick();
        } finally {
          setDone(true);
          setWorking(false);
        }
      }}
      {...other}
    >
      {done ? doneText : (working ? workingText : children)}
    </button>
  )
}

export default ButtonWithFeedback;
