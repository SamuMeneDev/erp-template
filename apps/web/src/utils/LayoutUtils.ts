export function currencyColorClass(value: number): string {
    if(value > 0) {
        return "text-green-600";
    } else if(value < 0) {
        return "text-red-600";
    } else {
        return "";
    }

}