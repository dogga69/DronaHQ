[
    {
        "product": "Standard Chair",
        "description": "A perfectly safe and normal chair."
    },
    {
        "product": "Tricky Lamp",
        "description": "A lamp with a hidden surprise <svg onload=alert('SVG XSS')>"
    },
    {
        "product": "Hacked TV",
        "description": "<IMG SRC=\"javascript:alert('XSS');\">"
    },
    {
        "product": "User Profile",
        "description": "User details are below.",
        "details": {
            "name": "Eve <script>document.body.style.backgroundColor='red'</script>",
            "bio": "I am a security researcher who likes to test things... <a href='#' onmouseover='alert(\"Gotcha!\")'>Hover me!</a>"
        }
    },
    {
        "product": "Dangerous Mousepad",
        "description": "Just a mousepad <iMg sRc='x' OnErRoR='alert(\"Case-insensitive attack!\")'>"
    }
]