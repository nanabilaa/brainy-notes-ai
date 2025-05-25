<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>404 - Page Not Found | BrainyNotes</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }

        body {
            height: 100vh;
            background: linear-gradient(135deg, #4b0082, #1e1a87);
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
        }

        .error-container {
            text-align: center;
            animation: fadeIn 1.2s ease-in-out;
            padding: 2rem;
        }

        .error-icon {
            font-size: 6rem;
            margin-bottom: 1rem;
            animation: float 3s ease-in-out infinite;
        }

        h1 {
            font-size: 4rem;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }

        p {
            font-size: 1.2rem;
            color: #ccc;
            margin-bottom: 2rem;
        }

        a.button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
            color: white;
            background: linear-gradient(90deg, #4f46e5, #6366f1);
            border: none;
            border-radius: 8px;
            text-decoration: none;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
        }

        a.button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        @keyframes fadeIn {
            0% {
                opacity: 0;
                transform: scale(0.95);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }

        /* Optional: Responsive */
        @media (max-width: 600px) {
            h1 {
                font-size: 2.5rem;
            }

            .error-icon {
                font-size: 4rem;
            }
        }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-icon">📄🚫</div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you’re looking for doesn’t exist or has been moved.</p>
        <a class="button" href="/">← Back to Dashboard</a>
    </div>
</body>
</html>
