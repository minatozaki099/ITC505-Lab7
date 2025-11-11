const express = require('express')
const logger = require('morgan')
const path = require('path')
const server = express()

server.use(express.urlencoded({'extended': true}))
server.use(logger('dev'))

// Routes
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`)
})

// Mad Lib POST route handler
server.post('/ITC505/lab-7', (req, res) => {
    const { adjective1, pluralNoun, verb, adjective2, noun, place } = req.body;
    
    // Validate that all fields are filled
    if (!adjective1 || !pluralNoun || !verb || !adjective2 || !noun || !place) {
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Submission Failed</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                    }
                    .error-container {
                        background: white;
                        padding: 40px;
                        border-radius: 20px;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        text-align: center;
                        max-width: 500px;
                    }
                    h1 {
                        color: #f5576c;
                        margin-bottom: 20px;
                    }
                    p {
                        color: #555;
                        margin-bottom: 30px;
                        font-size: 1.1em;
                    }
                    a {
                        display: inline-block;
                        padding: 12px 30px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-decoration: none;
                        border-radius: 10px;
                        font-weight: 600;
                        transition: transform 0.2s ease;
                    }
                    a:hover {
                        transform: translateY(-2px);
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <h1>❌ Submission Failed</h1>
                    <p>Please fill out ALL fields to create your Mad Lib story!</p>
                    <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
                </div>
            </body>
            </html>
        `);
        return;
    }
    
    // Create the Mad Lib story
    const madLib = `
        Once upon a time in ${place}, there lived a ${adjective1} explorer 
        who loved to collect ${pluralNoun}. Every morning, they would wake up early 
        and start ${verb} around the neighborhood. One day, they discovered a 
        ${adjective2} ${noun} hidden behind an old oak tree. This discovery changed 
        their life forever, and they became famous throughout ${place} for their 
        amazing find. The ${pluralNoun} they had collected over the years suddenly 
        seemed boring compared to this incredible ${adjective2} ${noun}. From that 
        day forward, they spent every moment ${verb} in search of more treasures, 
        hoping to find something even more ${adjective1} than before!
    `;
    
    // Send the completed Mad Lib
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Mad Lib Story!</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    min-height: 100vh;
                    padding: 20px;
                }
                .story-container {
                    max-width: 800px;
                    margin: 40px auto;
                    background: white;
                    padding: 50px;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }
                h1 {
                    color: #667eea;
                    text-align: center;
                    margin-bottom: 30px;
                    font-size: 2.5em;
                }
                .story {
                    font-size: 1.2em;
                    line-height: 1.8;
                    color: #333;
                    background: #f9f9f9;
                    padding: 30px;
                    border-radius: 15px;
                    border-left: 5px solid #667eea;
                    margin-bottom: 30px;
                }
                .highlight {
                    color: #f5576c;
                    font-weight: 600;
                }
                .button-container {
                    text-align: center;
                }
                a {
                    display: inline-block;
                    padding: 15px 40px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 10px;
                    font-weight: 600;
                    font-size: 1.1em;
                    transition: transform 0.2s ease;
                }
                a:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
                }
            </style>
        </head>
        <body>
            <div class="story-container">
                <h1>🎉 Your Amazing Mad Lib Story! 🎉</h1>
                <div class="story">
                    ${madLib}
                </div>
                <div class="button-container">
                    <a href="/ITC505/lab-7/index.html">Create Another Story</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// Setup static page serving for all the pages in "public"
const publicServedFilesPath = path.join(__dirname, 'public')
server.use(express.static(publicServedFilesPath))

// Use an explicit, non-privileged default port for local development.
// Default order of precedence: PORT env var -> 'local' argument -> 3000
let port = process.env.PORT ? Number(process.env.PORT) : 3000
if (process.argv[2] === 'local') {
    port = 3000
}

const listener = server.listen(port, '0.0.0.0', () => {
    const addr = listener.address()
    console.log('Server address info:', addr)
    const host = addr.address === '::' || addr.address === '0.0.0.0' ? 'localhost' : addr.address
    console.log(`Ready on http://${host}:${addr.port}`)
})

listener.on('error', (err) => {
    console.error('Failed to start server:', err && err.message ? err.message : err)
    process.exit(1)
})