import EventPlanner from '../src/controller/EventPlanner.js';

class App {
  async run() {
    this.eventPlanner = new EventPlanner();
    await this.eventPlanner.manageEvent();
  }
};

export default App;
