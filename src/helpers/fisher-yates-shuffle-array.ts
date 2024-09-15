export function shuffleArray(array: any[]) {
    // Create a copy of the array to avoid mutating the original array
    const shuffledArray = array.slice();
    let currentIndex = shuffledArray.length;
    let randomIndex;

    // While there remain elements to shuffle
    while (currentIndex > 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap it with the current element
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
    }

    return shuffledArray;
}