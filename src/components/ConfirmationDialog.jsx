// ConfirmationDialog.jsx

import React, { useState, useEffect } from "react";
import classes from "./ConfirmationDialog.module.css";

export default function ConfirmationDialog({ summary, onConfirm, onCancel }) {
  const [isExiting, setIsExiting] = useState(false);
  const [exitAction, setExitAction] = useState(null);

  useEffect(() => {
    if (summary) {
      // When a new summary is set, ensure the dialog is in its entering state.
      setIsExiting(false);
      setExitAction(null);
    }
  }, [summary]);

  // When the fade-out animation completes, call the proper callback.
  const handleAnimationEnd = () => {
    if (isExiting) {
      if (exitAction === "confirm") {
        onConfirm(true);
      } else if (exitAction === "cancel") {
        onCancel();
      }
    }
  };

  const handleConfirmClick = () => {
    setExitAction("confirm");
    setIsExiting(true);
  };

  const handleCancelClick = () => {
    setExitAction("cancel");
    setIsExiting(true);
  };

  if (!summary && !isExiting) return null;

  const summaryItems = Object.entries(summary).map(([key, value]) => (
    <div key={key} className={classes.card}>
      <strong>{key}: </strong>
      {value}
    </div>
  ));

  return (
    <div className={classes.overlay}>
      <div
        className={`${classes.dialogContainer} ${
          isExiting ? classes.fadeOut : classes.fadeIn
        }`}
        onAnimationEnd={handleAnimationEnd}
      >
        <div className={classes.dialog}>
          <h2>Does this look right?</h2>
          <div className={classes.dialogCardGroup}>{summaryItems}</div>
          <div className={classes.buttonGroup}>
            <button className={classes.dialogButton} onClick={handleConfirmClick}>
              Confirm
            </button>
            <button className={classes.dialogButton} onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
