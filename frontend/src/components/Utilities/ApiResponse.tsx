export const ApiResponse = (mutation: any) => {
  return (
    <div>
      {mutation.isLoading ? (
        "Creating Order..."
      ) : (
        <>
          {mutation.isError ? (
            <div>
              An error occurred:{" "}
              {mutation.error.response.data.message.message?.length
                ? mutation.error.response.data.message.message.join(",")
                : mutation.error.response.data.message.error}
            </div>
          ) : null}
        </>
      )}
      {mutation.isSuccess ? <div>Order processed successfully</div> : null}
    </div>
  );
};
