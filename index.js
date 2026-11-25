class RandomFacts extends HTMLElement {
    static get observedAttributes() {
        return ['compact'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        if (this.heading) return;

        this.heading = document.createElement("h2");
        this.heading.textContent = "Random Facts";

        this.factText = document.createElement("p");
        this.detailText = document.createElement("p");

        this.button = document.createElement("button");
        this.button.type = "button";
        this.button.textContent = "Next Fact";

        this.status = document.createElement('p');
        this.status.setAttribute("role", "status");
        this.status.textContent = "Fetching random fact...";
        
        this.append(this.heading, this.factText, this.detailText, this.button, this.status);

        this.button.addEventListener('click', () => this.loadFact());
        
        this.toggleAttribute("compact", this.readPanelMode() !== "expanded");
        this.detailText.hidden = this.hasAttribute('compact');

        this.loadFact();
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "compact" && this.detailText) {
            this.detailText.hidden = newVal !== null;
        }
    }
    
    async loadFact() {
        try {
            this.status.textContent = "Fetching random fact...";
            this.button.disabled = true;

            const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random");
    
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`)
            }
    
            const data = await response.json();
    
            if (typeof data?.source !== "string") {
                throw new Error("Expected a source in the response.");
            }

            if (typeof data?.text !== "string") {
                throw new Error("Expected a text in the response.");
            }
    
            this.factText.textContent = data.text;
            this.detailText.textContent = data.source;
            this.status.textContent = "Successfully fetched random fact.";
            this.button.textContent = "Next Fact";
        } catch (error) {
            console.error("Could not load the message.", error);
            this.status.textContent = "Failed to fetch random fact. Press the button to try again.";
            this.button.textContent = "Try Again";
        } finally {
            this.button.disabled = false;
        }
    }

    readPanelMode() {
        try {
            const value = localStorage.getItem("hw5-fact-panel-mode");
            return value === "compact" || value === "expanded" ? value : null;
        } catch (error) {
            return null;
        }
    }

    savePanelMode(mode) {
        try {
            localStorage.setItem("hw5-fact-panel-mode", mode);
        } catch (error) {
            console.log("Could not save the panel mode.", error);
        }
    }
 
    changePanelMode() {
        const isCompact = this.toggleAttribute("compact");
        this.savePanelMode(isCompact ? "compact" : "expanded");
    }
}


customElements.define('random-facts', RandomFacts);

const toggleBtn = document.querySelector('#toggle-compact');
const facts = document.querySelector('random-facts');

toggleBtn.addEventListener('click', () => {
    facts.changePanelMode();
});