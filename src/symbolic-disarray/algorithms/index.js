import * as d3 from 'd3';
import {getRandomArbitrary} from "../../utilities/random";

export function createVisData(numberOfColumns, numberOfRows) {
  const rows = d3.range(1, numberOfRows, 1);
  const columns = d3.range(1, numberOfColumns, 1);
  // Create the cartesian product to fill the grid uniformly
  const points = d3.cross(columns, rows);

  return points.map(([column, row]) => {
    const φ = row > 2 ? getRandomArbitrary(-row, row) : 0;

    return [column, row, φ];
  });
}
