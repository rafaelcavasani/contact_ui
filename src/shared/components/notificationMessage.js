import { notification } from "antd";

export default function notificationMessage(
  title,
  message,
  type = "info",
  duration = 4.5
) {
  const config = {
    message: `${title}`,
    description: `${message}`,
    placement: "topRight",
    duration,
  };

  switch (type.toLowerCase()) {
    case "info": {
      notification.info(config);
      break;
    }

    case "success": {
      notification.success(config);
      break;
    }

    case "error": {
      notification.error(config);
      break;
    }

    default:
      notification.info(config);
  }
}
