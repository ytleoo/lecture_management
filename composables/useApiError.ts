export const useApiError = (error: ErrorT) => {
  const statusCode = error.value.statusCode;
  switch (statusCode) {
    case 500:
      throw showError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'サーバーエラーです。時間をおいて再度アクセスしてください。'
      });
    default:
      return error.value.data.errors
  }
}