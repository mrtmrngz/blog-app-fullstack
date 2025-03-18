export const formattedDate = (date: string) => {
    const dateOptions: Intl.DateTimeFormatOptions = {year: "numeric", month: "long", day: "numeric"}

    return new Date(date).toLocaleDateString('en-US', dateOptions)
}