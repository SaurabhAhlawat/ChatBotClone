<<<<<<< HEAD
#ChatBot Clone

#Vitt.Ai-FR
=======

# Vitt Chat Bot

## Dependencies

dependencies to install in package.json
```bash
    "@material-ui/core": "^4.11.0",
    "@material-ui/icons": "^4.9.1",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "@thumbtack/thumbprint-react": "^14.1.0",
    "axios": "^0.19.2",
    "js-cookie": "^2.2.1",
    "qs": "^6.9.4",
    "react": "^16.13.1",
    "react-animated-dots": "^1.1.0",
    "react-bootstrap-table": "^4.3.1",
    "react-bottomsheet": "^1.1.0",
    "react-dom": "^16.13.1",
    "react-iframe": "^1.8.0",
    "react-linkify": "^1.0.0-alpha",
    "react-mentions": "^4.0.2",
    "react-owl-carousel": "^2.3.1",
    "react-router-dom": "^5.3.3",
    "react-scripts": "^3.4.1",
    "react-textarea-mention": "^1.0.11",
    "three-dots": "^0.2.0"
```

## Installation

clone in your root project directory. Example - 

```bash
  git clone https://github.com/anshtiwari314/vitt-ABW-Bot
```

## Usage/Examples

App.js (with navigation)

```javascript
import Bot from 'vitt-abw-bot/Bot'

export function App(){
    return (
        <Bot localKey={null} cookieKey="sessionid"/>
    )
}
```

## Props
```
use localKey if the session key is stored in local storage
```
```
use cookie key if the session key is stored as cookies
```

| Parameter           | Type        | Description    | Default value                |
| :--------           | :-------    | :------------  | :-------------------------   |  
| `localKey`           |  `String`   | key | undefined
| `cookieKey`               | `String`    | key   |   undefined


>>>>>>> 349313f266ad458c198086a71dc3e73745637b05
