export const formattedSpeed = (speed: number, strings: any) => {
    return `${strings.speed} ${speed} ${strings.measures.kmh}`
}