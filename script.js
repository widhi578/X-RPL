// Mobile menu toggle
        document.getElementById('mobile-menu-button').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });
        
        // Scroll animation
        function checkFade() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(element => {
                const position = element.getBoundingClientRect();
                if(position.top < window.innerHeight - 100) {
                    element.classList.add('visible');
                }
            });
        }
        
        // Navigation active state
        function setActiveNav() {
            const sections = document.querySelectorAll('section');
            const navItems = document.querySelectorAll('.nav-item');
            
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if(pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('nav-active');
                if(item.getAttribute('href').substring(1) === currentSection) {
                    item.classList.add('nav-active');
                }
            });
        }
        
        // Initialize
        window.addEventListener('scroll', function() {
            checkFade();
            setActiveNav();
        });
        
        window.addEventListener('load', function() {
            checkFade();
            setActiveNav();
        });
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    document.getElementById('mobile-menu').classList.add('hidden');
                }
            });
        });
                // ==============================
        // Fitur Pengingat PR
        // ==============================

        const prForm = document.getElementById('pr-form');
        const prSubject = document.getElementById('pr-subject');
        const prTask = document.getElementById('pr-task');
        const prList = document.getElementById('pr-list');

        // Ambil data PR dari localStorage
        let prData = JSON.parse(localStorage.getItem('prData')) || [];

        // Render daftar PR
        function renderPR() {
            prList.innerHTML = '';
            if (prData.length === 0) {
                prList.innerHTML = '<p class="text-center text-gray-500">Belum ada PR</p>';
                return;
            }

            prData.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = "flex justify-between items-center bg-white rounded-lg shadow p-4";
                div.innerHTML = `
                    <div>
                        <h3 class="font-semibold text-gray-800">${item.subject}</h3>
                        <p class="text-gray-600 text-sm">${item.task}</p>
                    </div>
                    <button class="text-red-500 hover:text-red-700 font-medium" data-index="${index}">
                        Hapus
                    </button>
                `;
                prList.appendChild(div);
            });
        }

        // Simpan ke localStorage
        function savePR() {
            localStorage.setItem('prData', JSON.stringify(prData));
        }

        // Tambah PR
        prForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const subject = prSubject.value.trim();
            const task = prTask.value.trim();

            if (subject && task) {
                prData.push({ subject, task });
                savePR();
                renderPR();
                prForm.reset();
            }
        });

        // Hapus PR
        prList.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const index = e.target.getAttribute('data-index');
                prData.splice(index, 1);
                savePR();
                renderPR();
            }
        });

        // Render saat halaman pertama kali load
        renderPR();

        document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});