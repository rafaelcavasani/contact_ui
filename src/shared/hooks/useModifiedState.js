import { useEffect, useState } from "react";

import { compareStates } from "../utils/validations";

export default function useModifiedState(initialState) {
  const [original, setOriginal] = useState(initialState.original);
  const [modified, setModified] = useState(initialState.modified);
  const [equalState, setEqualState] = useState(true);

  useEffect(() => {
    function compare() {
      setEqualState(compareStates(original, modified));
    }

    compare();
  }, [modified, original]);

  function updateStates(newState) {
    setOriginal(newState);
    setModified(newState);
  }

  return [modified, setModified, equalState, updateStates];
}
