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
      <div style={{ textAlign: "center" }} className="d-flex justify-content-between mb-3">
        <div className="me-auto p-2">3</div>
        <div className="p-2">Checkout</div>
        <div className="p-2">RM 50.20</div>
      </div>
    </div>
  );
};
