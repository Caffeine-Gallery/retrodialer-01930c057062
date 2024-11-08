import { backend } from "declarations/backend";

class PhoneShop {
    constructor() {
        this.productsGrid = document.getElementById('productsGrid');
        this.loadingScreen = document.getElementById('loadingScreen');
        this.searchInput = document.getElementById('searchInput');
        this.modal = document.getElementById('productModal');
        this.modalContent = document.getElementById('modalContent');
        this.closeButton = document.querySelector('.close-button');
        
        this.phones = [];
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadPhones();
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', () => this.handleSearch());
        this.closeButton.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    async loadPhones() {
        try {
            this.showLoading();
            this.phones = await backend.getPhones();
            this.renderPhones(this.phones);
        } catch (error) {
            console.error('Error loading phones:', error);
            this.productsGrid.innerHTML = '<p class="error">Error loading phones. Please try again later.</p>';
        } finally {
            this.hideLoading();
        }
    }

    renderPhones(phones) {
        this.productsGrid.innerHTML = phones.map(phone => `
            <div class="product-card" onclick="window.phoneShop.showPhoneDetails('${phone.id}')">
                <img src="${phone.image}" alt="${phone.name}" onerror="this.src='https://via.placeholder.com/150'">
                <h3>${phone.name}</h3>
                <p>$${phone.price}</p>
            </div>
        `).join('');
    }

    showPhoneDetails(id) {
        const phone = this.phones.find(p => p.id === id);
        if (!phone) return;

        this.modalContent.innerHTML = `
            <div class="phone-details">
                <img src="${phone.image}" alt="${phone.name}" onerror="this.src='https://via.placeholder.com/300'">
                <h2>${phone.name}</h2>
                <p class="price">$${phone.price}</p>
                <p>${phone.description}</p>
                <div class="specs">
                    <p>Storage: ${phone.storage}</p>
                    <p>Color: ${phone.color}</p>
                </div>
                <button onclick="window.open('${phone.url}', '_blank')" class="retro-button">Buy Now</button>
            </div>
        `;
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredPhones = this.phones.filter(phone => 
            phone.name.toLowerCase().includes(searchTerm) ||
            phone.description.toLowerCase().includes(searchTerm)
        );
        this.renderPhones(filteredPhones);
    }

    showLoading() {
        this.loadingScreen.style.display = 'flex';
    }

    hideLoading() {
        this.loadingScreen.style.display = 'none';
    }
}

// Initialize the app
window.phoneShop = new PhoneShop();
