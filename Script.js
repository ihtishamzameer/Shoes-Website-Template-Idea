
        // ----- PRODUCT DATA & RENDER (identical, keep untouched) -----
        const products = [
            { id: 1, name: "Air Runner Pro", category: "Men's Running", price: 129.99, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", tag: "New" },
            { id: 2, name: "Urban Street Lite", category: "Men's Casual", price: 89.99, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", tag: null },
            { id: 3, name: "Flex Motion", category: "Women's Training", price: 110.00, image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", tag: "Sale" },
            { id: 4, name: "Classic Leather", category: "Men's Formal", price: 150.00, image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", tag: null },
            { id: 5, name: "Neon Energy", category: "Unisex Sport", price: 95.50, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", tag: "Hot" },
            { id: 6, name: "Retro High Top", category: "Unisex Casual", price: 115.00, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", tag: "Trending" },
            { id: 7, name: "Trail Blazer X", category: "Men's Hiking", price: 145.00, image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", tag: null },
            { id: 8, name: "Elegant Stiletto", category: "Women's Formal", price: 120.00, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80", tag: "New" }
        ];
        const productContainer = document.getElementById('product-container');
        function renderProducts() {
            let html = products.map(p => {
                let tag = p.tag ? `<span class="new-tag">${p.tag}</span>` : '';
                return `<div class="product-card"><div class="product-img">${tag}<img src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="product-info"><span class="category">${p.category}</span><h3 class="title">${p.name}</h3><div class="price">$${p.price.toFixed(2)}</div><button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button></div></div>`;
            }).join('');
            productContainer.innerHTML = html;
        }
        window.addToCart = (id) => { const product = products.find(p => p.id === id); alert(`✨ ${product.name} added to cart!`); };
        window.addEventListener('DOMContentLoaded', renderProducts);

        // ----- FULLY FUNCTIONAL TOPBAR (search, user, cart, mobile menu) -----
        // Close all panels helper
        function closeAllPanels() {
            document.querySelectorAll('.search-dropdown, .user-dropdown, .cart-panel').forEach(p => p.classList.remove('active'));
        }

        // Search toggle
        const searchWrapper = document.getElementById('searchWrapper');
        const searchDropdown = document.getElementById('searchDropdown');
        searchWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllPanels();
            searchDropdown.classList.toggle('active');
        });

        // User toggle
        const userWrapper = document.getElementById('userWrapper');
        const userDropdown = document.getElementById('userDropdown');
        userWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllPanels();
            userDropdown.classList.toggle('active');
        });

        // Cart toggle
        const cartWrapper = document.getElementById('cartWrapper');
        const cartPanel = document.getElementById('cartPanel');
        cartWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllPanels();
            cartPanel.classList.toggle('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.icon-wrapper')) {
                closeAllPanels();
            }
        });

        // Prevent closing when clicking inside dropdown
        document.querySelectorAll('.search-dropdown, .user-dropdown, .cart-panel').forEach(p => {
            p.addEventListener('click', (e) => e.stopPropagation());
        });

        // Search button functionality (simple alert)
        document.getElementById('searchBtn').addEventListener('click', (e) => {
            e.preventDefault();
            const query = document.getElementById('searchInput').value;
            if(query.trim()) alert(`Searching for "${query}"...`);
            else alert('Please enter a search term.');
            searchDropdown.classList.remove('active');
        });

        // Logout button demo
        document.getElementById('logoutBtn').addEventListener('click', () => {
            alert('You have been signed out (demo).');
            userDropdown.classList.remove('active');
        });

        // Cart item remove demo (simple)
        document.querySelectorAll('.cart-item .fa-trash').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const item = e.target.closest('.cart-item');
                item.remove();
                // update cart count / total (simple)
                const cartItems = document.getElementById('cartItems');
                if(cartItems.children.length === 0) {
                    cartItems.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
                }
                // recalc total (dummy)
                const totalSpan = document.querySelector('.cart-total span:last-child');
                totalSpan.textContent = '$249.99'; // just for demo
            });
        });

        // Checkout demo
        document.querySelector('.checkout-btn').addEventListener('click', () => {
            alert('Proceeding to checkout (demo).');
        });

        // Mobile menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('mobile-open');
        });

        // close mobile menu when link clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('mobile-open'));
        });

        // Intersection observer for reveal animations (unchanged)
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });
        revealElements.forEach(el => observer.observe(el));