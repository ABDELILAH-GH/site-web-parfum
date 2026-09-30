/**
 * MAISON DE HAUTE PARFUMERIE - SCRIPT INTERACTION & TRANSLATIONS
 */

// --- 1. TRANSLATION DICTIONARY (FRANÇAIS & ENGLISH) ---
const translations = {
    fr: {
        nav: {
            tagline: "Haute Parfumerie",
            home: "Accueil",
            collections: "Collections",
            shop: "Boutique",
            about: "À Propos",
            contact: "Contact"
        },
        hero: {
            pretitle: "Maison de Haute Parfumerie",
            title: "Pure Élégance",
            subtitle: "L'harmonie d'essences rares et du savoir-faire artisanal. Une signature olfactive unique, façonnée pour traverser le temps.",
            btnExplore: "Découvrir la Collection",
            scroll: "Découvrir"
        },
        showcase: {
            subtitle: "Sélection Prestige",
            title: "Nos Fragrances Iconiques",
            desc: "Des accords d’ambre précieux, de rose de mai et d’oud mystérieux, conçus pour éveiller les sens.",
            addToCart: "Ajouter au Panier"
        },
        cart: {
            title: "Votre Panier",
            emptyTitle: "Votre panier est encore vide",
            emptyDesc: "Explorez nos créations et laissez-vous tenter par une fragrance signature.",
            discover: "Explorer la boutique",
            subtotal: "Sous-total :",
            shippingNote: "Livraison offerte et coffret d'échantillons offert dès 1 000 DH au Maroc.",
            checkout: "Passer la Commande",
            addedToast: "Ajouté avec succès au panier !"
        }
    },
    en: {
        nav: {
            tagline: "Haute Perfumery",
            home: "Home",
            collections: "Collections",
            shop: "Shop",
            about: "About Us",
            contact: "Contact"
        },
        hero: {
            pretitle: "French Haute Perfumery",
            title: "Pure Elegance",
            subtitle: "The harmony of rare essences and artisanal mastery. A unique olfactory signature, crafted to transcend time.",
            btnExplore: "Discover the Collection",
            scroll: "Discover"
        },
        showcase: {
            subtitle: "Prestige Selection",
            title: "Our Iconic Fragrances",
            desc: "Chords of precious amber, May rose, and mysterious oud, crafted to awaken the senses.",
            addToCart: "Add to Bag"
        },
        cart: {
            title: "Your Shopping Bag",
            emptyTitle: "Your bag is currently empty",
            emptyDesc: "Explore our creations and treat yourself to an exquisite signature fragrance.",
            discover: "Explore the boutique",
            subtotal: "Subtotal:",
            shippingNote: "Complimentary shipping & discovery sample set from 1,000 DH.",
            checkout: "Proceed to Checkout",
            addedToast: "Successfully added to your bag!"
        }
    }
};

// --- 2. SAMPLE PRODUCTS DATA ---
const products = [
    {
        id: "parfum-1",
        name: "Élixir d'Or",
        category: "Extrait de Parfum",
        price: 1850,
        tag: "Bestseller",
        icon: "fa-wine-bottle",
        image: "images/collections/elixir-dor.jpg",
        notes_fr: "Ambre précieux, Vanille de Madagascar & Bois de Santal",
        notes_en: "Precious Amber, Madagascar Vanilla & Sandalwood"
    },
    {
        id: "parfum-2",
        name: "Nuit Céleste",
        category: "Eau de Parfum",
        price: 1450,
        tag: "Signature",
        icon: "fa-spray-can-sparkles",
        notes_fr: "Rose de Mai, Oud Sauvage, Safran & Encens Royal",
        notes_en: "May Rose, Wild Oud, Saffron & Royal Incense"
    },
    {
        id: "parfum-3",
        name: "Santal Impérial",
        category: "Extrait de Parfum",
        price: 2100,
        tag: "Édition Limitée",
        icon: "fa-gem",
        notes_fr: "Bergamote de Calabre, Vétiver fumé & Cèdre de l'Atlas",
        notes_en: "Calabrian Bergamot, Smoked Vetiver & Atlas Cedar"
    },
    {
        id: "parfum-4",
        name: "Fleur de Soie",
        category: "Eau de Parfum",
        price: 1350,
        tag: "Nouveau",
        icon: "fa-seedling",
        notes_fr: "Jasmin Sambac, Néroli solaire, Musc blanc & Pivoine",
        notes_en: "Sambac Jasmine, Solar Neroli, White Musk & Peony"
    }
];

// --- 3. STATE MANAGEMENT ---
let currentLang = localStorage.getItem('maison_parfum_lang') || 'fr';
let cart = JSON.parse(localStorage.getItem('maison_parfum_cart')) || [];

// --- 4. DOM ELEMENTS ---
const header = document.getElementById('header');
const langToggleBtn = document.getElementById('langToggleBtn');
const langDropdown = document.querySelector('.lang-switch-dropdown');
const langMenu = document.getElementById('langMenu');
const currentLangLabel = document.getElementById('currentLangLabel');
const langOptions = document.querySelectorAll('.lang-option');

const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartCountBadge = document.getElementById('cartCountBadge');
const cartItemsQty = document.getElementById('cartItemsQty');
const cartEmptyState = document.getElementById('cartEmptyState');
const cartItemsList = document.getElementById('cartItemsList');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartDrawerFooter = document.getElementById('cartDrawerFooter');
const cartDiscoverBtn = document.getElementById('cartDiscoverBtn');

const toastNotification = document.getElementById('toastNotification');
const toastMsg = document.getElementById('toastMsg');

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const productsGrid = document.getElementById('productsGrid');

// --- 5. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLang);
    renderProducts();
    updateCartUI();
    initEventListeners();
    initCheckout();
});

// --- 6. EVENT LISTENERS ---
function initEventListeners() {
    document.getElementById('modalCloseBtn').addEventListener('click', closeProductDetails);
    document.getElementById('productModalBackdrop').addEventListener('click', closeProductDetails);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProductDetails(); });
    // Header scroll background effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Language Dropdown Toggle
    langToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('open');
    });

    // Close Language dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!langDropdown.contains(e.target)) {
            langDropdown.classList.remove('open');
        }
    });

    // Language Options Selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.getAttribute('data-lang');
            setLanguage(selectedLang);
            langDropdown.classList.remove('open');
        });
    });

    // Cart Drawer Toggle
    cartToggleBtn.addEventListener('click', openCart);
    cartCloseBtn.addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);
    if (cartDiscoverBtn) {
        cartDiscoverBtn.addEventListener('click', closeCart);
    }

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// --- 7. LANGUAGE FUNCTIONS ---
function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('maison_parfum_lang', lang);
    applyLanguage(lang);
    renderProducts();
    updateCartUI();
}

function applyLanguage(lang) {
    currentLangLabel.textContent = lang.toUpperCase();

    // Update active state in dropdown
    langOptions.forEach(opt => {
        if (opt.getAttribute('data-lang') === lang) {
            opt.classList.add('active');
        } else {
            opt.classList.remove('active');
        }
    });

    // Update all elements with data-i18n attribute
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translatedValue = getTranslationValue(lang, key);
        if (!translatedValue) return;

        const icon = el.querySelector('i');
        if (icon) {
            // Find existing non-empty text node or set text cleanly
            let textNodeFound = false;
            for (let child of Array.from(el.childNodes)) {
                if (child.nodeType === Node.TEXT_NODE) {
                    if (!textNodeFound && child.textContent.trim().length > 0) {
                        child.textContent = translatedValue + ' ';
                        textNodeFound = true;
                    } else if (textNodeFound) {
                        child.remove(); // remove any duplicated text nodes
                    }
                }
            }
            if (!textNodeFound) {
                el.insertBefore(document.createTextNode(translatedValue + ' '), icon);
            }
        } else {
            el.textContent = translatedValue;
        }
    });
}

function getTranslationValue(lang, key) {
    const keys = key.split('.');
    let val = translations[lang];
    for (let k of keys) {
        if (val && val[k] !== undefined) {
            val = val[k];
        } else {
            return null;
        }
    }
    return val;
}

// --- 8. PRODUCT RENDERING ---
function renderProducts() {
    if (!productsGrid) return;
    const t = translations[currentLang];

    productsGrid.innerHTML = products.map(product => {
        const notes = currentLang === 'fr' ? product.notes_fr : product.notes_en;
        const image = {'parfum-1':'elix-dor.jpg','parfum-2':'nuit.jpg','parfum-3':'santal.jpg','parfum-4':'fleur.jpg'}[product.id];
        return `
            <div class="product-card" data-id="${product.id}" tabindex="0" role="button" onclick="openProductDetails('${product.id}')" onkeydown="if(event.key==='Enter')openProductDetails('${product.id}')">
                <span class="product-tag">${product.tag}</span>
                <div class="product-image-container">
                    <img class="product-photo" src="images/collections/${image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-notes">${notes}</p>
                    <div class="product-bottom-row">
                        <span class="product-price">${product.price.toLocaleString('fr-FR')} DH</span>
                        <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart('${product.id}')">
                            <i class="fa-solid fa-plus"></i>
                            <span>${t.showcase.addToCart}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function openProductDetails(productId) {
 const product=products.find(item=>item.id===productId); if(!product)return;
 const fr=currentLang==='fr'; const content=document.getElementById('productModalContent');
 const image={'parfum-1':'elix-dor.jpg','parfum-2':'nuit.jpg','parfum-3':'santal.jpg','parfum-4':'fleur.jpg'}[product.id];
 const description=fr ? 'Une fragrance élégante et singulière, composée d’essences précieuses et de matières soigneusement sélectionnées.' : 'An elegant, distinctive fragrance crafted from precious, carefully selected ingredients.';
 content.innerHTML='<div class="detail-visual"><img class="detail-photo" src="images/collections/'+image+'" alt="'+product.name+'"></div><div class="detail-copy"><span class="product-category">'+product.category+'</span><h2 class="product-title">'+product.name+'</h2><p class="detail-price">'+product.price.toLocaleString('fr-FR')+' DH</p><h3>'+(fr?'Description':'Description')+'</h3><p class="detail-description">'+description+'</p><h3>'+(fr?'Notes olfactives':'Fragrance notes')+'</h3><p class="product-notes">'+(fr?product.notes_fr:product.notes_en)+'</p><button class="btn btn-primary detail-add-btn" onclick="addToCart(\''+product.id+'\');closeProductDetails()">'+(fr?'Ajouter au panier':'Add to bag')+' <i class="fa-solid fa-bag-shopping"></i></button></div>';
 document.getElementById('productModal').classList.add('active'); document.getElementById('productModalBackdrop').classList.add('active'); document.getElementById('productModal').setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
}
function closeProductDetails(){document.getElementById('productModal').classList.remove('active');document.getElementById('productModalBackdrop').classList.remove('active');document.getElementById('productModal').setAttribute('aria-hidden','true');document.body.style.overflow='';}
// --- 9. SHOPPING CART SYSTEM ---
function openCart() {
    cartDrawer.classList.add('active');
    cartBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    cartDrawer.classList.remove('active');
    cartBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            icon: product.icon,
            category: product.category,
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    bumpCartBadge();
    showToast(translations[currentLang].cart.addedToast);
}

function changeQty(productId, delta) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('maison_parfum_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update Badges
    cartCountBadge.textContent = totalQty;
    cartItemsQty.textContent = totalQty;

    // Display Empty State or Items List
    if (cart.length === 0) {
        cartEmptyState.style.display = 'flex';
        cartItemsList.style.display = 'none';
        cartDrawerFooter.style.display = 'none';
    } else {
        cartEmptyState.style.display = 'none';
        cartItemsList.style.display = 'flex';
        cartDrawerFooter.style.display = 'block';

        cartItemsList.innerHTML = cart.map(item => {
            const image = {'parfum-1': 'elix-dor.jpg', 'parfum-2': 'nuit.jpg', 'parfum-3': 'santal.jpg', 'parfum-4': 'fleur.jpg'}[item.id];
            return `
            <div class="cart-item">
                <div class="cart-item-icon">
                    <img src="images/collections/${image}" alt="${item.name}" loading="lazy">
                </div>
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${(item.price * item.qty).toLocaleString('fr-FR')} DH</span>
                    <div class="cart-item-qty-row">
                        <button class="qty-btn" onclick="changeQty('${item.id}', -1)" aria-label="Diminuer">-</button>
                        <span class="qty-number">${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty('${item.id}', 1)" aria-label="Augmenter">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" title="Supprimer">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `; }).join('');

        cartSubtotal.textContent = `${subtotal.toLocaleString('fr-FR')} DH`;
    }
}

function bumpCartBadge() {
    cartCountBadge.classList.add('bump');
    setTimeout(() => {
        cartCountBadge.classList.remove('bump');
    }, 300);
}

// Toast notification
let toastTimer = null;
function showToast(message) {
    toastMsg.textContent = message;
    toastNotification.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toastNotification.classList.remove('show');
    }, 2800);
}

function initCheckout() {
    const form = document.getElementById('checkoutForm');
    const backdrop = document.getElementById('checkoutBackdrop');
    const close = () => { backdrop.classList.remove('active'); backdrop.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    document.querySelector('.checkout-btn').addEventListener('click', () => {
        if (!cart.length) return;
        backdrop.classList.add('active'); backdrop.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
        document.querySelector('#checkoutForm [name="name"]').focus();
    });
    document.getElementById('checkoutClose').addEventListener('click', close);
    backdrop.addEventListener('click', event => { if (event.target === backdrop) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && backdrop.classList.contains('active')) close(); });
    form.addEventListener('submit', event => {
        event.preventDefault();
        if (!form.reportValidity() || !cart.length) return;
        const details = new FormData(form);
        const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const lines = cart.map(item => `• ${item.name}${item.size ? ` (${item.size})` : ''} × ${item.qty} — ${(item.price * item.qty).toLocaleString('fr-FR')} DH`).join('\n');
        const message = [
            'Bonjour, je souhaite passer cette commande :', '', lines, '',
            `Total : ${total.toLocaleString('fr-FR')} DH`, '',
            `Nom : ${details.get('name')}`, `Téléphone : ${details.get('phone')}`,
            `Ville : ${details.get('city')}`, `Adresse : ${details.get('address')}`,
            details.get('note') ? `Note : ${details.get('note')}` : ''
        ].filter(Boolean).join('\n');
        const whatsappUrl = `https://wa.me/212713927870?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        close();
    });
}