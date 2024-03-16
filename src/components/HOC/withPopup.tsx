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

    return (
      <>
        {open && <div className="fixed inset-0 z-10 bg-black opacity-50" />}
        <Trigger setOpen={() => setOpen(!open)} />
        <Popup
          open={open}
          modal
          closeOnDocumentClick
          onClose={() => setOpen(false)}
        >
          <WrappedComponent {...props} />
        </Popup>
      </>
    );
  };

  return PopupComponent;
}

export default withPopup;
