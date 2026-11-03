export const formatEventDate = (date) => {
    const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

    if (!dateOnly) {
        return new Date(date).toLocaleDateString();
    }

    const year = Number(dateOnly[1]);
    const month = Number(dateOnly[2]);
    const day = Number(dateOnly[3]);
    const localDate = new Date(year, month - 1, day);

    if (
        localDate.getFullYear() !== year ||
        localDate.getMonth() !== month - 1 ||
        localDate.getDate() !== day
    ) {
        return new Date(date).toLocaleDateString();
    }

    return localDate.toLocaleDateString();
};
