export default getCardCount = (deck) => {
    if (deck && deck.questions && deck.questions.length) {
        const count = deck.questions.length
        return deck.questions.length === 1
            ? `${count} card`
            : `${count} cards`
    } else {
        return "0 cards"
    }
}