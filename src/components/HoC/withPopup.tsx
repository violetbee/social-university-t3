import { FC } from "react";
import Popup from "reactjs-popup";

/**
 *
 * @param Trigger Trigger component (button, icon, etc.)
 * @param WrappedComponent Wrapped component (popup content)
 * @returns  Popup component
 */

export function withPopup(Trigger: FC, WrappedComponent: FC) {
  const PopupComponent: FC<any> = (props: any) => {
    return (
      <Popup
        trigger={
          <button className="h-full">
            <Trigger />
          </button>
        }
        modal
      >
        <WrappedComponent {...props} />
      </Popup>
    );
  };

  return PopupComponent;
}

export default withPopup;
