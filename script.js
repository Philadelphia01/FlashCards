class FlashcardsApp {
    constructor() {
        this.cards = [];
        this.currentIndex = 0;
        this.initializeElements();
        this.addEventListeners();
    }

    initializeElements() {
        // Card elements
        this.flashcard = document.querySelector('.flashcard');
        this.frontText = document.querySelector('.flashcard-front .card-text');
        this.backText = document.querySelector('.flashcard-back .card-text');
        
        // Navigation
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        // Counter
        this.currentCardSpan = document.getElementById('currentCard');
        this.totalCardsSpan = document.getElementById('totalCards');
        
        // Modal elements
        this.modal = document.getElementById('addCardModal');
        this.addCardBtn = document.getElementById('addCard');
        this.cancelBtn = document.getElementById('cancelAdd');
        this.addCardForm = document.getElementById('addCardForm');
    }

    addEventListeners() {
        // Card flip
        this.flashcard.addEventListener('click', () => this.flipCard());
        
        // Navigation
        this.prevBtn.addEventListener('click', () => this.showPreviousCard());
        this.nextBtn.addEventListener('click', () => this.showNextCard());
        
        // Modal
        this.addCardBtn.addEventListener('click', () => this.openModal());
        this.cancelBtn.addEventListener('click', () => this.closeModal());
        this.addCardForm.addEventListener('submit', (e) => this.handleAddCard(e));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    flipCard() {
        this.flashcard.classList.toggle('flipped');
    }

    showPreviousCard() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCard();
        }
    }

    showNextCard() {
        if (this.currentIndex < this.cards.length - 1) {
            this.currentIndex++;
            this.updateCard();
        }
    }

    updateCard() {
        this.flashcard.classList.remove('flipped');
        
        if (this.cards.length === 0) {
            this.frontText.textContent = "Click 'Add Card' to create your first flashcard!";
            this.backText.textContent = "Start learning!";
            this.currentCardSpan.textContent = "0";
            this.totalCardsSpan.textContent = "0";
            return;
        }

        const card = this.cards[this.currentIndex];
        this.frontText.textContent = card.question;
        this.backText.textContent = card.answer;
        
        // Update counter
        this.currentCardSpan.textContent = (this.currentIndex + 1).toString();
        this.totalCardsSpan.textContent = this.cards.length.toString();
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.cards.length - 1;
    }

    openModal() {
        this.modal.style.display = 'block';
        document.getElementById('question').focus();
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.addCardForm.reset();
    }

    handleAddCard(e) {
        e.preventDefault();
        
        const question = document.getElementById('question').value.trim();
        const answer = document.getElementById('answer').value.trim();
        
        if (question && answer) {
            this.cards.push({ question, answer });
            this.currentIndex = this.cards.length - 1;
            this.updateCard();
            this.closeModal();
        }
    }

    handleKeyPress(e) {
        if (this.modal.style.display === 'block') return;
        
        switch(e.key) {
            case 'ArrowLeft':
                this.showPreviousCard();
                break;
            case 'ArrowRight':
                this.showNextCard();
                break;
            case ' ':
                e.preventDefault();
                this.flipCard();
                break;
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new FlashcardsApp();
});