const pythonScripts = [
    {
        id: 1,
        title: "Number Guessing Game",
        description: "A simple interactive game where players guess a random number between 1 and 100",
        category: "Mini-Games",
        difficulty: "Beginner",
        tags: ["game", "random", "loops"],
        featured: true,
        code: "import random\n\ndef number_guessing_game():\n    number = random.randint(1, 100)\n    attempts = 0\n    \n    print(\"Welcome to the Number Guessing Game!\")\n    print(\"I'm thinking of a number between 1 and 100\")\n    \n    while True:\n        guess = int(input(\"Enter your guess: \"))\n        attempts += 1\n        \n        if guess < number:\n            print(\"Too low! Try again.\")\n        elif guess > number:\n            print(\"Too high! Try again.\")\n        else:\n            print(\"Congratulations! You guessed it in \" + str(attempts) + \" attempts!\")\n            break\n\nif __name__ == \"__main__\":\n    number_guessing_game()",
        instructions: "Simply run the script with Python 3. The game will prompt you for guesses until you find the correct number."
    },
    {
        id: 2,
        title: "Password Generator",
        description: "Generate secure random passwords with customizable length and character types",
        category: "Utilities",
        difficulty: "Beginner",
        tags: ["security", "random", "strings"],
        featured: true,
        code: "import random\nimport string\n\ndef generate_password(length=12, use_special=True):\n    characters = string.ascii_letters + string.digits\n    if use_special:\n        characters += string.punctuation\n    \n    password = ''.join(random.choice(characters) for _ in range(length))\n    return password\n\nif __name__ == \"__main__\":\n    length = int(input(\"Password length (default 12): \") or 12)\n    use_special = input(\"Include special characters? (y/n): \").lower() == 'y'\n    \n    password = generate_password(length, use_special)\n    print(\"Generated password: \" + password)",
        instructions: "Run with Python 3. You'll be prompted for password length and whether to include special characters."
    },
    {
        id: 3,
        title: "List Comprehension Examples",
        description: "Learn Python list comprehensions with practical examples and explanations",
        category: "Learning Snippets",
        difficulty: "Beginner",
        tags: ["lists", "comprehension", "tutorial"],
        featured: true,
        code: "# List Comprehension Examples\n\n# Basic: Square numbers\nsquares = [x**2 for x in range(10)]\nprint(\"Squares:\", squares)\n\n# With condition: Even numbers only\nevens = [x for x in range(20) if x % 2 == 0]\nprint(\"Evens:\", evens)\n\n# String manipulation\nwords = [\"hello\", \"world\", \"python\"]\nuppercase = [word.upper() for word in words]\nprint(\"Uppercase:\", uppercase)\n\n# Nested comprehension: Flatten matrix\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflattened = [num for row in matrix for num in row]\nprint(\"Flattened:\", flattened)",
        instructions: "Run this script to see various list comprehension examples in action. Study each example to understand the syntax."
    },
    {
        id: 4,
        title: "Rock Paper Scissors",
        description: "Classic rock-paper-scissors game against the computer",
        category: "Mini-Games",
        difficulty: "Beginner",
        tags: ["game", "logic", "random"],
        featured: false,
        code: "import random\n\ndef play_game():\n    choices = [\"rock\", \"paper\", \"scissors\"]\n    \n    while True:\n        player = input(\"Choose rock, paper, or scissors (or 'quit'): \").lower()\n        \n        if player == \"quit\":\n            break\n            \n        if player not in choices:\n            print(\"Invalid choice!\")\n            continue\n        \n        computer = random.choice(choices)\n        print(\"Computer chose: \" + computer)\n        \n        if player == computer:\n            print(\"It's a tie!\")\n        elif (player == \"rock\" and computer == \"scissors\") or (player == \"paper\" and computer == \"rock\") or (player == \"scissors\" and computer == \"paper\"):\n            print(\"You win!\")\n        else:\n            print(\"Computer wins!\")\n\nif __name__ == \"__main__\":\n    play_game()",
        instructions: "Run the script and enter your choice when prompted. Type 'quit' to exit the game."
    },
    {
        id: 5,
        title: "File Organizer",
        description: "Automatically organize files in a directory by their file extensions",
        category: "Utilities",
        difficulty: "Intermediate",
        tags: ["files", "automation", "organization"],
        featured: false,
        code: "import os\nimport shutil\n\ndef organize_files(directory):\n    for filename in os.listdir(directory):\n        if os.path.isfile(os.path.join(directory, filename)):\n            extension = filename.split('.')[-1]\n            folder_name = extension.upper() + \"_Files\"\n            folder_path = os.path.join(directory, folder_name)\n            \n            if not os.path.exists(folder_path):\n                os.makedirs(folder_path)\n            \n            shutil.move(\n                os.path.join(directory, filename),\n                os.path.join(folder_path, filename)\n            )\n    \n    print(\"Files organized in \" + directory)\n\nif __name__ == \"__main__\":\n    directory = input(\"Enter directory path: \")\n    organize_files(directory)",
        instructions: "Run the script and provide a directory path. It will create folders for each file type and move files accordingly."
    },
    {
        id: 6,
        title: "Dictionary Methods Tutorial",
        description: "Comprehensive guide to Python dictionary methods with examples",
        category: "Learning Snippets",
        difficulty: "Beginner",
        tags: ["dictionaries", "methods", "tutorial"],
        featured: false,
        code: "# Python Dictionary Methods Tutorial\n\nperson = {\"name\": \"Alice\", \"age\": 30, \"city\": \"NYC\"}\n\n# get() - safe access with default\nprint(\"Name:\", person.get(\"name\"))\nprint(\"Country:\", person.get(\"country\", \"Unknown\"))\n\n# keys(), values(), items()\nprint(\"Keys:\", list(person.keys()))\nprint(\"Values:\", list(person.values()))\nprint(\"Items:\", list(person.items()))\n\n# update() - merge dictionaries\nperson.update({\"email\": \"alice@example.com\"})\nprint(\"Updated:\", person)\n\n# pop() - remove and return\nage = person.pop(\"age\")\nprint(\"Removed age:\", age)\nprint(\"After pop:\", person)",
        instructions: "Run this script to see various dictionary methods in action. Each method is demonstrated with clear examples."
    }
];