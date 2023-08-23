import React from 'react';
import LongPulling from "./components/LongPulling";
import EventSourcing from "./components/EventSourcing";
import WebSocketComp from "./components/WebSocketComp";

function App() {
    return (
        <div className="App">
            {/*<LongPulling/> or <EventSourcing/> or <WebSocketComponent/>*/}
            <WebSocketComp/>
        </div>
    );
}

export default App;
