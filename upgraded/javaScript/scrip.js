let currentProfileIndex = 0;
        const profiles = [
            { name: "Rahmah", age: 28, emoji: "😊", bio: "Adventure seeker, coffee enthusiast, and dog lover. Looking for someone to explore the world with!" },
            { name: "Rumaizoh", age: 32, emoji: "🎭", bio: "Theater actor and yoga instructor. Passionate about mindfulness and creative expression." },
            { name: "Maryam", age: 26, emoji: "🚀", bio: "Tech entrepreneur and space enthusiast. Building the future, one startup at a time!" },
            { name: "Muhsinah", age: 29, emoji: "🌱", bio: "Environmental scientist and rock climber. Saving the planet while reaching new heights!" },
            { name: "Ismail", age: 31, emoji: "🎵", bio: "Professional musician and food blogger. Life is better with good music and great food!" }
        ];

        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all nav buttons
            document.querySelectorAll('.nav-link').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Add active class to clicked nav button
            event.target.classList.add('active');
        }

        function swipeProfile(action) {
            const card = document.getElementById('currentCard');
            
            // Animate card based on action
            if (action === 'like') {
                card.style.transform = 'translateX(100%) rotate(20deg)';
                card.style.opacity = '0';
            } else if (action === 'reject') {
                card.style.transform = 'translateX(-100%) rotate(-20deg)';
                card.style.opacity = '0';
            } else if (action === 'superlike') {
                card.style.transform = 'translateY(-100%) rotate(5deg)';
                card.style.opacity = '0';
            }
            
            // Load next profile after animation
            setTimeout(() => {
                loadNextProfile();
                card.style.transform = '';
                card.style.opacity = '1';
            }, 300);
        }

        function loadNextProfile() {
            currentProfileIndex = (currentProfileIndex + 1) % profiles.length;
            const profile = profiles[currentProfileIndex];
            
            document.querySelector('.profile-pic').textContent = profile.emoji;
            document.querySelector('.profile-name').textContent = profile.name;
            document.querySelector('.profile-age').textContent = profile.age + ' years old';
            document.querySelector('.profile-bio').textContent = profile.bio;
        }

        function updateAgeDisplay(value) {
            const minAge = Math.max(18, value - 5);
            const maxAge = Math.min(65, parseInt(value) + 5);
            document.getElementById('ageDisplay').textContent = `${minAge}-${maxAge}`;
        }

        function sendMessage() {
            const input = document.getElementById('messageInput');
            const messagesContainer = document.getElementById('chatMessages');
            
            if (input.value.trim()) {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message sent';
                messageDiv.textContent = input.value;
                messagesContainer.appendChild(messageDiv);
                
                input.value = '';
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
                
                // Simulate response after 2 seconds
                setTimeout(() => {
                    const responses = [
                        "That sounds amazing!",
                        "I'd love to hear more about that!",
                        "We should definitely meet up sometime!",
                        "You seem really interesting!",
                        "I completely agree!"
                    ];
                    const responseDiv = document.createElement('div');
                    responseDiv.className = 'message received';
                    responseDiv.textContent = responses[Math.floor(Math.random() * responses.length)];
                    messagesContainer.appendChild(responseDiv);
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }, 2000);
            }
        }

        function handleEnter(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        // Add swipe gesture support for mobile
        let startX, startY, distX, distY;

        document.getElementById('currentCard').addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.getElementById('currentCard').addEventListener('touchmove', function(e) {
            if (!startX || !startY) return;
            
            distX = e.touches[0].clientX - startX;
            distY = e.touches[0].clientY - startY;
            
            this.style.transform = `translateX(${distX}px) rotate(${distX * 0.1}deg)`;
        });

        document.getElementById('currentCard').addEventListener('touchend', function(e) {
            if (Math.abs(distX) > 100) {
                if (distX > 0) {
                    swipeProfile('like');
                } else {
                    swipeProfile('reject');
                }
            } else if (distY < -100) {
                swipeProfile('superlike');
            } else {
                this.style.transform = '';
            }
            
            startX = startY = distX = distY = null;
        });

        // Auto-update stats periodically
        setInterval(() => {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const currentValue = parseInt(stat.textContent);
                if (Math.random() > 0.7) { // 30% chance to update
                    stat.textContent = currentValue + Math.floor(Math.random() * 3);
                }
            });
        }, 10000);