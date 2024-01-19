import { generateRandomNumber } from "./generateRandomNumber";

export function generateColor(): string {
    let r = generateRandomNumber(0, 150);
    let g = generateRandomNumber(0, 150);
    let b = generateRandomNumber(0, 150);

    return `rgb(${r}, ${g}, ${b})`;
}