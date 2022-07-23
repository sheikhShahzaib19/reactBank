import { toast } from "react-toastify"

window.getRandomId = () => {
    return Math.random().toString(36).slice(2)
}

window.notify = (msg, type) => {
    let option = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    console.log(msg, type)
    switch (type) {
        case "success":
            toast.success(msg, option)
            break;
        case "error":
            toast.error(msg, option)
            break;
        case "warning":
            toast.warning(msg, option)
            break;
        default:
            toast(msg, option)
    }
}