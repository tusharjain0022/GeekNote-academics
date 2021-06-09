import { toast } from "react-toastify";

const Notify = (message, type) => {
    switch (type) {
        case "error":
            toast.error(message, {
                position: "top-center",
            });
            break;
        case "success":
            toast.success(message, {
                position: "top-center",
            });
            break;
        case "info":
            toast.info(message, {
                position: "top-center",
            });
            break;
        case "warning":
            toast.warning(message, {
                position: "top-center",
            });
            break;
        default:
            break;
    }
};

export default Notify;
