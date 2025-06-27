type StatusInfo = {
  label: string;
  color: string; 
};

export function getOrderStatus(status: string): StatusInfo {
  switch (status) {
    case "done":
      return { label: "Выполнен", color: "#00CCCC" }; 
    case "pending":
      return { label: "Готовится", color: "#8585ad" }; 
    case "created":
      return { label: "Создан", color: "#FFFFFF" };
    case "canceled":
    case "cancelled":
      return { label: "Отменён", color: "#E52B50" }; 
    default:
      return { label: "Неизвестен", color: "#999999" };
  }
}