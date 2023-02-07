export const SnackBar = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: "black",
        color: "#fff",
        cursor: "pointer",
      }}
    >
      <div style={{ textAlign: "center" }} className="d-flex justify-content-between align-items-baseline">
        <span className="p-2">3</span>
        <span className="p-2">Checkout</span>
        <span className="p-2">RM 50.20</span>
      </div>
    </div>
  );
};
