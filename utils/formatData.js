export const formatCurrency = (value) => {
    if (!value) return "0 ₽";

    try {
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
        }).format(value);
    } catch {
        return value + " ₽";
    }
};

export const formatDate = (date) => {
    if (!date) return "";

    try {
        const d = new Date(date);

        return d.toLocaleDateString("ru-RU").replace(/\./g, "-");
    } catch {
        return "";
    }
};
