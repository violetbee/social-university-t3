import { FC } from "react";
import Popup from "reactjs-popup";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

/**
 *
 * @param Trigger Trigger component (button, icon, etc.)
 * @param WrappedComponent Wrapped component (popup content)
 * @returns  Popup component
 */

type TriggerProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function withPopup(Trigger: FC<TriggerProps>, WrappedComponent: FC) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PopupComponent = (props: any) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Trigger setOpen={setOpen} />
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
