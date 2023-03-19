import { fireEvent } from "@testing-library/react";

declare global {
  interface WindowEventMap {
    "test-event": CustomEvent;
  }

  interface HTMLElementEventMap {
    "test-event": CustomEvent;
  }

  interface DocumentEventMap {
    "test-event": CustomEvent;
  }
}
