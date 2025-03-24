export function formatReleaseDate(date) {
    return new Date(date).toDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}
