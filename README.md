# Conway's Game of Life

A React implementation of Conway's Game of Life, a cellular automaton devised by mathematician John Conway.

## Play Online

You can play the game directly in your browser at: [https://Niwath-Mi.github.io/gameoflife/](https://Niwath-Mi.github.io/gameoflife/)

## How to Play

1. Click on cells to toggle them between alive (red) and dead (empty)
2. Click the "Run" button to start the simulation
3. Click "Stop" to pause the simulation
4. Adjust the speed using the input field (in milliseconds)

## Rules of the Game

- Any live cell with fewer than two live neighbors dies (underpopulation)
- Any live cell with two or three live neighbors lives on to the next generation
- Any live cell with more than three live neighbors dies (overpopulation)
- Any dead cell with exactly three live neighbors becomes a live cell (reproduction)

## Run Locally

If you want to run the game on your local machine:

1. Clone the repository:
```bash
git clone https://github.com/Niwath-Mi/gameoflife.git
```

2. Install dependencies:
```bash
cd gameoflife
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Technologies Used

- React
- Vite
- CSS3

## License

This project is open source and available under the MIT License.
