// ConfirmationDialog.jsx

export default function ConfirmationDialog({ summary, sendConfirm }) {
  if (!summary) return null;

  return (
    <div>
      <button onClick={sendConfirm}>Confirm</button>
    </div>
  );
}
