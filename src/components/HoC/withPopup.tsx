import { FC, HTMLProps } from "react";
import Popup from "reactjs-popup";
import { useState } from "react";

/**
 *
 * @param Trigger Trigger component (button, icon, etc.)
 * @param WrappedComponent Wrapped component (popup content)
 * @returns  Popup component
 */

type TriggerProps = {
  setOpen: () => void;
};

function withPopup(Trigger: FC<TriggerProps>, WrappedComponent: FC) {
  const PopupComponent = (props: HTMLProps<FC>) => {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen((prev) => !prev);

    const value = { toggle, open };

    return (
      <>
        <Trigger setOpen={value.toggle} />
        <Popup
          open={value.open}
          modal
          closeOnDocumentClick
          onClose={value.toggle}
        >
          <WrappedComponent {...props} />
        </Popup>
      </>
    );
  };

  return PopupComponent;
}

export default withPopup;
